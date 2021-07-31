const input = '01110110101001000';
const inputLength = input.length;
const d1size = 272;
const d2size = 35651584;

//compute input parity normal:
let inputParity = 0, parity = 0;
for(let i = 0; i < inputLength; i++) {
    parity ^= (input.charAt(i)=='1');
    inputParity ^= parity << (i+1);
}
//...and reverse:
for(let i = 1; i <= inputLength; i++) {
    parity ^= (input.charAt(inputLength-i) == '0');
    //f*** shift operations only working on 32 bit. I need 35. :(
    //inputParity ^= parity << (inputLength+i);
    inputParity = xor(inputParity, shift(parity, inputLength+i));
}
console.log("Part 1:", solve(inputParity, d1size));
console.log("Part 2:", solve(inputParity, d2size));
return 0;

//if bitOpps weren't dumb and would work on the actual 53 bit this could be ommited...
//for right shift use -sft
function shift(num, sft) {
    return parseInt(num * (2**sft));
}
function and(num1, num2) {
    const maxInt32Bits = 2**32;
    const num1high = num1/maxInt32Bits;
    const num1low  = num1%maxInt32Bits;
    const num2high = num2/maxInt32Bits;
    const num2low  = num2%maxInt32Bits;
    return (num1high & num2high) * maxInt32Bits + (num1low & num2low);
}
function xor(num1, num2) {
    const maxInt32Bits = 2**32;
    const num1high = num1/maxInt32Bits;
    const num1low  = num1%maxInt32Bits;
    const num2high = num2/maxInt32Bits;
    const num2low  = num2%maxInt32Bits;
    return (num1high ^ num2high) * maxInt32Bits + (num1low ^ num2low);
}

function solve(inputParity, diskSize) {
    let increment = findLowest1(diskSize);
    let previousParity = 0;
    let checksum = '';

    for(let length = increment; length <= diskSize; length+=increment) {
        //When you think you've got it figured and the not lossy devision f*** you up.
        let dragons = Math.floor(length / (inputLength+1));
        let inputCycles = Math.floor((length-dragons) / (inputLength*2));
        let inputRemainder = (length-dragons) % (inputLength*2);
        let p = dragonParity(dragons);
        p = xor(p, and(inputCycles, inputLength));
        p = xor(p, shift(inputParity, -inputRemainder));
        p = and(p, 1);

        checksum += '10'.charAt(xor(p, previousParity));
        previousParity = p;
    }
    return checksum;
}

//return lowest 1 bit in num:
function findLowest1(n) {
    return and(n, -n);
}

//return parity of dragon curve of length n
function dragonParity(n) {
    let grayCode = xor(n, shift(n, -1));
    return and(xor(grayCode, (and(n, grayCode).toString(2).split('').filter(x => x == '1').length%2)), 1);
}