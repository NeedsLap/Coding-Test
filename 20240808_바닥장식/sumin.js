const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [a, b] = input.shift().split(" ").map(Number);
const tile = input.map((v) => v.trim().split(""));

let count = 0;
const visited = Array.from({ length: a }, () => new Array(b).fill(false));

for (let i = 0; i < a; i++) {
  for (let j = 0; j < b; j++) {
    if (!visited[i][j]) {
      count++;
      dfs(i, j, tile[i][j]);
    }
  }
}

function dfs(i, j, v) {
  visited[i][j] = true;

  if (v === "-") {
    if (j + 1 < b && !visited[i][j + 1] && tile[i][j + 1] === "-") {
      dfs(i, j + 1, v);
    }
  } else if (v === "|") {
    if (i + 1 < a && !visited[i + 1][j] && tile[i + 1][j] === "|") {
      dfs(i + 1, j, v);
    }
  }
}
console.log(count);
