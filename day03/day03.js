const fs = require('fs');

let rawdata = fs.readFileSync('./day03/input');
let data = rawdata.toString();
let triangles = data.split("\n");
let count = 0;
triangles.forEach(tri => {
    if (tri == "") return;
    a = parseInt(tri.substring(0, 5).trim());
    b = parseInt(tri.substring(5, 10).trim());
    c = parseInt(tri.substring(10).trim());
    if (a+b > c && b+c > a && a+c > b) {
        count++
    }
});
const lim = Object.freeze([0, 5, 10, 15])
let count2 = 0
for (let i = 0; i < triangles.length; i+=3) {
    if (triangles[i]=="") continue;
    l1 = triangles[i]
    l2 = triangles[i+1]
    l3 = triangles[i+2]
    for (let j = 0; j < 3; j++) {
        a = parseInt(l1.substring(lim[j], lim[j+1]).trim());
        b = parseInt(l2.substring(lim[j], lim[j+1]).trim());
        c = parseInt(l3.substring(lim[j], lim[j+1]).trim());
        if (a+b > c && b+c > a && a+c > b) {
            count2++
        }
    }
}
console.log("Part 1: ", count);
console.log("Part 2: ", count2);
