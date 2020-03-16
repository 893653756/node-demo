const fs = require("fs");
const wf = fs.createWriteStream("./4.txt");
const rf = fs.createReadStream("./3.txt");
let flag = true;
rf.on("data", (data) => {
    flag = wf.write(data);
    if (!flag) {
        rf.pause();
    }
});
wf.on("drain", () => {
    rf.resume();
})
rf.on("end", () => {
    wf.end();
});