// 완전탐색
var lengthOfLongestSubstring = function (s) {
  let max = 0;
  let left = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j = i - 1; j >= left; j--) {
      if (s[i] === s[j]) {
        left = j + 1;
      }
    }
    max = Math.max(max, i - left + 1);
  }
  return max;
};

//해쉬 Set

var lengthOfLongestSubstring = function (s) {
  let set = new Set();
  let max = 0;
  let left = 0;
  if (s.length < 2) return s.length;
  for (let i = 0; i < s.length; i++) {
    //해쉬의 같은 값이 없어질때까지 0번째 값부터 순회하며 삭제한다.
    while (set.has(s[i])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[i]);
    max = Math.max(max, set.size);
  }
  return max;
};
