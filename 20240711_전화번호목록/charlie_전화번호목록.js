// 완전탐색
// 시간복잡도 O(n^2 * m)
// n은 전화번호의 개수, m은 가장 긴 전화번호의 길이
function solution(phone_book) {
  for (let i = 0; i < phone_book.length - 1; i++) {
    for (let j = i + 1; j < phone_book.length; j++) {
      if (phone_book[j].indexOf(phone_book[i]) === 0) return false;
    }
  }
  return true;
}

// 해시
// 시간복잡도 O(nm)
// NOTE 오히려 비효율적인 것 같아도, 다른 방식보다 시간복잡도가 낮다
function solution(phone_book) {
  const set = new Set(phone_book); // 다 저장
  for (let phone of phone_book) {
    for (let i = 1; i < phone.length; i++) {
      // 0109331 -> 0 10 010 0109 01093 010933 0109331 ... 이렇게 하나씩 잘라가며 set에 있는지 확인
      if (set.has(phone.slice(0, i))) {
        return false;
      }
    }
  }
  return true;
}

// AI발 다른 코드
// 정렬 활용
// 시간복잡도 O(nlogn + nm)
// String.prototype.startsWith() 메서드 확인
function solution(phone_book) {
  phone_book.sort();
  for (let i = 0; i < phone_book.length - 1; i++) {
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }
  return true;
}
