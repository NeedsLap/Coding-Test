// <-- 섬의 개수 -->
// 연습문제
// BFS
/**
 * @param {number} x
 * @param {number} y
 * @param {character[][]} grid
 * @return {1}
 */
function bfs(x, y, grid) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[x, y]];

  while (queue.length) {
    const [nowX, nowY] = queue.shift();
    directions.forEach((direction) => {
      const newX = direction[0] + nowX;
      const newY = direction[1] + nowY;

      if (
        newX >= 0 &&
        newX < grid.length &&
        newY >= 0 &&
        newY < grid[0].length &&
        grid[newX][newY] === "1"
      ) {
        queue.push([newX, newY]);
        grid[newX][newY] = "0";
      }
    });
  }
  return 1;
}

/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "1") {
        count += bfs(x, y, grid);
      }
    }
  }
  return count;
};

// DFS
/**
 * @param {character[][]} grid
 * @return {number}
 */

function dfs(i, j, grid) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  grid[i][j] = 0;
  directions.forEach((direction) => {
    newI = i + direction[0];
    newJ = j + direction[1];
    if (
      newI >= 0 &&
      newI < grid.length &&
      newJ >= 0 &&
      newJ < grid[0].length &&
      grid[newI][newJ] === "1"
    ) {
      dfs(newI, newJ, grid); // queue 이용하지 않고, 재귀를 이용
    }
  });
}

var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        count += 1;
        dfs(i, j, grid);
      }
    }
  }
  return count;
};

// ----------------------------------------------------------------

// <-- 석유 시추 -->
// 메인 문제
// BFS

////// 1번째 코드
// 정확도는 100점, 효율성은 1,4,5,6 케이스에서 시간 초과
//// --> 깊은 복사 부분 때문일 가능성
function bfs(x, y, land) {
  const directions = [
    // 좌표 상하좌우로 움직이기
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[x, y]];
  let count = 1;
  land[x][y] = 0; // 이미 방문한 지역은 0으로 바꿔준다.

  while (queue.length) {
    const [nowX, nowY] = queue.shift();
    directions.forEach((direction) => {
      // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표에 대해서 모두 동일한 작업을 하겠다.
      const newX = direction[0] + nowX;
      const newY = direction[1] + nowY;

      if (
        newX >= 0 &&
        newX < land.length &&
        newY >= 0 &&
        newY < land[0].length &&
        land[newX][newY] === 1
      ) {
        count += 1;
        queue.push([newX, newY]); // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표가 'land를 벗어나지 않고, 값이 1이고, 이미 방문한 x,y가 아니라면' 새로 확인한 붙어있는 지역으로 판단하고 queue에 추가한다.
        land[newX][newY] = 0;
      }
    });
  }
  return count;
}

function solution(land) {
  let count = 0;

  for (let y = 0; y < land[0].length; y++) {
    let temp = 0;
    const landCopy = land.map((row) => [...row]); // 매 열마다 새로 계산해주어야 하기에 깊은 복사를 사용했다. --> 이 부분 때문에 효율성 테스트 시간초과일 가능성이 높다.
    for (let x = 0; x < land.length; x++) {
      if (landCopy[x][y] === 1) {
        // 이미 방문한 곳은 값이 0으로 바뀌어 있어 재방문하지 않는다.
        temp += bfs(x, y, landCopy);
      }
    }
    count = Math.max(temp, count);
  }
  return count;
}

////// 2번째 코드
// 깊은 복사 때문인줄 알았지만, 이를 바꿔줘도 동일한 문제가 생긴다.
// 이차원 배열이기 때문에 set으로 visited를 구현하고, "x,y"형태로 저장한다.
// 이렇게 해도 시간초과 -> 오히려 효율성 테스트 1,2,3,4,5,6 모두 시간 초과
// ---> 근본적인 해결책이 필요하다.
function bfs(x, y, land, visited) {
  const directions = [
    // 좌표 상하좌우로 움직이기
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[x, y]];
  let count = 1;
  visited.add(x + "," + y); // 이미 방문한 지역은 visited Set 에 'x,y' 형태로 넣어둔다.

  while (queue.length) {
    // queue가 남아있을때까지 반복한다.
    const [nowX, nowY] = queue.shift(); // 가장 앞에 있는 지역을 뺀다. (이미 계산된 지역이며 인접한 지역을 확인하기 위한 작업)
    directions.forEach((direction) => {
      // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표에 대해서 모두 동일한 작업을 하겠다.
      const newX = direction[0] + nowX;
      const newY = direction[1] + nowY;

      if (
        newX >= 0 &&
        newX < land.length &&
        newY >= 0 &&
        newY < land[0].length &&
        land[newX][newY] === 1 &&
        !visited.has(newX + "," + newY)
      ) {
        count += 1;
        queue.push([newX, newY]); // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표가 'land를 벗어나지 않고, 값이 1이고, 이미 방문한 x,y가 아니라면' 새로 확인한 붙어있는 지역으로 판단하고 queue에 추가한다.
        visited.add(newX + "," + newY);
      }
    });
  }
  return count;
}

function solution(land) {
  let count = 0;

  for (let y = 0; y < land[0].length; y++) {
    let temp = 0;
    const visited = new Set(); // 깊은 복사를 하지 않고 visited Set을 만들었다.
    for (let x = 0; x < land.length; x++) {
      if (land[x][y] === 1 && !visited.has(x + "," + y)) {
        // 이미 방문한 곳은 방문하지 않는다.
        temp += bfs(x, y, land, visited);
      }
    }
    count = Math.max(temp, count);
  }
  return count;
}

