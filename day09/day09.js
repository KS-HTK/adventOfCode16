const fs = require('fs');

let rawdata = fs.readFileSync('./day09/input');
let data = rawdata.toString().trim();

console.log("Part 1:", getSize(data, false));
console.log("Part 2:", getSize(data, true));

function getSize(data, pt2) {
    let c = data.length;
    let re = /\((\d*)x(\d*)\)/g
    while ((m = re.exec(data)) !== null) {
        let ind = m.index;
        let len = m[0].length;
        let l = parseInt(m[1]);
        let r = parseInt(m[2]);
        let payload = data.substr(ind+len, l);
        if (pt2) c += getSize(payload, pt2)*r;
        else c += l*r;
        c -= (len+l);
        re.lastIndex = ind+len+l;
    }
    return c;
}