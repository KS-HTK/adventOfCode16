const fs = require('fs');

let rawdata = fs.readFileSync('./day02/input');
let data = rawdata.toString();
let commands = data.split("\n");

let b = 5
let keyPad2 = [[-1, -1,  1, -1, -1],
               [-1,  2,  3,  4, -1],
               [ 5,  6,  7,  8,  9],
               [-1,'A','B','C', -1],
               [-1, -1,'D', -1, -1]]
let b2 = [3, 0]
let bathroomCode = 0
let bathroomCode2 = ""
commands.forEach(str => {
    if (str == "") return;
    for (var i = 0; i < str.length; i++) {
        move(str.charAt(i))
        move2(str.charAt(i))
    }
    bathroomCode *= 10
    bathroomCode += b
    bathroomCode2 = bathroomCode2 + keyPad2[b2[0]][b2[1]].toString()
});
console.log("Part 1: ", bathroomCode);
console.log("Part 2: ", bathroomCode2);

function move(c) {
    switch (c) {
        case 'U':
            if (b > 3) b -= 3;
            return;
        case 'D':
            if (b < 7) b += 3;
            return;
        case 'L':
            if (b%3!=1) b -= 1;
            return;
        case 'R':
            if (b%3!=0) b += 1;
    }
}
function move2(c) {
    nextButton = [b2[0], b2[1]]
    switch (c) {
        case 'U':
            if (nextButton[0] > 0) nextButton[0] -= 1;
            break;
        case 'D':
            if (nextButton[0] < 4) nextButton[0] += 1;
            break;
        case 'L':
            if (nextButton[1] > 0) nextButton[1] -= 1;
            break;
        case 'R':
            if (nextButton[1] < 4) nextButton[1] += 1;
            break;
    }
    if (keyPad2[nextButton[0]][nextButton[1]]!=-1) b2 = nextButton;
}