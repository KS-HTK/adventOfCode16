const fs = require('fs');

let rawdata = fs.readFileSync('./day12/input');
let data = rawdata.toString().split("\n");
let reg = {"a": 0, "b": 0, "c": 0, "d": 0};
run(reg);
console.log("Part 1:", reg.a);
reg = {"a": 0, "b": 0, "c": 1, "d": 0};
run(reg);
console.log("Part 2:", reg.a);

function run(reg) {
    let ins = 0;
    exec: while (ins < data.length) {
        let inst = data[ins].split(" ");
        switch (inst[0]) {
            case "cpy":
                reg[inst[2]] = getVal(inst[1]);
                break;
            case "inc":
                reg[inst[1]]++;
                break;
            case "dec":
                reg[inst[1]]--;
                break;
            case "jnz":
                if (getVal(inst[1]) !== 0) {
                    ins += parseInt(inst[2]);
                    continue exec;
                }
                break;
        }
        ins++;
    }
}

function getVal(x) {
    if (isNaN(x)) {
        return reg[x];
    } else return parseInt(x);
}