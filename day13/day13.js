const input = 1364;
const size = 50;
const goal = {'x': 31, 'y':39};
let board = new Array(size);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(size);
    for (let j = 0; j < board[i].length; j++) {
        board[i][j] = isWall(j,i);
    }
}
getDistances()

function isWall(x, y) {
    let num = ((x+y)*(x+y))+(3*x)+y+input;
    var n = 16;
    var i = 0;
    var b = false;
    while (i++ < n) {
        var mask = 1 << i;
        if ((mask & num) == (mask)) {
            b = !b;
        }
    }
    return b;
}

function getDistances() {
    let dist = {};
    let visited = [];
    let queue = [];
    queue.push([1,1]);
    dist['1,1'] = 0;
    while(queue.length > 0) {
        let [a, b] = queue.pop();
        let distAB = dist[a+','+b];
        for (let i = a-1; i < a+2; i++) {
            if (i<0||i===a) continue;
            if (i>=size) break;
            if (!board[i][b]) {
                let distIB = distAB+1
                //if ((i===y)&&(b===x)) return distIB;
                if (!arrayContains(visited, i,b)&&!arrayContains(queue, i,b)) {
                    queue.push([i,b]);
                    dist[i+','+b] = distIB;
                } else {
                    if (dist[i+','+b] > distIB) {
                        dist[i+','+b] = distIB;
                    }
                }
            }
        }
        for (let j = b-1; j < b+2; j++) {
            if (j<0||j===b) continue;
            if (j>=size) break;
            if (!board[a][j]) {
                let distAJ = distAB+1;
                //if ((a===y)&&(j===x)) return distAJ;
                if (!arrayContains(visited, a,j)&&!arrayContains(queue, a,j)) {
                    queue.push([a,j]);
                    dist[a+','+j] = distAJ;
                } else {
                    if (dist[a+','+j] > distAJ) {
                        dist[a+','+j] = dastAJ;
                    }
                }
            }
        }
        visited.push([a,b]);
    }
    log(dist);
}

function log(distance) {
    console.log("Part 1:", distance[goal.y+','+goal.x]);
    let count = 0;
    for (const [,value] of Object.entries(distance)) {
        if (value <= 50) count++;
    }
    console.log("Part 2:", count);
}

function arrayContains(array, a, b) {
    for(const [x, y] of array) {
        if ((a===x) && (b===y)) return true;
    }
    return false;
}