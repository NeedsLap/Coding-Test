// Set + dfs
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input[0]);
const k = parseInt(input[1]);
const cards = input.slice(2);
const set = new Set();

const dfs = (cnt, prev_elements, elements) => {
    elements.forEach((card, i) => {
        if (cnt + 1 === k) {
            set.add(prev_elements + elements[i]);
        } else {
            const next_elements = [...elements];
            next_elements.splice(i, 1);
            dfs(cnt + 1, prev_elements + elements[i], next_elements);
        }
    });
};

dfs(0, "", cards);
console.log(set.size);

// Set + dfs
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(input[0]);
const k = parseInt(input[1]);
const cards = input.slice(2);
const set = new Set();
const prev_elements = [];

const dfs = (cnt, elements) => {
    if (cnt === k) {
        set.add(prev_elements.join(''));
        return;
    }
    
    elements.forEach((element, i) => {
        const next_elements = [...elements];
        next_elements.splice(i, 1);

        prev_elements.push(element);
        dfs(cnt + 1, next_elements);
        prev_elements.pop();
    });
};

dfs(0, cards);
console.log(set.size);
