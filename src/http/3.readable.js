const http = require("http");
const path = require("path");
const fs = require("fs");
let rs = fs.createReadStream(path.join(__dirname, "1.txt"), {
    highWaterMark: 3
});
let buffer = []
rs.on("readable", () => {
    let data = rs.read();
    if (data) {
        buffer.push(data)
    }
});
rs.on("end", (data) => {
    console.log("end", Buffer.concat(buffer).toString())
})