// 빠른 답
function solution(phone_book) {
    phone_book.sort();
    
    for (let i = 0; i < phone_book.length - 1; i++) {
        // 이전 문자열이 접두사인지 확인
        if (phone_book[i+1].startsWith(phone_book[i])) {
            return false;
        }
    }
    
    return true;
}

// Set(O(N)보다 빠른 해시(O(1)) 테이블, 검색 트리(O(log(N)), 혹은 다른 자료구조) 사용
function solution(phone_book) {
    const phoneSet = new Set(phone_book);

    // number의 접두사 존재 여부 확인
    for (const number of phone_book) {
        for (let i = 1; i < number.length; i++) {
            const prefix = number.slice(0, i);
            if (phoneSet.has(prefix)) {
                return false;
            }
        }
    }
    
    return true;
}
