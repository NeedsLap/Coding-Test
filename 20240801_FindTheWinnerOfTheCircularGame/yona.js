//1. 다리를 지나는 트럭

function solution(bridge_length, weight, truck_weights) {    
    //passingTruck이란 큐에 [트럭무게, 이 트럭이 다리를 나가는 시간]을 저장
    let time = 0, passingTruck = [], bridgeWeight = 0; 
    
    //대기 트럭, 다리를 건너는 트럭이 모두 끝날 때까지 while문 반복 진행
    while (truck_weights.length > 0 || passingTruck.length > 0) {
        time += 1;

        //지나가는 트럭이 있고, 이 트럭이 다리에서 나가는 시간이 현재 시간과 같다면? 
        //=> 다리에서 내보내주고, 다리위 무게에서 빼준다.
        if (passingTruck.length > 0 && passingTruck[0][1] === time) {
            bridgeWeight -= passingTruck.shift()[0]; 
        }

        //대기 트럭이 있고, 다리 위 트럭의 무게 + 다음 대기조 트럭 무게 <= 올라갈 수 있는 트럭무게 라면? 
        // => 대기조 트럭 첫번째 다리위로 이동, 큐에 [트럭무게, 이 트럭이 다리를 나갈 시간]을 추가
        if (truck_weights.length > 0) {
            let nextTruckWeight = truck_weights[0];
            
            if (bridgeWeight + nextTruckWeight <= weight) {
                truck_weights.shift()
                passingTruck.push([nextTruckWeight, time + bridge_length]); 
                //대기조 트럭이 다리위로 올라왔으니 추가
                bridgeWeight += nextTruckWeight; 
            }
        }
    }
    //대기조 트럭과, 큐에 있는 모든 트럭이 건너서 비어있다면 while문을 종료하고 time을 반환
    return time;
}
