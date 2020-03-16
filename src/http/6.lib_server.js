const http = require("http");
const url = require("url");
const path = require("path");
const mime = require("mime");
const fs = require("fs");
const zlib = require("zlib");
// 把一个异步方法转换成一个promise的方法
const { promisify } = require("util");
const stat = promisify(fs.stat);

/**
 * 客户端向服务器发起请求时, 会通过 Accept-Enconding 告诉服务器我支持的解压格式
 * Accept-Encoding:gzip, deflate, br
 */
http.createServer(request).listen(8080);

async function request(req, res) {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname, pathname);
    try {
        let statObj = await stat(filepath);
        // 可以根据不同的文件类型设置不同的 Content-Type
        res.setHeader("Content-Type", mime.getType(pathname));
        let acceptEnconding = req.headers["accept-encoding"];
        // 内容协商
        if (acceptEnconding) {
            if (acceptEnconding.match(/\bgzip\b/)) {
                res.setHeader("Content-Encoding", "gzip");
                fs.createReadStream(filepath)
                    .pipe(zlib.createGzip())
                    .pipe(res);
            } else if (acceptEnconding.match(/\bdeflate\b/)) {
                res.setHeader("Content-Encoding", "deflate");
                fs.createReadStream(filepath)
                    .pipe(zlib.createDeflate())
                    .pipe(res);
            } else {
                fs.createReadStream(filepath).pipe(res);
            }
        } else {
            fs.createReadStream(filepath).pipe(res);
        }
    } catch (error) {
        res.statusCode = 404;
        res.end();
    }
}