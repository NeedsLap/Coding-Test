const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const inputLine = input.map((v) => v.trim());
const [n, k, ...cardNum] = inputLine;
const set = new Set();
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (+k === 2 && i !== j) {
      set.add(cardNum[i] + cardNum[j]);
    }
    for (let o = 0; o < n; o++) {
      if (+k === 3 && i !== j && i !== o && o !== j) {
        set.add(cardNum[i] + cardNum[j] + cardNum[o]);
      }
      for (let z = 0; z < n; z++) {
        if (
          +k === 4 &&
          i !== j &&
          i !== o &&
          i !== z &&
          j !== o &&
          j !== z &&
          o !== z
        ) {
          set.add(cardNum[i] + cardNum[j] + cardNum[o] + cardNum[z]);
        }
      }
    }
  }
}

console.log(set.size);
