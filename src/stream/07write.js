const fs = require("fs");
const path = require("path");
const WriteStream = require("./WriteStream");

let ws = new WriteStream(path.join(__dirname, "./9.txt"), {
    highWaterMark: 3,
    autoClose: true,
    flags: "w",
    encoding: "utf8",
    start: 0
})

let i = 9;
let flag = true;
function write() {
    flag = true;
    while (flag && i > 0) {
        let num = i
        flag = ws.write(num + "", "utf8", () => {
            console.log("写入--->", num)
        });
        i--;
        console.log(flag);
    }
}
write();
ws.on("drain", () => {
    console.log("drain");
    write();
})