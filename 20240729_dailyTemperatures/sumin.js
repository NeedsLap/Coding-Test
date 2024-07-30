const dailyTemperatures = function (temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const pop = stack.pop();
      answer[pop] = i - pop;
    }
    stack.push(i);
  }
  return answer;
};
