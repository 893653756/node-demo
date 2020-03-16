// readable
const fs = require("fs");
const path = require("path");
let p = path.join(__dirname, "5.txt")
const rf = fs.createReadStream(p, {
    highWaterMark: 3,
    encoding: "utf8"
});

rf.on("readable", () => {
    console.log("readable");
    console.log("rf._readableState.buffer.length", rf._readableState.length);
    let w = rf.read(1);
    // console.log(w);
    console.log("rf._readableState.length", rf._readableState.length);
})