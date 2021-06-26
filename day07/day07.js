const fs = require('fs');

let rawdata = fs.readFileSync('./day07/input');
let data = rawdata.toString();
let ips = data.split("\n");
let tlsRe = /(.)(.)\2\1/;
//let tlsPos = /(?<!\[)(?:(.)(.)\2\1)(?![\w\s]*[\]])/;
//let tlsNeg = /(?<!\])(?:(.)(.)\2\1)(?![\w\s]*[\[])/;
let tlsCount = 0;
ips.forEach(ip => {
    let tlsSupport = false;
    let tlsBlocked = false;
    let abas = []
    let ipParts = ip.split("]");
    ipParts.forEach(ipPart => {
        let positiv = null, negativ = null;
        if (ipPart.includes("[")) {
            let parts = ipPart.split("[");
            positiv = tlsRe.exec(parts[0]);
            negativ = tlsRe.exec(parts[1]);
        }
        else positiv = tlsRe.exec(ipPart);
        if (positiv !== null && positiv[1] !== positiv[2]) tlsSupport = true;
        if (negativ !== null && negativ[1] !== negativ[2]) tlsBlocked = true; 
    });
    if (tlsSupport && !tlsBlocked) tlsCount++;
});
console.log("Part 1: ", tlsCount);
//console.log("Part 2: ", tlsCount);