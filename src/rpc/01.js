// 编码
const payload = {
    service: "com.alipay.nodejs.HelloService:1.0",
    methodName: "plus",
    args: [1, 2]
}
const body = Buffer.from(JSON.stringify(payload));

const header = Buffer.alloc(10);
header[0] = 0;
header.writeInt32BE(1000, 1);
header[5] = 1; // 1 表示 json 序列化
header.writeInt32BE(body.length, 6);
const packet = Buffer.concat([header, body], 10 + body.length);
// console.log(body.length)
// console.log(header.length)
// console.log(packet.length)

// 解码
const type = packet[0];  // 0
const requestId = packet.readInt32BE(1);  // 1000
const codec = packet[5];
const bodyLength = packet.readInt32BE(6);

const bodyData = packet.slice(10, 10 + bodyLength);
const payloadData = JSON.parse(bodyData);
console.log(type)
console.log(requestId)
console.log(codec)
console.log(bodyLength)
console.log(bodyData)
console.log(payloadData);

// const buf = Buffer.alloc(10);
// buf.writeInt32BE(1000, 0);
// console.log(buf)