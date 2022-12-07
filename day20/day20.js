const fs = require('fs');

let rawdata = fs.readFileSync('./day20/input');
let data = rawdata.toString();
let ranges = data.trim().split("\n").map(line => line.split('-').map(num => parseInt(num)));
const MAX = 4294967295

ranges.sort((a1, a2) => a1[0] - a2[0])

let allowedCount = 0
let lastMax = -1
let firstAllowed

for (let i = 0; i < ranges.length; i++) {
  const c = Math.max(0, ranges[i][0] - lastMax - 1)
  allowedCount += c
  if (firstAllowed === undefined && c) firstAllowed = lastMax + 1
  lastMax = Math.max(lastMax, ranges[i][1])
}
allowedCount += Math.max(0, MAX - lastMax)

console.log('Part 1:', firstAllowed)
console.log('Part 2:', allowedCount)
