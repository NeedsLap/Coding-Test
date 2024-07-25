// Queue & 정렬
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const testCaseLen = parseInt(input[0]);

for (let i = 1; i < testCaseLen * 2; i += 2) {
    const priorities = input[i + 1].split(" ").map((v) => parseInt(v));
    const queue = priorities.map((v, i) => [i, v]);
    const N = parseInt(input[i].split(" ")[0]);
    const M = parseInt(input[i].split(" ")[1]);
    priorities.sort((a, b) => b - a);
    
    while (queue.length) {
        if (queue[0][1] !== priorities[0]) {
            queue.push(queue.shift());
        } else if (queue[0][0] === M){
            console.log(N - queue.length + 1);
            break;
        } else {
            queue.shift();
            priorities.shift();
        }
    }
}
