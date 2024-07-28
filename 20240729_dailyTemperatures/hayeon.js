const dailyTemperatures = function(temperatures) {
    const answer = new Array(temperatures.length).fill(0);
    const stack = [];

    temperatures.forEach((v, i) => {
        // 현재 온도가 스택에 있는 이전 온도보다 높을 경우
        while (stack.length && v > temperatures[stack.at(-1)]) {
            const last = stack.pop(); // 스택에서 제거하고
            answer[last] = i - last; // 기다려야 하는 일수 저장
        }

        stack.push(i); // 스택에 현재 온도(인덱스) 저장
    });

    return answer;
};

// 시간 초과
const dailyTemperatures = function(temperatures) {
    const answer = [];

    temperatures.forEach((v, i) => {
        let cnt = 0;

        for (let j = i + 1; j < temperatures.length; j++) {
            cnt++;
            
            if (v < temperatures[j]) {
                answer.push(cnt);
                return;
            }
        }

        answer.push(0);
    });

    return answer;
};
