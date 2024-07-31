function dailyTemperatures(temperatures) {
    const stack = []; //아직 더 따듯한 날이 나오지 않은 날의 index를 저장
    const result = new Array(temperatures.length).fill(0); // 더 따듯한 날이 몇일 후에 오는지 저장

    //현재보다 더 따듯한 날을 찾기 위한 반복문
    for (let i = temperatures.length - 1; i >= 0; i--) {
        //스택이 비어 있지 않고 && 스택의 최상단에 있는 인덱스가 가리키는 날의 온도가 현재온도 보다 작거나 같으면 인덱스 제거
        while (stack.length && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
            stack.pop();
        }
        //만약 스택이 비어있지 않다면? 최 상담에 있는 인덱스는 현재 날보다 더 따듯한 날
        if(stack.length){
            //스택의 최상단 인덱스와 현재 인덱스의 차이를 저장 == 더 따듯한 날까지의 일수
            result[i] = stack[stack.length -1] - i;
        }
        //현재 인덱스 추가 == 나중에 비교할 때 사용하려고 인덱스 저장
        stack.push(i)
    }

    return result;
}