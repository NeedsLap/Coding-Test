// 인풋값 설정
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
input.shift();

/// 배열안에 숫자로 저장
const queue = input.map((v) => v.split(" ").map(Number));
let answer = "";

///짝수배열의 첫번째 인덱스는 location의 값으로 (ex.5)
///홀수배열은 priorities의 배열로 사용(ex.[1,2,3,4,5])
for (let i = 0; i < queue.length; i += 2) {
  let count = 0;
  const priorities = queue[i + 1];
  let location = queue[i][1];

  /// 가장 우선순위가 높은 숫자와 맨 앞에 있는 우선순위가 같고 location이 0 일 경우 answer에 count+
  while (true) {
    const max = Math.max(...priorities);
    const shiftFirst = priorities.shift();

    if (shiftFirst === max) {
      count++;

      if (location === 0) {
        answer += count + "\n";
        break;
      }
      location--;
    } else {
      if (location === 0) {
        location = priorities.length;
      } else {
        location--;
      }
      priorities.push(shiftFirst);
    }
  }
}
console.log(answer);
