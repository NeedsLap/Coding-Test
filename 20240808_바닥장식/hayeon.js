// 바닥장식
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(v => parseInt(v));
const graph = input.slice(1).map(v => v.split(''));

let result = 0;
let rowCnt = 0, colCnt = Array(M).fill(0);

graph.forEach((arr, i) => {
    arr.forEach((v, j) => {
        if (v === '-') {
            rowCnt += 1;
            result += colCnt[j] ? 1 : 0;
            colCnt[j] = 0;
        } else {
            colCnt[j] += 1;
            result += rowCnt ? 1 : 0;
            rowCnt = 0;
        }
    });
    result += rowCnt ? 1 : 0;
    rowCnt = 0;
});
colCnt.forEach(v => result += v ? 1 : 0);
console.log(result);
