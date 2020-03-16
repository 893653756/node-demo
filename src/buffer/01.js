// 16进制存储
// 通过长度定义
const buf1 = Buffer.alloc(10);
console.log(buf1);
const buf2 = Buffer.alloc(10, 17);
console.log(buf2);
const buf3 = Buffer.allocUnsafe(10);
console.log(buf3);

// 通过数组定义
const buf4 = Buffer.from([1, 2, 18])
console.log(buf4);
const buf5 = Buffer.from("感触科技")
console.log(buf5);

const buf6 = Buffer.allocUnsafe(12);
buf6.fill("珠峰", 1, 7, "utf8");
console.log(buf6.toString());
console.log(Buffer.isBuffer(buf6));
console.log(buf6.length)

const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(str){
  let buf = Buffer.from(str);
  let result = '';
  for(let b of buf){
      result += b.toString(2);
  }
    return result.match(/(\d{6})/g).map(val=>parseInt(val,2)).map(val=>CHARTS[val]).join('');
}
let r = transfer('珠');//54+g
console.log(r)