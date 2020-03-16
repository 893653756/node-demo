const fs = require("fs");
const path = require("path");
const zlib = require("zlib"); // 压缩

function gzip (src) {
    fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(`${src}.gz`))
}
// gzip(path.join(__dirname, "./msg.txt"));

// 解压
function gunzip (src) {
    fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, ".gz"))))
}
// gunzip(path.join(__dirname, "msg.txt.gz"))


let str = "hello";
zlib.gzip(str, (err, buffer) => {
    console.log(buffer);
    zlib.unzip(buffer, (err, data) => {
        console.log(data.toString())
    })
})