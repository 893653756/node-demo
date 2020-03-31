const crypto = require('crypto');
const secret = "abcd"
function toBase64(str) {
    return Buffer.from(str).toString('base64');
}
function fromBase64(input) {
    return Buffer.from(input, 'base64').toString();
}

function sign(input, secret) {
    return crypto.createHash('sha256', secret).update(input).digest('base64');
}

//编码
function encode(payload, secret) {
    let header = { "alg": "SH256", "typ": "JWT" };
    let headerSegmengt = toBase64(JSON.stringify(header));
    let payloadSgement = toBase64(JSON.stringify(payload));
    let signSegment = sign([headerSegmengt, payloadSgement].join('.'), secret);
    let token = [headerSegmengt, payloadSgement, signSegment].join('.');
    return token;
}
// 解码
function decode(token, secret) {
    let [headerSegmengt, payloadSgement, signSegment] = token.split('.');
    if (sign([headerSegmengt,payloadSgement].join('.'), secret) === signSegment) {
        let payload = JSON.parse(fromBase64(payloadSgement));
        return payload;
    }
}

/**
 * 测试
 */

const user = {
    "username": "zhuwanhai",
    "passname": "389381"
}
// 加密
let token = encode(user, secret);
console.log(token);
// 解密
let payload = decode(token, secret);
console.log(payload)

