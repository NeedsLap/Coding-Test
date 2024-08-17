// ---------- 네트워크 --------- //
// DFS 스택
function solution(n, computers) {
  const dfs = (i) => {
    const stack = [i];

    while (stack.length) {
      const x = stack.pop();
      computers.forEach((_, y) => {
        if (computers[x][y] === 0) {
          return;
        }
          
        if (x === y) {
          computers[x][y] = 0; // 노드 방문 처리
        } else {
          computers[x][y] = computers[y][x] = 0; // 연결된 노드 방문 처리
          stack.push(y); // 연결된 노드에 연결된 노드를 탐색하기 위해 stack에 push
        }
      });
    }
  };

  let answer = 0;
  computers.forEach((_, i) => {
    if (computers[i][i] === 1) { // 아직 방문하지 않은 노드라면
      dfs(i);
      answer += 1;
    } 
  });
  return answer;
}

// DFS 재귀
function solution(n, computers) {
  const dfs = (i) => {
    computers.forEach((_, j) => {
      if (computers[i][j] === 1) {
        computers[i][j] = computers[j][i] = 0;
        dfs(j);
      }
    });      
  };

  let answer = 0;
  computers.forEach((_, i) => {
    if (computers[i][i] === 1) {
      dfs(i);
      answer += 1;
    } 
  });
  return answer;
}

// BFS
function solution(n, computers) {
  const bfs = (i) => {
    const queue = [i];

    while (queue.length) {
      const x = queue.shift();
      computers.forEach((_, y) => {
        if (computers[x][y] === 0) {
          return;
        }
          
        if (x === y) {
          computers[x][y] = 0;
        } else {
          computers[x][y] = computers[y][x] = 0;
          queue.push(y);
        }
      });
    }
      
  };

  let answer = 0;
  computers.forEach((_, i) => {
    if (computers[i][i] === 1) {
      bfs(i);
      answer += 1;
    } 
  });
  return answer;
}
