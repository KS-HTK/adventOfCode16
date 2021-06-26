const fs = require('fs');

let rawdata = fs.readFileSync('./day08/input');
let commands = rawdata.toString().split("\n");

let screen = new Array(6);
for (let i = 0; i < screen.length; i++) {
    screen[i] = new Array(50).fill(false);  
}
commands.forEach(com => {
    if (com == "") return;
    if (com.includes("rect")) {
        let args = com.split(" ")[1].split("x");
        rect(parseInt(args[0]), parseInt(args[1]));
    } else {
        let args = com.split("=")[1].split(" by ");
        if (com.includes("row")) roRow(parseInt(args[0]), parseInt(args[1]));
        else roCol(parseInt(args[0]), parseInt(args[1]));
    }
});

let onCount = 0;
screen.forEach(row => {
    row.forEach(pix => {
        if (pix) onCount++;
    });
});

console.log("Part 1: ", onCount);
console.log("Part 2:");
printScreen()

function printScreen() {
    screen.forEach(row => {
        rowStr = "";
        row.forEach(pix => {
            if (pix) rowStr += "█";
            else rowStr += " ";
        });
        console.log(rowStr)
    });
}

function rect(a, b) {
    for (let i = 0; i < b; i++) {
        for (let j = 0; j < a; j++) {
            screen[i][j] = true;
        }
    }
}

function roRow(row, offset) {
    if (offset == 0) return;
    screen[row].unshift(screen[row].pop())
    return roRow(row, offset-1);
}

function roCol(col, offset) {
    let colData = [];
    screen.forEach(row => {colData.push(row[col])});
    while (offset-->0) colData.unshift(colData.pop());
    colData.forEach((pixel, ind) => {screen[ind][col] = pixel});
}