// 완전탐색 (브루투포스) + 해시Set
// 시간복잡도 O(n^k)
// 코드 지저분
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = [parseInt(input[0]), parseInt(input[1])];
const nums = input.slice(2);
const set = new Set();

for (let a = 0; a < n; a++) {
  for (let b = 0; b < n; b++) {
    if (k === 2 && a !== b) {
      set.add(nums[a] + nums[b]);
    }
    for (let c = 0; k > 2 && c < n; c++) {
      if (k === 3 && a !== b && a !== c && b !== c) {
        set.add(nums[a] + nums[b] + nums[c]);
      }
      for (let d = 0; k > 3 && d < n; d++) {
        if (
          k === 4 &&
          a !== b &&
          a !== c &&
          a !== d &&
          b !== c &&
          b !== d &&
          c !== d
        )
          set.add(nums[a] + nums[b] + nums[c] + nums[d]);
      }
    }
  }
}
const answer = set.size;
console.log(answer);

// 재귀를 이용한 DFS + 해시Set
// 시간복잡도 시간복잡도 O(n!/(n-k)!)
// 완전탐색에서 for 중첩 반복문을 재귀함수로 바꿨다는 것의 차이
// 깔끔할 줄 알았는데 visitedIdx 관리하는 것이 오히려 불편
// '1', '1' 처럼 중복된 숫자가 없었으면 훨씬 간단했을듯
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = [parseInt(input[0]), parseInt(input[1])];
const nums = input.slice(2);
const set = new Set();

function dfs(visitedIdx, plusNum) {
  if (visitedIdx.size == k) {
    set.add(plusNum);
    return;
  }
  for (let i = 0; i < n; i++) {
    if (!visitedIdx.has(i)) {
      const newVisitedIdx = new Set(visitedIdx);
      newVisitedIdx.add(i);
      dfs(newVisitedIdx, plusNum + nums[i]);
    }
  }
}

dfs(new Set(), "");
console.log(set.size);

// 재귀
// 시간복잡도 O(k * n!/(n-k)!)
// 결국 모든 순열을 찾아야 해서 시간복잡도는 줄일 수 없었다.
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = [parseInt(input[0]), parseInt(input[1])];
const nums = input.slice(2);
const set = new Set();

function recursive(current, count, remainNums) {
  if (count === k) {
    set.add(current);
    return;
  }

  for (let i = 0; i < remainNums.length; i++) {
    recursive(current + remainNums[i], count + 1, [
      ...remainNums.slice(0, i),
      ...remainNums.slice(i + 1),
    ]);
  }
}

recursive("", 0, nums);
console.log(set.size);
