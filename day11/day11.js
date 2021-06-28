const fs = require('fs');

let rawdata = fs.readFileSync('./day11/input');
let setup = rawdata.toString().split("\n");

console.log("Part 1: ", setup);
console.log("Part 2:");
