const input = '01110110101001000';
const d1size = 272;
const d2size = 35651584;
//b = a reversed inverted
//a0b 0 a1b  0  a0b 1 a1b   0   a0b 0 a1b  1  a0b 1 a1b
//sep = 0010011000110110001001110011011
let invIn ='';
[...input].forEach(c => invIn = (c=='0'?'1':'0')+invIn);
//checksum for a+'0' and a+'1'
let aSums = {
    '0': checksum([...input, '0']),
    '1': checksum([...input, '1'])
}
//checksum for b+'0' and b+'1'
let bSums = {
    '0': checksum([...invIn, '0']),
    '1': checksum([...invIn, '1'])
}
let len = 17;
let sep = '0';
while (len < d2size) {
    len*=2;
    len++;
    let tmp = '';
    [...sep].forEach(c => tmp = (c=='0'?'1':'0')+tmp);
    sep = sep+'0'+tmp;
}
console.log("Part 1:", ''.concat(...checksum(firstCsum(d1size))));
let fSum = firstCsum(d2size);
console.log(fSum);
console.log("Part 2:", ''.concat(...checksum(fSum)));

function firstCsum(len) {
    let csum = [];
    let ind = 0;
    while(len > 36) {
        let s1 = sep[ind++];
        let s2 = sep[ind++];
        csum = csum.concat(aSums[s1],bSums[s2]);
        len-=36;
    }
    if (len >= 18) {
        len-=18;
        csum = csum.concat(aSums[sep[ind]], checksum([...invIn.slice(0, len)]));
    } else {
        csum = csum.concat(checksum([...input.slice(0, len)]));
    }
    return csum;
}

function checksum(data) {
    if (!Array.isArray(data)) throw new TypeError("data is of wrong type.");
    if (data.length%2==1) return data;
    let csum = [];
    while (data.length) {
        csum.push((data.shift() == data.shift())?'1':'0');
    }
    return checksum(csum);
}