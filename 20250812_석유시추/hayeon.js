// ---------- 섬의 개수 ---------- //
// DFS 재귀
const numIslands = function(grid) {
  const dfs = (i, j) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] !== '1') {
        return;
    }

    grid[i][j] = 0;

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  let count = 0;

  grid.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === '1') {
        dfs(i, j);
        count += 1;
      } 
    });
  });

  return count;
};

// DFS 스택
const numIslands = function(grid) {
  const dfs = (i, j) => {
    const stack = [[i, j]];

    while (stack.length) {
      const [x, y] = stack.pop();

      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== '1') {
        continue;
      }

      grid[x][y] = 0;
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
  };

  let count = 0;

  grid.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === '1') {
        dfs(i, j);
        count += 1;
      } 
    });
  });

  return count;
};

// BFS
const numIslands = function(grid) {
  const bfs = (i, j) => {
    const queue = [[i, j]];

    while (queue.length) {
      const [x, y] = queue.shift();

      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== '1') {
        continue;
      }

      grid[x][y] = 0;
      queue.push([x + 1, y]);
      queue.push([x - 1, y]);
      queue.push([x, y + 1]);
      queue.push([x, y - 1]);
    }
  };

  let count = 0;

  grid.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === '1') {
        bfs(i, j);
        count += 1;
      } 
    });
  });

  return count;
};

// ---------- 석유시추 ---------- //
function solution(land) {
  const dfs = (i, j, positions) => {
    const stack = [[i, j]];
    let cnt = 0;
    
    while (stack.length) {
      const [x, y] = stack.pop();
      
      if (x < 0 || x >= land.length || y < 0 || y >= land[x].length || land[x][y] !== 1) {
        continue; // 석유가 없거나 이미 방문한 위치인 경우
      }
      
      land[x][y] = 0; // 방문한 위치 0 처리
      cnt += 1;
      positions.add(y);
      stack.push([x + 1, y]);
      stack.push([x - 1, y]);
      stack.push([x, y + 1]);
      stack.push([x, y - 1]);
    }
    
    return cnt;
  };

  const cnts = new Map(); // 각 열에 시추관 설치 시 획득 가능한 석유량
  land.forEach((row, i) => {
    row.forEach((item, j) => {
      if (item === 1) {
        const positions = new Set(); // 석유 덩어리가 위치한 열
        const cnt = dfs(i, j, positions); // 총 석유량
        [...positions].forEach(j => cnts.set(j, (cnts.get(j) || 0) + cnt));
      } 
    });
  });
  return Math.max(...cnts.values()) || 0;
}
