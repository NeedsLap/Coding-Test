// <---- 연습문제 : 촌수계산 ---->
// <-- 맨땅에 헤딩 코드 -->

const fs = require("fs");
const input = fs.readFileSync("./test.txt").toString().trim();
const [n, goal, m, ...rest] = input.split("\n");
const [from, to] = goal.split(" ");
const fromParent = new Map();
const fromChild = new Map();
rest.forEach((el) => {
  const [parent, child] = el.split(" ");
  if (!fromParent.has(parent)) {
    fromParent.set(parent, []);
  }
  if (!fromChild.has(child)) {
    fromChild.set(child, []);
  }
  fromParent.get(parent).push(child);
  fromChild.get(child).push(parent);
});

let minCount = 300;
function fromChildBfs(from, to, count) {
  const queue = [from];

  while (queue.length) {
    const person = queue.shift();
    if (person !== to) {
      count += fromParentBfs(person, to, count);
    }
    minCount = count;
    if (fromChild.has(person)) {
      fromChild.get(person).forEach((el) => queue.push(el));
    }
    count += 1;
  }
}

function fromParentBfs(from, to, count) {
  const queue = [from];

  while (queue.length) {
    const person = queue.shift();
    if (person === to) {
      return count;
    }
    if (fromParent.has(person)) {
      fromParent.get(person).forEach((el) => queue.push(el));
    }
    count += 1;
  }
  return 0;
}

fromChildBfs(from, to, 0);

console.log(minCount);
return 0;

// <-- GPT 수정 코드 -->
// 처음 접근했던 방법은 시작 지점에서 위로 이동하면서
// 이동하는 칸마다 다시 아래로 이동해서 count를 합산하는 것.
// 하지만 적절히 동작하지 않았고, 불필요한 탐색을 많이 한다.
// 고민 끝에 GPT의 도움을 받았는데
// 단순히 위 아래 탐색을 하되, visited 를 확인하면
// 시작 지점부터 BFS로 얕게 탐색이 가능하다!
// 너무 시작부터 그래프 그림을 생각하면 나처럼 방황할 수 있다.

const fs = require("fs");
const input = fs.readFileSync("./test.txt").toString().trim();
const [n, goal, m, ...rest] = input.split("\n");
const [from, to] = goal.split(" ");
const fromParent = new Map();
const fromChild = new Map();
rest.forEach((el) => {
  const [parent, child] = el.split(" ");
  if (!fromParent.has(parent)) {
    fromParent.set(parent, []);
  }
  if (!fromChild.has(child)) {
    fromChild.set(child, []);
  }
  fromParent.get(parent).push(child);
  fromChild.get(child).push(parent);
});

function bfs(start, target) {
  const queue = [[start, 0]];
  const visited = new Set();

  while (queue.length > 0) {
    const [person, count] = queue.shift();

    if (person === target) {
      return count;
    }

    if (!visited.has(person)) {
      visited.add(person);

      if (fromParent.has(person)) {
        fromParent.get(person).forEach((child) => {
          queue.push([child, count + 1]);
        });
      }

      if (fromChild.has(person)) {
        fromChild.get(person).forEach((parent) => {
          queue.push([parent, count + 1]);
        });
      }
    }
  }

  return -1; // 경로가 없는 경우
}

const minCount = bfs(from, to);
console.log(minCount);

// ----------------------------------------------

// <---- 기타문제 : 퍼즐 ---->
// 잘 돌아가는데, 메모리 및 시간 초과
// 개선할 부분 몰라

// 아이디어.
// 중복을 제외하고 백트래킹 하면 되지 않는가
// 3x3 고정이니까 가능할것 같다.
// 그렇다면 어떻게 중복을 확인하는가? -> set에 이차원 배열을 넣으면 확인할 수 없다.
// 그렇다면 이차원배열을 flat한 일차원 배열은 가능한가? -> 불가능하다.
// 그렇다면 일차원배열을 join한 문자열은 가능한가? -> 가능하다.
// 그렇게 될때까지 돌려본다.

const fs = require("fs");
const input = fs.readFileSync("./test.txt").toString().trim().split("\n");

const originalPuzzle = input.map((el) => el.split(" ")).flat();
const startPosition = originalPuzzle.indexOf("0");
const goal = "123456780";
const directions = [-1, 1, -3, 3];
const visited = new Set();

function swap(from, to, puzzle) {
  const newPuzzle = puzzle.split("");
  const temp = newPuzzle[from];
  newPuzzle[from] = newPuzzle[to];
  newPuzzle[to] = temp;
  return newPuzzle;
}

function bfs(originalPuzzle, idx) {
  const queue = [[originalPuzzle, idx, 0]];

  while (queue.length) {
    const [puzzle, idx, count] = queue.shift();
    const strPuzzle = puzzle.join("");

    if (strPuzzle === goal) {
      return count;
    }
    if (visited.has(strPuzzle)) {
      continue;
    }

    visited.add(strPuzzle);

    directions.forEach((dir) => {
      const newPos = dir + idx;
      if (newPos >= 0 && newPos < 9) {
        const newPuzzle = swap(idx, newPos, strPuzzle);
        queue.push([newPuzzle, newPos, count + 1]);
      }
    });
  }

  return -1;
}

const answer = bfs(originalPuzzle, startPosition);
console.log(answer);
return 0;

// ----------------------------------------------

// <---- 메인문제 : 네트워크 ---->
// BFS
function bfs(idx, visited, computers) {
  const queue = [idx];

  while (queue.length) {
    const newCom = queue.shift();
    computers[newCom].forEach((el, i) => {
      if (el === 1 && i !== newCom && !visited.has(i)) {
        queue.push(i);
        visited.add(i);
      }
    });
  }
}

function solution(n, computers) {
  const visited = new Set();
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      count += 1;
      visited.add(i);
      bfs(i, visited, computers);
    }
  }
  return count;
}
