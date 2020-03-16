/**
 * 行读取器
 * 每读一行，向外发生数据
 * \r 0x0d 13
 * \n 0x0a 10
 * 在window下, \r\n
 * 在mac下, \n  
 * liunx下, \r
 */
const fs = require("fs");
const EventEmitter = require("events");
const path = require("path");

const RETURN = 0x0d;
const LINE = 10;
class LineReader extends EventEmitter {
    constructor(_path) {
        super();
        this.buffer = [];
        this._rs = fs.createReadStream(_path);
        this.on("newListener", (eventName) => this._read(eventName))
    }
    _read(eventName) {
        if (eventName === "line") {
            this._rs.on("readable", () => {
                let char;
                // 读取出来是buffer
                while (char = this._rs.read(1)) {
                    let current = char[0];
                    switch (current) {
                        // 当为 \r 是表示这一行ok了
                        case RETURN:
                            this.emit("line", Buffer.from(this.buffer).toString());
                            this.buffer.length = 0;
                            let c = this._rs.read(1);
                            // 读取 \r后看下一个字符是不是 \n 如果是则剔除
                            if (c[0] !== LINE) {
                                this.buffer.push(c[0]);
                            }
                            break;
                        case LINE:
                            this.emit("line", Buffer.from(this.buffer).toString());
                            this.buffer.length = 0;
                            break;
                        default:
                            this.buffer.push(current);
                    }
                }
            });
            this._rs.on("end", () => {
                this.emit("line", Buffer.from(this.buffer).toString());
                this.buffer.length = 0;
            })
        }
    }
}

const lineReader = new LineReader(path.join(__dirname, "./7.txt"));
lineReader.on("line", (data) => {
    console.log(data)
})