const input = '01110110101001000';
const d1size = 272;
const d2size = 35651584;
let invIn ='';
[...input].forEach(c => invIn = (c=='0'?'1':'0')+invIn);
//a0b 0 a1b  0  a0b 1 a1b   0   a0b 0 a1b  1  a0b 1 a1b
//0010011000110110001001110011011
let len = 17;
let sep = '0';
while (len < d2size) {
    len*=2;
    len++;
    let tmp = '';
    [...sep].forEach(c => tmp = (c=='0'?'1':'0')+tmp);
    sep = sep+'0'+tmp;
}

console.log("Part 1:", checksum(getData(input, sep, invIn, d1size)));
console.log("Part 2:", checksum(getData(input, sep, invIn, d2size)));

function getData(input, sep, invIn, len) {
    let dragon = '';
    let ind = 0;
    while (dragon.length < len) {
        dragon += input+sep[ind++]+invIn+sep[ind++];
    }
    dragon = dragon.slice(0, len);
    let data = [];
    [...dragon].forEach(c => data.push(c=='1'));
    return data;
}

function checksum(data) {
    let csum = [];
    while (data.length) {
        csum.push(data.shift() == data.shift());
    }
    if (csum.length%2==0) return checksum(csum);
    else {
        let res = '';
        csum.forEach(b => {res += b? '1':'0';});
        return res;
    };
}
