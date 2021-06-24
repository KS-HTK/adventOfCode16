function replaceCharAt(str, index, replacement) {
    return str.substring(0, index) + replacement + str.substring(index + 1);
}
var crypto = require('crypto')
let doorId = "abbhdwsy";
let num = 0;
let passcode = "";
let passcode2 = "________";
while (passcode2.includes("_")) {
    let hash = crypto.createHash('md5').update(doorId+num++).digest("hex");
    if (hash.startsWith("00000")) {
        if (passcode.length < 8) passcode += hash.substr(5, 1);
        let pos = parseInt(hash.substr(5, 1), 16);
        if (pos < 8 && passcode2.substr(pos, 1) == "_") {   
            let char = hash.substr(6, 1);
            passcode2 = replaceCharAt(passcode2, pos, char);
        }
    }
}

console.log("Part 1: ", passcode);
console.log("Part 2: ", passcode2);
