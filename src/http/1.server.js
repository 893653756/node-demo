const http = require("http");
let url = require("url");
let server = http.createServer();
// 监听客户端连接
server.on("connection", (socket) => {
    console.log('客户端连接')
    socket.on("data", (chunk) => {
        // console.log("socket",chunk.toString(), "======")
        console.log("tcp连接")
    });
    socket.on("end", () => {
        console.log("client end")
    })
    socket.on("close", () => {
        console.log("client close")
    })
})

server.on("request", (req, res) => {
    req.on("data", (chunk) => {
        console.log("req", chunk.toString())
    })
    req.on("end", () => {
        res.end("end")
    })
    
})

server.listen(8080)
