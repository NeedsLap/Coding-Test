//다리를 지나는 트럭
function solution(bridge_length, weight, truck_weights) {
  const queue = new Array(bridge_length).fill(0);

  let timer = 0;
  let currentWeight = 0;

  // 타이머를 하나씩 증가시키고
  // bridge = [0,0,0,0]
  // truck <- [0,0,0,0] <- newTruck
  // 순서로 진행한다.
  for (let i = 0; i < truck_weights.length || currentWeight > 0; ) {
    timer += 1;
    currentWeight -= queue.shift();
    if (currentWeight + truck_weights[i] <= weight) {
      const truck = truck_weights[i];
      queue.push(truck);
      currentWeight += truck;
      i++;
    } else {
      // 이미 weight 초과라면 bridge 위의 truck이 빠질때까지 0을 넣어 밀어준다.
      queue.push(0);
    }
  }
  return timer;
}

// 0으로 밀어주는 것이 아니라, 가장 먼저 들어간 트럭이 나올때까지 한번에 슉 밀어주고 싶었는데
// 코드가 복잡해지더니 정리가 안되어서 실패.
