const http = require("http");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.sendDate = false;
    res.setHeader("Content-Type", "text/html;charset=utf8")
    console.log(res.getHeader("Content-Type"));
    res.end("end")
}).listen(8080)