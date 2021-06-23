const fs = require('fs');

let rawdata = fs.readFileSync('./day04/input');
let data = rawdata.toString();
let rooms = data.split("\n");
let sum = 0;
let storageId;
rooms.forEach(str => {
    if (str=="") return;
    let parts = str.split("-")
    let idChecksum = parts.pop().split("[");
    let id = parseInt(idChecksum[0])
    let checksum = idChecksum[1].substring(0, idChecksum[1].length-1)
    let letters = {};
    let roomName = "";
    parts.forEach(word => {
        for (let i = 0; i < word.length; i++) {
            if (word[i] in letters) letters[word[i]] += 1;
            else letters[word[i]] = 1;
            roomName += decipherLetter(word[i], id%26);
        }
        roomName += " ";
    });
    let top = Object.entries(letters).sort(([aC,a],[bC,b]) => sortPair(b, a, bC, aC));
    calcChecksum = ""+top[0][0]+top[1][0]+top[2][0]+top[3][0]+top[4][0];
    if (calcChecksum == checksum) {
        sum += id;
    }
    if (roomName.trim().includes("northpole")) storageId = id;
});

console.log("Part 1: ", sum);
console.log("Part 2: ", storageId);

function sortPair (a, b, a2, b2) {
    if (a-b == 0) {
        if (a2 < b2) return 1;
        if (a2 > b2) return -1;
        return 0;
    }
    return a-b
}

function decipherLetter(c, v) {
    if (v==1) return nextLetter(c)
    return decipherLetter(nextLetter(c), v-1)
}

//https://stackoverflow.com/questions/2256607/how-to-get-the-next-letter-of-the-alphabet-in-javascript
function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
        var c= a.charCodeAt(0);
        switch(c){
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}