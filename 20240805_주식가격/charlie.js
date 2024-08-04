//주식가격
function solution(prices) {
  const answer = new Array(prices.length).fill(0);
  const stack = [];

  prices.forEach((price, idx) => {
    // 새로 확인하는 가격보다 큰 애는 다 빠진다. == 새로 들어온 애가 stack에서 가장 큰 애다.
    while (stack.length > 0 && stack[stack.length - 1][0] > price) {
      answer[stack[stack.length - 1][1]] = idx - stack[stack.length - 1][1];
      stack.pop();
    }
    stack.push([price, idx]);
  });

  // 끝까지 가격이 떨어지지 않는 경우 stack에 남아있기 때문에 일괄적으로 적용해준다.
  while (stack.length > 0) {
    answer[stack[stack.length - 1][1]] =
      prices.length - stack[stack.length - 1][1] - 1;
    stack.pop();
  }
  return answer;
}
