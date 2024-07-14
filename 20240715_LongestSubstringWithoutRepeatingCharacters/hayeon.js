// Map + 슬라이딩 윈도우
const lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let maxLen = start = 0;

    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) {
            start = Math.max(map.get(s[i]) + 1, start);
        }
        map.set(s[i], i);
        maxLen = Math.max(maxLen, i - start + 1);
    }

    return maxLen;
};

// Set
const lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let answer = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            if (set.has(s[j])) {
                break;
            } else {
                set.add(s[j]);
            }
        }
      
        answer = Math.max(answer, set.size);
        set.clear();
    }

    return answer;
};
