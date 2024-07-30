// 큐를 이용한 스택 구현

var MyStack = function () {
  this.inQueue = [];
  this.outQueue = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  return this.inQueue.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  if (this.inQueue.length) {
    this.inQueue = this.inQueue.reverse();
    // this.outQueue = this.inQueue.concat(this.outQueue);
    this.outQueue = [...this.inQueue, ...this.outQueue];
    this.inQueue = [];
  }
  return this.outQueue.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
  if (!this.outQueue.length) {
    return this.inQueue[this.inQueue.length - 1];
  } else {
    return this.outQueue[0];
  }
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.inQueue.length === 0 && this.outQueue.length === 0;
};

// 일일 온도
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const storage = [];

  temperatures.forEach((temp, idx) => {
    while (storage.length > 0 && storage[storage.length - 1][0] < temp) {
      answer[storage[storage.length - 1][1]] =
        idx - storage[storage.length - 1][1];
      storage.pop();
    }
    storage.push([temp, idx]);
  });
  return answer;
};
