// 1. 해시를 활용한 문제 풀이 
var lengthOfLongestSubstring = function (s) {
    let set = new Set();
    let left = 0;
    let maxSize = 0;

    if (s.length === 0 || s.length === 1) return s.length;

    for (let i = 0; i < s.length; i++) {
        while (set.has(s[i])) {
            set.delete(s[left])
            left++;
        }
        set.add(s[i]);
        maxSize = Math.max(maxSize, i - left + 1)
    }
    
    return maxSize;
}

//Input: s = "abcabcbb"
var lengthOfLongestSubstring = function (s) {
    let maxLength = 0;
    let checkString = "";
    
    for (let i = 0; i < s.length; i++){
        if(s.length === 0 || s.length === 1) return s.length

        let sliceWord = s[i];
        let index = checkString.indexOf(sliceWord);

        // 이미 존재
        if(index !== -1){
            checkString = checkString.slice(index + 1);
        }

        checkString += sliceWord;
        maxLength = Math.max(maxLength, checkString.length)        
    }
    return maxLength;
}