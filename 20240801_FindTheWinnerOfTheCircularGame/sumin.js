const findTheWinner = function (n, k) {
  const queue = Array(n)
    .fill(1)
    .map((v, i) => v + i);
  let count = 0;
  while (queue.length > 1) {
    const shiftQ = queue.shift();
    if (count === k - 1) {
      count = 0;
      continue;
    }
    queue.push(shiftQ);
    count++;
  }
  return queue.pop();
};
