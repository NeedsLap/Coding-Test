
// 이전에 hash로 풀수 있는 방법이라는 걸 알고 해시로 풀었던 코드
function solution(phone_book) {
    let phoneNumber = {};
    
    for(const number of phone_book){
        phoneNumber[number] = true
    }
    
    for(const number of phone_book){
        for(let i = 1; i < number.length; i++){
            const checkNum = number.slice(0,i)    
            if(phoneNumber[checkNum])
            return false
        }
    }
    return true;
}

// 이번에 hash 안쓰고 가장 짧은 단어부터 돌아가면서 푸는 아이디어로 푼 방법
function solution(phone_book) {
    phone_book.sort();

    for (let i = 0; i < phone_book.length - 1; i++) {
        if (phone_book[i + 1].startsWith(phone_book[i])) {
            return false;
        }
    }
    return true;
}
