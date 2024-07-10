const findLongestPalindrome = (s, left, right) => {
    // 회문 판별 및 투 포인터 확장
    while(left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    return s.slice(left + 1, right);
}

const longestPalindrome = function(s) {
    let answer = '';

    // 슬라이딩 윈도우 우측으로 이동
    for (let i = 0; i < s.length; i++) {
        const oddPalindrome = findLongestPalindrome(s, i, i);
        const evenPalindrome = findLongestPalindrome(s, i, i + 1);
        const longerPalindrome = 
              oddPalindrome.length > evenPalindrome.length ? oddPalindrome : evenPalindrome;
              
        if (longerPalindrome.length > answer.length) {
            answer = longerPalindrome;
        } 
    }

    return answer;
};
