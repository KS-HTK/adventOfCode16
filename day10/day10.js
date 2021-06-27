const fs = require('fs');

const t1 = 17, t2 = 61;
class Output {
    constructor() {
        this.dump = [];
    }
    output() {
        return this.dump;
    }
    addChip(chip) {
        this.dump.push(chip);
    }
};
class Bot {
    constructor(id, lowBot, lowId, highBot, highId){
        this.id = id;
        this.lowBot = lowBot;
        this.highBot = highBot;
        this.lowId = lowId;
        this.highId = highId;
        this.chips = [];
    }
    
    addChip(chip) {
        this.chips.push(chip);
        if (this.chips.length == 2) {
            this.dumpChips();
        }
    }

    update() {
        if (this.lowBot) this.low = bots[this.lowId];
        else this.low = outputs[this.lowId];
        if (this.highBot) this.high = bots[this.highId];
        else this.high = outputs[this.highId];
    }
    
    dumpChips() {
        if (this.chips.includes(t1) && this.chips.includes(t2)) {
            console.log("Part 1: ", this.id);
        }
        if (this.chips[0] < this.chips[1]) {
            this.high.addChip(this.chips.pop());
            this.low.addChip(this.chips.pop());
        } else {
            this.low.addChip(this.chips.pop());
            this.high.addChip(this.chips.pop());
        }
    }
};

let rawdata = fs.readFileSync('./day10/input');
let data = rawdata.toString();

let bots = {};
let outputs = {};

let findBots = /bot (\d*) gives low to (\w*) (\d*) and high to (\w*) (\d*)/g;
while ((m = findBots.exec(data)) !== null) {
    let id = parseInt(m[1]);
    let id1isBot = m[2].startsWith("b");
    let id1 = parseInt(m[3]);
    let id2isBot = m[4].startsWith("b");
    let id2 = parseInt(m[5]);
    if (!id1isBot) outputs[id1] = new Output();
    if (!id2isBot) outputs[id2] = new Output();
    bots[id] = new Bot(id, id1isBot, id1, id2isBot, id2);
}

for (const id of Object.keys(bots)) {
    bots[id].update();
}

let findChips = /value (\d*) goes to bot (\d*)/g;
while ((m = findChips.exec(data)) !== null) {
    let chipId = parseInt(m[1]);
    let botId = parseInt(m[2]);
    bots[botId].addChip(chipId);
}

console.log("Part 2: ", outputs[0].output().pop()*outputs[1].output().pop()*outputs[2].output().pop());
