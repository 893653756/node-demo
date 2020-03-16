const fs = require("fs");
// 创建可读流
const rs = fs.createReadStream("./1.txt", {
    highWaterMark: 3,
    flags: "r",
    encoding: "utf8"
});
// 打开文件 (open)
rs.on("open", () => {
    console.log("文件打开了");
});
// 监听数据 (data)
rs.on("data", (data) => {
    rs.pause();
    console.log(data);
    setTimeout(() => {
        rs.resume()
    },2000)
});

// 监听读完事件 (end)
rs.on("end", () => {
    console.log("数据读完了")
})
// 关闭文件 (close)
rs.on("close", () => {
    console.log("文件关闭")
})
// 错误事件 (error)
rs.on("error", () => {
    console.log("读取错误")
})
