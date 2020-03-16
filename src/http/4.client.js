/**
 * node 写爬出
 */
const http = require("http");
// 头分四种 (通用、请求、相应、实体)
let options = {
    host: "localhost",
    port: "8080",
    method: "POST",
    headers: {
        // "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
    }
}
// 请求并没有发出去, req 也是一个流对象(可写流)
let req = http.request(options);
// 当客户端接收到服务器的相应时触发
req.on("response", (res) => {
    console.log(res.statusCode);
    console.log(res.headers);
    let result = [];
    res.on("data", (chunk) => {
        chunk && result.push(chunk);
    });
    res.on("end", () => {
        let str = Buffer.concat(result);
        console.log(str.toString())
    })
});
// write 是向请求体里写入数据
// req.write('{"name":"zfpx"}');
req.write('name=zfpx&age=9');
//是结束写入请求体，只有在调用end的时候才会真正向服务器发请求
req.end();