// 加盐算法
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

let key = fs.readFileSync(path.join(__dirname, "./rsa_private.key"));

// let hmac = crypto.createHmac("sha1", key);
let hmac = crypto.createHmac("md5", key);
// 加密 123
hmac.update("123");
let result = hmac.digest("hex");
console.log(result);
// 4ea33b5a06e58d2e7564be621f31e8da4002c062
// 733ab5e89cc6e932f0be16afe45c8648
