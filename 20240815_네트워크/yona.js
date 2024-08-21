//네트워크
function solution(n, computers) {
    //방문 기록 확인을 위해 배열생성 : 초기값 false
    const visited = Array(n).fill(false);

    function bfs(start) {
        let queue = [start]; 
        visited[start] = true; 

        while (queue.length > 0) {
            let node = queue.shift(); 

            for (let i = 0; i < n; i++) {                
                if (computers[node][i] === 1 && !visited[i]) {
                    visited[i] = true;  
                    queue.push(i);      
                }
            }
        }
    }

    // 네트워크 개수
    let networkCount = 0;

    //전체 콤퓨타를 돌면서 방문한 적 없다면 bfs들 돌면서 네트워크 개수 추가
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            bfs(i);          
            networkCount++;  
        }
    }

    return networkCount;  
}
