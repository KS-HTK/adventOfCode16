const MD5 = require('crypto-js/md5');
const salt = 'zpqevtbw';
let re = /(.)\1\1/g
pt1();
//apperently pt2 does not return the same result for the example (salt 'abc'). But for my input it works.
pt2();

function pt1() {
    let keys = [];
    let counter = 0;
    let md5s = [];
    while (md5s.length < 1000) {
        md5s.push(MD5(salt+counter++).toString());
    }
    for (let ind = 0; keys.length < 64; ind++) {
        md5s.push(MD5(salt+counter++).toString());
        let hash = md5s.shift();
        let match = re.exec(hash);
        if (match) {
            let substr = match[1].repeat(5);
            for(let i = 0; i < md5s.length; i++) {
                if (md5s[i].includes(substr)) {
                    keys.push(ind);
                    break;
                }
            }
        }
        re.lastIndex = 0;
    }
    console.log("Part 1:", keys.pop());
}

function pt2() {
    let keys = [];
    let counter = 0;
    let md5s = [];
    while (md5s.length < 1000) {
        md5s.push(stretchKey(MD5(salt+counter++).toString()));
    }
    for (let ind = 0; keys.length < 64; ind++) {
        md5s.push(stretchKey(MD5(salt+counter++).toString()));
        let hash = md5s.shift();
        let match;
        while (match = re.exec(hash)) {
            let substr = match[1].repeat(5);
            for(let i = 0; i < md5s.length; i++) {
                if (md5s[i].includes(substr)) {
                    keys.push(ind);
                    break;
                }
            }
        }
        re.lastIndex = 0;
    }
    console.log("Part 2:", keys.pop());
}

function stretchKey(key) {
    for(let i = 2016; i>0; i--) {
        key = MD5(key).toString();
    }
    return key;
}