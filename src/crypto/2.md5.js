const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

let rs = fs.createReadStream(path.join(__dirname, "./msg.txt"), {
    highWaterMark: 2
});

let md5 = crypto.createHash("md5");
rs.on("data", (data) => {
    data && md5.update(data);
});
rs.on("end", () => {
    let md5Val = md5.digest("hex");
    console.log(md5Val);
})