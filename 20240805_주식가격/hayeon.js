// ---- 주식가격 ---- //
function solution(prices) {
    const answer = [];

    prices.forEach((v, i) => {
        let sec = 0;
        
        for (let j = i + 1; j < prices.length; j++) {
            sec++;
            
            if (prices[j] < v) {
                break;
            }
        }
        
        answer.push(sec);
    });

    return answer;
}

// ---- 올바른 괄호 ---- //
function solution(s){
    const queue = [];
    
    for (const v of s) {
        if (v === '(') {
            queue.push('(');
        } else if (queue.length) {
            queue.pop();
        } else {
            return false;
        }
    }

    return queue.length ? false : true;
}

// ---- 프로세스 ---- //
function solution(priorities, location) {
    const queue = Array.from({length: priorities.length}, (_, i) => i);
    const sortedPriorities = [...priorities].sort();
    
    while (queue.length) {
        const item = queue.splice(0, 1)[0];

        if (sortedPriorities.at(-1) !== priorities[item]) {
            queue.push(item);
        } else if (item === location) {
            break;
        } else {
            sortedPriorities.pop();
        }
    }
    
    return priorities.length - queue.length;
}
