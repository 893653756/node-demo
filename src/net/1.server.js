const net = require("net");
// 当客户端连接上时会执行相应的回调函数
// socket 是一个双工流
let server = net.createServer({});
server.on("connection", (socket) => {
    // 设置客户端链接最多数量
    server.maxConnections = 2;
    // 获取当前有多少个客户端正在链接服务器
    server.getConnections((err, count) => {
        console.log(`欢迎光临, 现在链接的客户端总数量是${count}个, 总共允许链接${server.maxConnections}个`)
    });
    console.log(socket.address());
    socket.setEncoding("utf8");
    socket.on("data", function (data) {
        console.log(`服务器为接收客户端发来的消息：${data}`);
        socket.write(`服务器回应：${data}`, "utf8")
    });
    // 服务器收到客户端发出的关闭连接请求时，会触发end事件
    // 在这个地方客户端没有真正关闭，只是开始关闭。当真正关闭的时候还会触发一个close事件
    socket.on("end", () => {
        console.log("客户端已关闭")
    });
    // hasError如果为ture表示异常关闭，否则表示正常关闭
    socket.on("close", (hasError) => {
        console.log('客户端真正关闭', hasError);
    });
    socket.on('error', function (err) {
        console.log(err);
    });
});
server.listen(8080, function () {
    console.log('服务器端已经启动');
})