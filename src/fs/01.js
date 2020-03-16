const fs = require("fs");
fs.open("1.txt", "r", 0o666, function (err, fd) {
    console.log(fd);
    let buf = Buffer.alloc(6);
    fs.read(fd, buf, 0, 6, 0, function (err, bytesRead, buffer) {
        
    })
})
