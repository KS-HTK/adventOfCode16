const fs = require('fs');

let rawdata = fs.readFileSync('./day07/input');
let data = rawdata.toString();
let ips = data.split("\n");
let tlsPos = /(?<!\[)(?:(.)(.)\2\1)(?![\w]*[\]])/;
let tlsNeg = /(?<=\[[\w]*)(?:(.)(.)\2\1)(?=[\w]*[\]])/;
let sslAba = /(?=(?<!\[)((\w)(\w)\2)(?![\w]*[\]]))./g;
let sslBab = /(?=(?<=\[[\w]*)((\w)(\w)\2)(?=[\w]*[\]]))./g;
let tlsCount = 0;
let sslCount = 0;
ips.forEach(ip => {
    let p = tlsPos.exec(ip);
    let n = tlsNeg.exec(ip);
    if (p !== null && p[1] !== p[2] && (n === null || n[1] === n[2])) tlsCount++;
    let abas = [];
    let match;
    while ((match = sslAba.exec(ip)) != null) { 
        abas.push(match[1]);
    }  
    let babs = [];
    while ((match = sslBab.exec(ip)) != null) { 
        babs.push(match[1]);
    }
    for (let i = 0; i < abas.length; i++) {
        let bab = abas[i].charAt(1)+abas[i].charAt(0)+abas[i].charAt(1);
        if (babs.includes(bab)) {
            sslCount++;
            break;
        }
    }
});
console.log("Part 1: ", tlsCount);
console.log("Part 2: ", sslCount);