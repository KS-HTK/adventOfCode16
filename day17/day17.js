const CJS = require('crypto-js');
const MD5 = CJS.MD5;
const HEX = CJS.enc.HEX;
const input = "dmypynyp";
const unlocked = "bcdef"

let resLength = 10000
console.log("Part 1:", findPath(["", 0, 0], function(a, b) {return a <= b}))
console.log("Part 2:", findPath(["", 0, 0], function(a, b) {return a >= b}).length)

function findPath([path, x, y], comp) {
    if (x==3 & y==3) {
        return path
    }
    let hash = nextHash(input+path);
    let u = hash.charAt(0);
    let d = hash.charAt(1);
    let l = hash.charAt(2);
    let r = hash.charAt(3);
    let queue = [];
    if (unlocked.includes(d)) {
        if(x+1<=3) queue.push([path+'D', x+1, y])
    }
    if (unlocked.includes(r)) {
        if(y+1<=3) queue.push([path+'R', x, y+1])
    }
    if (unlocked.includes(l)) {
        if(y-1>=0) queue.push([path+'L', x, y-1])
    }
    if (unlocked.includes(u)) {
        if(x-1>=0) queue.push([path+'U', x-1, y])
    }
    let result = undefined
    while (queue.length > 0) {
        let [pt, x ,y] = queue.pop()
        let neo = findPath([pt, x, y], comp)
        if (neo == undefined) continue 
        if (comp(neo.length, resLength)) {
            result = neo
            resLength = neo.length
        }
    }
    return result
}

function nextHash(hash) {
    return MD5(hash).toString(HEX).slice(0,4);
}