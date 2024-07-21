//완전탐색
// 정확도 3개 틀림
// 시간 측정 3개 오버
function solution(phone_book) {
  for (let i = 0; i < phone_book.length - 1; i++) {
    for (let j = i + 1; j < phone_book.length; j++) {
      if (phone_book[j].startsWith(phone_book[i])) {
        return false;
      }
    }
  }
  return true;
}

//해쉬 Set을 사용한 풀이
function solution(phone_book) {
  const set = new Set(phone_book);

  for (let v of phone_book) {
    for (i = 0; i < v.length; i++) {
      if (set.has(v.slice(0, i))) return false;
    }
  }
  return true;
}
