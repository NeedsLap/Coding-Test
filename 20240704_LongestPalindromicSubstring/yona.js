  function palindromeChecker(s){
    let left = 0;
    let right = s.length - 1;

    while(left < right){
        if(s[left] !== s[right]){
            return false
        }else{
            left++
            right--
        }
    }
    return true;
}

function longestPalindrome(s){
    if (s.length === 1) return s

    let sublength = s.length

    for(let sliceLength = sublength; sliceLength > 0; sliceLength--){
        for(let start = 0; start <= sublength - sliceLength; start++){
            let checkSub = s.substring(start,start + sliceLength)
            if (palindromeChecker(checkSub)) return checkSub
        }
    }
}