////// 3번째 코드
// idea: 이미 방문했던 곳은 방문하지 않는다.
// 앞 열 탐색시 확인했던 곳은 확인하지 않고 해당 영역의 크기만 확인한다.
// 하지만 BFS 상 한번 큐를 다 돌아야 해당 크기가 나오고, 해당 영역에 다시 크기를 넣어주려면 힘들다.
// 각 영역당 index를 부여하고, 각 열은 index를 들고 있고
// 최종 count 확인은 n * m 배열을 한번 훑으며 index 영역이 몇개인지 확인한다.
// 이를 합산한 열들 중 가장 큰 값을 return 한다.
// ---> 효율성 테스트 통과
/*
	테스트 1 〉	통과 (54.31ms, 46.4MB)
	테스트 2 〉	통과 (58.48ms, 53.3MB)
	테스트 3 〉	통과 (44.00ms, 53.6MB)
	테스트 4 〉	통과 (46.42ms, 46.1MB)
	테스트 5 〉	통과 (77.67ms, 51.3MB)
	테스트 6 〉	통과 (54.29ms, 46.9MB)
*/
function bfs(x, y, land, areaIdx) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue = [[x, y]];
  let count = 1;
  land[x][y] = areaIdx; // 이미 방문한 지역은 방문했다는 것과 어떤 지역인지 표시를 위해 areaIdx로 바꿔준다.

  while (queue.length) {
    // queue가 남아있을때까지 반복한다.
    const [nowX, nowY] = queue.shift();
    // 가장 앞에 있는 지역을 뺀다. (이미 계산된 지역이며 인접한 지역을 확인하기 위한 작업)
    directions.forEach((direction) => {
      // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표에 대해서 모두 동일한 작업을 하겠다.
      const newX = direction[0] + nowX;
      const newY = direction[1] + nowY;

      if (
        newX >= 0 &&
        newX < land.length &&
        newY >= 0 &&
        newY < land[0].length &&
        land[newX][newY] === 1
      ) {
        count += 1;
        queue.push([newX, newY]);
        // 현재 x,y 에서 상하좌우로 한칸씩 움직인 좌표가 'land를 벗어나지 않고, 값이 1이고, 이미 방문한 x,y가 아니라면' 새로 확인한 붙어있는 지역으로 판단하고 queue에 추가한다.
        land[newX][newY] = areaIdx;
      }
    });
  }
  return count;
}

function solution(land) {
  const colList = new Map(); // 각 col 별로 어떤 지역에 닿는가 (areaIdx) 를 넣어둔다
  const areaSizes = new Map(); // 각 area 별로 크기가 어떤지 넣어둔다.

  let areaIdx = 2;
  for (let y = 0; y < land[0].length; y++) {
    colList.set(y, []);
    // 첫번째 확인하는 y에 새로 빈배열을 만들어준다.
    for (let x = 0; x < land.length; x++) {
      if (
        land[x][y] !== 1 &&
        land[x][y] !== 0 &&
        !colList.get(y).includes(land[x][y])
        // 이미 방문했다면 값은 1도 아니고 0도 아닌 areaIdx 일 것이다.
        // 이미 방문했기도 했고 이미 colList에 있다면 넘어간다.
      ) {
        colList.get(y).push(land[x][y]);
        // 그럼 굳이 계산하지 않고 colList 에 areaIdx만 넣어주고 continue 한다.
        continue;
      }

      if (land[x][y] === 1) {
        // land[x][y]가 1인 경우는 처음 방문하는 지역일 경우
        areaSizes.set(areaIdx, bfs(x, y, land, areaIdx));
        colList.get(y).push(areaIdx);
        areaIdx += 1;
        // area확인 후 다음 지역을 위해 areaIdx를 1 증가시켜준다.
      }
    }
  }

  let maxCount = 0;
  for (const areas of colList.values()) {
    const count = areas.reduce((ac, cu) => ac + areaSizes.get(cu), 0);
    // 각 col 별로 들고있는 areaIdx를 areaSizes 에 접근해서 영역 합을 계산한다.
    // 합이 가장 큰 col이 maxCount가 된다.
    maxCount = Math.max(maxCount, count);
  }
  return maxCount;
}

// ----------------------------------------------------------------

// <-- 여행 경로 -->
// 심화 문제
// 경로 문제이기 때문에 BFS는 불가. DFS.
function dfs(routes, ticketMap, current) {
  while (ticketMap.has(current) && ticketMap.get(current).length > 0) {
    const next = ticketMap.get(current).pop();
    dfs(routes, ticketMap, next);
  }
  routes.push(current); // 마지막에 호출한 dfs가 먼저 routes에 들어온다. === 시작에서 가장 먼 지역부터 역순으로 들어온다.
}

function solution(tickets) {
  const ticketMap = new Map();

  for (let [from, to] of tickets) {
    if (!ticketMap.has(from)) {
      ticketMap.set(from, []);
    }
    ticketMap.set(
      from,
      [...ticketMap.get(from), to].sort((a, b) => b.localeCompare(a))
    );
  }

  const routes = [];
  dfs(routes, ticketMap, "ICN");

  return routes.reverse(); // 뒤집어준다.
}
