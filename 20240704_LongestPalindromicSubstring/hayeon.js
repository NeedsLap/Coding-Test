const findLongestPalindrome = (s, left, right) => {
    while(left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    return s.slice(left + 1, right);
}

const longestPalindrome = function(s) {
    let answer = '';

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
