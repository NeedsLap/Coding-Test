const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const testCases = [];
for (let i = 0, j = 1; i < parseInt(input[0]); i++) {
  testCases.push([input[j], input[j + 1].split(" ").map(Number)]);
  j += 2;
}

testCases.forEach((testCase) => {
  let [N, M] = testCase[0].split(" ").map(Number);
  const queue = [...testCase[1].map(Number)];
  let max = Math.max(...queue);
  let count = 0;

  while (queue.length > 0) {
    if (queue[0] === max) {
      count += 1;
      queue.shift();
      if (M === 0) {
        console.log(count);
        break;
      }
      M -= 1;
      max = Math.max(...queue);
    }
    if (queue[0] < max) {
      queue.push(queue.shift());
      M = M === 0 ? queue.length - 1 : M - 1;
    }
  }
});
