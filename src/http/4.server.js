const http = require("http");
const querystring = require("querystring");

let server = http.createServer();
server.on("request", (req, res) => {
    console.log("url: ",req.url);
    console.log("method: ",req.method);
    console.log("method: ",req.headers);
    let result = [];
    req.on("data", (chunk) => {
        result.push(chunk)
    });
    req.on("end", () => {
        let str = Buffer.concat(result).toString();
        console.log(str);
        // 获取类容类型
        let contentType = req.headers['content-type'];
        let body;
        switch (contentType) {
            case "application/x-www-form-urlencoded":
                body = querystring.parse(str);
                break;
            case "application/json":
                body = JSON.parse(str);
                break;
            default:
                body = querystring.parse(str);
        }
        res.end(JSON.stringify(body));
    })
})

server.listen(8080)