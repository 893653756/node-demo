/**
 * 可读流
 */
const EventEmitter = require("events");
const fs = require("fs");
class ReadStream extends EventEmitter {
    constructor(_path, options) {
        this._path = _path;
        this.flags = options.flags || "r";
        this.autoClose = options.autoClose || true;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        this.start = options.start || 0;
        this.end = options.end;
        this.encoding = options.encoding || "utf8";
        // 打开文件
        this._open();
        // null 就是暂停模式, 看是否监听了data事件, 如果监听了, 就要变成流动模式
        this.flowing = null;
        this.buffer = Buffer.alloc(this.highWaterMark);
        // 开始读取位置
        this.pos = this.start;
        this.on("newListener", (eventName, callback) => {
            if (eventName === "data") {
                this.flowing = true;
                this.read()
            }
        })
    }
    read() {
        // 如果文件还没打开
        if (typeof this.fd !== "number") {
            return this.once("open", () => this.read());
        }
        // 此时打开文件 (读取个数)
        let howMuchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark;
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesLength) => {
            if (err) {
                this.emit("error", err);
                this.destroy();
                return;
            }
            if (bytesLength > 0) {
                this.pos += bytesLength;
                this.data = this.encoding ? this.buffer.slice(0, bytesLength).toString(this.encoding) : this.buffer.slice(0, bytesLength);
                this.emit("data", data);
                // 当读取位置大于结束位置, 结束
                if (this.end && this.pos >= this.end) {
                    this.emit("end");
                    return this.destroy();
                }
                // 流动模式继续读取
                if (this.flowing) {
                    this.read();
                }
            } else {
                this.emit("end");
                return this.destroy();
            }
        })
    }
    pipe(ws) {
        this.on("data", (chunk) => {
            let flag = ws.write(chunk);
            if (!flag) {
                this.pause();
            }
        })
        ws.on("drain", () => {
            this.resume();
        })
    }
    // 暂停
    pause() {
        this.flowing = false
    }
    // 继续读取
    resume() {
        this.flowing = true;
        this.read();
    }
    _open() {
        fs.open(this._open, this.flags, (err, fd) => {
            if (err) {
                this.emit("error", err);
                this.destroy();
                return;
            }
            this.fd = fd;
            this.emit("open")
        })
    }
    destroy() {
        if (!this.autoClose) {
            return;
        }
        if (typeof this.fd == "number") {
            fs.close(this.fd, () => {
                this.emit("close");
            })
            return;
        }
        this.emit("close");
    }
}
module.exports = ReadStream;