// <-- 홍수채우기 -->
// BFS

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const queue = [[sr, sc]];
  const rows = image.length;
  const cols = image[0].length;
  const sameArea = image[sr][sc];

  // 이 케이스를 추가하지 않으면 무한루프가 발생한다.
  if (sameArea === color) {
    return image;
  }

  while (queue.length) {
    const [currentX, currentY] = queue.shift();
    image[currentX][currentY] = color;

    for (const direct of directions) {
      const [newX, newY] = [currentX + direct[0], currentY + direct[1]];

      // 동서남북 가능한 영역 확장 범위로 계속 queue에 넣어준다.
      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        image[newX][newY] === sameArea
      ) {
        queue.push([newX, newY]);
      }
    }
  }
  return image;
};

// <-- 바닥장식 -->
// BFS
// 한번에 작성한 로직
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [info, ...rest] = input.split("\n");
const [N, M] = info.split(" ").map(Number);
const floor = rest.map((el) => el.split(""));
const directionsX = [
  [0, 1],
  [0, -1],
];
const directionsY = [
  [1, 0],
  [-1, 0],
];

const queue = [];
let count = 0;
for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    let shape = floor[x][y];
    if (floor[x][y] !== 0) {
      queue.push([x, y]);
      count += 1;
    }
    while (queue.length) {
      const [currentX, currentY] = queue.shift();
      floor[currentX][currentY] = 0;
      const directs = shape === "-" ? directionsX : directionsY;
      // 가로만 확인할것이냐, 세로만 확인할것이냐

      for (const [dx, dy] of directs) {
        const [newX, newY] = [currentX + dx, currentY + dy];
        if (
          newX >= 0 &&
          newX < N &&
          newY >= 0 &&
          newY < M &&
          floor[newX][newY] === shape
        ) {
          queue.push([newX, newY]);
        }
      }
    }
  }
}
console.log(count);

// --> claude 추천 정리
// bfs 함수를 따로 분리하라!
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [info, ...rest] = input.split("\n");
const [N, M] = info.split(" ").map(Number);
const floor = rest.map((el) => el.split(""));
const directionsX = [
  [0, 1],
  [0, -1],
];
const directionsY = [
  [1, 0],
  [-1, 0],
];

let count = 0;

function bfs(startX, startY) {
  const queue = [[startX, startY]];
  const shape = floor[startX][startY];
  floor[startX][startY] = "0"; // 방문 처리

  while (queue.length) {
    const [currentX, currentY] = queue.shift();
    const directs = shape === "-" ? directionsX : directionsY;

    for (const [dx, dy] of directs) {
      const [newX, newY] = [currentX + dx, currentY + dy];
      if (
        newX >= 0 &&
        newX < N &&
        newY >= 0 &&
        newY < M &&
        floor[newX][newY] === shape
      ) {
        queue.push([newX, newY]);
        floor[newX][newY] = "0"; // 방문 처리
      }
    }
  }
}

for (let x = 0; x < N; x++) {
  for (let y = 0; y < M; y++) {
    if (floor[x][y] !== "0") {
      bfs(x, y);
      count += 1;
    }
  }
}
console.log(count);

// <-- 바이러스 -->
// BFS
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();
const [N, lineCount, ...rest] = input.split("\n");
const line = rest.map((el) => el.split(" ").map(Number));
const visited = new Set();

const queue = [1];
visited.add(1);
// 초기값으로 visited에 1을 넣어주지 않으면 1이 아무 컴퓨터에도 연결되어 있지 않을때 -1이 출력됨
while (queue.length) {
  const comNum = queue.shift();
  for (const [from, to] of line) {
    if (from === comNum && !visited.has(to)) {
      queue.push(to);
      visited.add(to);
    }
    if (to === comNum && !visited.has(from)) {
      queue.push(from);
      visited.add(from);
    }
  }
}
console.log(visited.size - 1);
// 1은 빼고 계산해야함
