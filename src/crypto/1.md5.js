/**
 * 1.可用来检验要下载的文件是否被篡改过
 * 2.对密码进行加密 123456 => md5值
 */
const crypto = require("crypto");
let str = "hello";
// console.log(crypto.getHashes())
// let md5 = crypto.createHash("md5");
let md5 = crypto.createHash("sha1");
md5.update(str);
// 输出md5值, 指定输出格式 hex
console.log(md5.digest('hex'))

// aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
// 5d41402abc4b2a76b9719d911017c592