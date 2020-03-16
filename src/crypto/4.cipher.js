// 对称加密
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

let str = 'sdfasadf#fdfd!22';
let key = fs.readFileSync(path.join(__dirname, "rsa_private.key"));

let cipher = crypto.createCipher("blowfish", key);
let result = cipher.update(str, "utf8", "hex");
result += cipher.final("hex"); // 加密输出
console.log(result);


// 解码
let decipher = crypto.createDecipher("blowfish", key);
let r = decipher.update(result, "hex", "utf8");
r += decipher.final("utf8");
console.log(r)
