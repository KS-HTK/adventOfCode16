let discs = [
    {'id': 1,'steps': 17, 'start': 1},
    {'id': 2,'steps':  7, 'start': 0},
    {'id': 3,'steps': 19, 'start': 2},
    {'id': 4,'steps':  5, 'start': 0},
    {'id': 5,'steps':  3, 'start': 0},
    {'id': 6,'steps': 13, 'start': 5}
];
console.log("Part 1:", solve());
discs.push({'id': 7,'steps': 11, 'start': 0});
console.log("Part 2:", solve());

function solve() {
    let time = 0;
    while (true) {
        let success = true;
        discs.forEach(disc => {
            if ((disc.start+disc.id+time)%disc.steps !== 0) return success = false;
        });
        if (success) {
            break;
        }
        time++;
    }
    return time;
}