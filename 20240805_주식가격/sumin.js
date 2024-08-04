function solution(prices) {
  const answer = [];
  for (let i = 0; i < prices.length; i++) {
    let sec = 0;
    for (let j = i + 1; j < prices.length; j++) {
      sec++;
      if (prices[i] > prices[j]) {
        break;
      }
    }
    answer.push(sec);
  }
  return answer;
}
