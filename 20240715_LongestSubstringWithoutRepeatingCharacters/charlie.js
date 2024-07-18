/**
 * @param {string}
 * @return {number}
 */

// indexOf 활용 단순 풀이
// 시간복잡도 O(n * m)
// n은 입력 문자열 s의 길이, m은 storage의 현재 길이
var lengthOfLongestSubstring = function (s) {
  let storage = "";
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    if (storage.includes(s[i])) {
      const index = storage.indexOf(s[i]);
      storage = storage.slice(index === -1 ? 0 : index + 1);
    }
    storage += s[i];
    max = Math.max(max, storage.length);
  }
  return max;
};

// 슬라이딩 윈도우 활용
// 해시맵 활용
// 시간복잡도 O(n)
var lengthOfLongestSubstring = function (s) {
  const storage = new Map();
  let max = 0;

  let left = 0,
    right = 0;
  while (right < s.length) {
    if (storage.has(s[right])) {
      left = Math.max(left, storage.get(s[right]) + 1);
    }
    max = Math.max(max, right - left + 1);
    storage.set(s[right], right);
    right++;
  }
  return max;
};

// Claude발 코드
// 시간복잡도 O(n)
// 슬라이딩 윈도우 활용
// 가독성 향상
var lengthOfLongestSubstring = function (s) {
  const lastSeen = new Map();
  let start = 0;
  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    if (lastSeen.has(s[i])) {
      start = Math.max(start, lastSeen.get(s[i]) + 1);
    }
    lastSeen.set(s[i], i);
    maxLength = Math.max(maxLength, i - start + 1);
  }

  return maxLength;
};
