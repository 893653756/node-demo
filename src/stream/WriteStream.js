/**
 * 手写简单可写流
 */
const EventEmitter = require("events");
const fs = require("fs");

class WriteStream extends EventEmitter {
    constructor(_path, options) {
        super();
        this._path = _path; // 文件路径
        this.highWaterMark = options.highWaterMark || 64 * 1024; // 缓冲区阈值
        this.autoClose = options.autoClose || true; // 制动关闭文件
        this.mode = options.mode || 0o666; // 权限
        this.start = options.start || 0; // 开始写入位置
        this.flags = options.flags || "r"; // 模式
        this.encoding = options.encoding || "utf8"; // 编码
        // 可写流需要有一个缓冲区, 当正在写入文件时, 内容需要写到缓冲区内(源码中用链表, 这里简写为数组)
        this.buffers = [];
        this.writing = false; // 表示是否正在写入 
        this.needDrain = false; // 是够满足触发 drain 事件
        this.pos = this.start; // 记录写入位置
        this.length = 0; // 记录缓冲区大小
        this._open();
    }
    write(chunk, encoding = this.encoding, cb = () => { }) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        // write 需要返回一个boolean值
        this.length += chunk.length;
        // 比较是否达到缓冲区阈值
        let ret = this.length < this.highWaterMark;
        // 是否需要触发 drain 事件
        this.needDrain = !ret;
        // 判断写入文件还是写入缓冲区
        if (this.writing) {
            this.buffers.push({
                chunk,
                encoding,
                cb
            })
        } else {
            // 写入文件
            this.writing = true;
            this._write(chunk, encoding, () => {
                cb();
                this._clearBuffer();
            })
        }
        return ret;
    }
    _write(chunk, encoding, cb) {
        if (typeof this.fd !== "number") {
            return this.once("open", () => {
                this._write(chunk, encoding, cb)
            });
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, writtenLength) => {
            this.length -= writtenLength;
            this.pos += writtenLength;
            cb && cb();
        })
    }
    _clearBuffer() {
        let buffer = this.buffers.shift();
        if (buffer) {
            this._write(buffer.chunk, buffer.encoding, () => {
                buffer.cb();
                return this._clearBuffer();
            })
        } else {
            this.writing = false;
            // 向外部发生 drain 事件
            if (this.needDrain) {
                this.needDrain = false;
                this.emit("drain");
            }
        }
    }
    // 打开文件
    _open() {
        fs.open(this._path, this.flags, this.mode, (err, fd) => {
            if (err) {
                this.emit("error", err);
                if (this.autoClose) {
                    this.destroy();
                }
                return;
            }
            this.fd = fd;
            this.emit("open");
        })
    }
    // 关闭文件
    destroy() {
        if (typeof this.fd !== "number") {
            return this.emit("close");
        }
        fs.close(this.fd, () => {
            this.emit("close");
        })
    }
}

module.exports = WriteStream;