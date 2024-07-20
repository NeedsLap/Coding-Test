const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');
///dev/stdin

//n = 4, k = 2
const n = +input[0];
const k = +input[1];
const arr = input.slice(2, 2 + n).map(x => x.trim());
const answer = new Set();

const stack = [[[], Array(n).fill(false), 0]];

while (stack.length) {
  const [current, visited, depth] = stack.pop();

  if (depth === k) {
    answer.add(current.join(''));
    continue;
  }

  for (let i = 0; i < arr.length; i++) {
    if (visited[i]) continue;
    
    const newVisited = visited.slice();
    newVisited[i] = true;
    
    stack.push([current.concat(arr[i]), newVisited, depth + 1]);
  }
}

console.log(answer.size);
