const fs = require('fs');

let rawdata = fs.readFileSync('./day01/input');
let data = rawdata.toString();
let commands = data.split(", ");

var headingX = 1, headingY = 0;
var posX = 0, posY = 0;
var visited = [];
var foundHQ = false
var dist2 = 0
visited.push(posX+","+posY)
commands.forEach(element => {
    letter = element.substring(0, 1)
    amount = parseInt(element.substring(1))
    if (letter == "R") turnRight()
    else turnLeft()
    go(amount)
});
var dist = Math.abs(posX)+Math.abs(posY)
console.log("Part 1: ", dist);
console.log("Part 2: ", dist2);

function turnRight() {
    tmp = headingX
    headingX = 0-headingY
    headingY = tmp
}
function turnLeft() {
    tmp = headingY
    headingY = 0-headingX
    headingX = tmp
}
function go(amount) {
    posX += headingX
    posY += headingY
    check()
    visited.push(posX+","+posY)
    if (amount > 1) go(amount-1)
}
function check() {
    if (foundHQ) return;
    if (visited.includes(posX+","+posY)) {
        dist2 = Math.abs(posX)+Math.abs(posY)
        foundHQ = true
    }
}