//clusterSizes = 각 열의 석유시추 총합을 기록하는 곳
//clusterCells = 석유가 존재하는 인덱스를 담아둔 곳
//seenColumns = 해당 열에 값이 존재하는지 확인하는 set

//1.bfs를 통해 탐색한후 clusterCells에 해당 인덱스 저장
//count  (연결된 석유 크기) 와 함께 return
//for of 를 통해 y열 석유총량을 삽입
//각열의 총합 중 가장 큰값 return

function solution(land) {
  const clusterSizes = Array(land[0].length).fill(0);

  for (let j = 0; j < land[0].length; j++) {
    for (let i = 0; i < land.length; i++) {
      if (land[i][j] === 1) {
        const { count, clusterCells } = bfs(land, i, j);

        const seenColumns = new Set();

        for (const [x, y] of clusterCells) {
          if (!seenColumns.has(y)) {
            clusterSizes[y] += count;
            seenColumns.add(y);
          }
        }
      }
    }
  }

  return Math.max(...clusterSizes);
}

function bfs(land, i, j) {
  const queue = [[i, j]];
  let clusterCells = [];
  let count = 1;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length) {
    const [x, y] = queue.shift();
    land[x][y] = 0;
    clusterCells.push([x, y]);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < land.length &&
        ny < land[0].length &&
        land[nx][ny] === 1
      ) {
        land[nx][ny] = 0;
        queue.push([nx, ny]);
        count++;
      }
    }
  }
  return { count, clusterCells };
}
