const fs = require('fs');

let rawdata = fs.readFileSync('./day06/input');
let data = rawdata.toString();
let msgs = data.split("\n");
let msg = "";
let msg2 = "";
for (let i = 0; i < msgs[0].length; i++) {
    letters = {};
    msgs.forEach(str => {
        if (str=="") return;
        if (str.charAt(i) in letters) letters[str.charAt(i)] += 1;
        else letters[str.charAt(i)] = 1;
    });
    let top = Object.entries(letters).sort(([,a],[,b]) => sortChar(a, b));
    msg += top[0][0];
    msg2 += top[top.length-1][0];
}

console.log("Part 1: ", msg);
console.log("Part 2: ", msg2);

function sortChar (a, b) {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
}