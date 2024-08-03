// 다리를 지나는 트럭
function solution (bridge_length, weight, truck_weights) {
    let sec = sum = 0;
    const passing = [];

    while (truck_weights.length || passing.length) {
      if (weight >= sum + truck_weights[0]) {
        const truck = truck_weights.shift();
        sum += truck;
        passing.push([truck, sec + bridge_length]);
        sec++;
        continue;
      }
      
      const [truck, passedSec] = passing.shift();
      sum -= truck;

      if (sec < passedSec) {
        sec = passedSec; 
      }
    }

    return sec + 1;
}


// ---- Find the winner of the circular game ---- //
// 요세푸스 문제
// f(n, k) = ((f(n − 1, k) + k − 1) % n) + 1

// 큐
function findTheWinner(n, k) {
    const queue = Array.from({ length: n }, (_, i) => i + 1);

    while (queue.length) {
        for (let i = 0; i < k - 1; i++) {
            queue.push(queue.shift());
        }
        
        queue.shift();
    }

    return queue[0];
}

function findTheWinner(n, k) {
    let winner = ;
    
    for (let i = 2; i <= n; i++) {
        winner = (winner + k) % i;
    }
        
    return winner + 1;
}
