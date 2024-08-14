//주식가격

function solution(prices) {
    const answer = new Array(prices.length).fill(0);
    const stack = [];
    
    for(let i = 0; i < prices.length; i++){
        while(stack.length > 0 && prices[stack[stack.length - 1]] > prices[i]){
            const last = stack.pop();
            answer[last] = i - last
        }
        stack.push(i);
    }
    
    while(stack.length > 0){
        const last = stack.pop()
        answer[last] = prices.length - 1 - last
    }

    return answer;
}