function solution(n, computers) {
  const visited = new Set();
  let answer = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (computers[i][j] === 1 && !visited.has(i + "," + j)) {
        answer += dfs(i, j, computers, visited);
      }
    }
  }
  return answer;
}

function dfs(i, j, computers, visited) {
  const stack = [i];
  let count = 1;

  while (stack.length) {
    const m = stack.pop();
    for (let k = 0; k < computers.length; k++) {
      if (computers[m][k] === 1 && !visited.has(m + "," + k)) {
        stack.push(k);
        visited.add(m + "," + k);
      }
    }
  }
  return count;
}
