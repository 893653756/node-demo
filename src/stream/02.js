const fs = require("fs");
// const wf = fs.createWriteStream("./2.txt", {
//     highWaterMark: 3,
//     flags: "w",
//     mode: 0o666,
//     encoding: "utf8"
// });
// let i = 10;
// function write() {
//     let flag = true;
//     while (i && flag) {
//         flag = wf.write("1");
//         i--;
//         console.log(flag);
//     }
// }
// write();
// wf.on("drain", () => {
//     console.log("drain");
//     write();
// })

const wf = fs.createWriteStream("./3.txt");
for (let i = 0; i < 20; i++) {
    wf.write(`hello, ${i}!\n`);
}
wf.end("结束\n");
wf.on("finish", () =>{
    console.log("所有写入已经完成")
})