// pipe 用法
const fs = require("fs");
const from = fs.createReadStream("./4.txt");
const to = fs.createWriteStream("./5.txt");
from.pipe(to);