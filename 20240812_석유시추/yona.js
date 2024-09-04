//석유시추

function solution(land) {
    //행개수
    const n = land.length;
    //열개수
    const m = land[0].length;

    //상하좌우 방향으로 움직이기 위한 배열
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];

    //각 열에 대해 석유의 총량을 기록할 배열
    let result = Array(m).fill(0);
    let visited = Array.from({ length: n }, () => Array(m).fill(0));

    // a, b 에서 시작해서 상하좌우로 연결된 석유 덩어리 계산
    function bfs(a, b) {
        //현재 석유덩어리 크기 계산을 위한 count
        let count = 0;

        visited[a][b] = 1;
        // BFS를 위한 큐(queue), 시작점을 큐에 추가
        let queue = [];
        queue.push([a, b]);

        let minY = b, maxY = b;

        // BFS를 통해 연결된 석유 덩어리 탐색
        while (queue.length > 0) {
            let [x, y] = queue.shift();
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            count++;

            // 4방향으로 탐색
            for (let i = 0; i < 4; i++) {
                let nx = x + dx[i];
                let ny = y + dy[i];

                  // 범위를 벗어나는 경우 탐색을 건너뜀
                if (nx < 0 || ny < 0 || nx >= n || ny >= m) {
                    continue;
                }
                  // 아직 방문하지 않은 석유 덩어리일 경우, 탐색 큐에 추가
                if (visited[nx][ny] === 0 && land[nx][ny] === 1) {
                    visited[nx][ny] = 1;
                    queue.push([nx, ny]);
                }
            }
        }

        // minY부터 maxY까지 걸친 열에 대해, 현재 석유 덩어리 크기(count)를 기록
        // 즉, 이 석유 덩어리가 걸친 모든 열에 대해 해당 덩어리 크기를 더함
        for (let i = minY; i <= maxY; i++) {
            result[i] += count;
        }
    }

    // 각 좌표에 대해 BFS를 실행
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            //아직 방문한적 없고, 석유가 있는 경우 방문진행
            if (visited[i][j] === 0 && land[i][j] === 1) {
                bfs(i, j);
            }
        }
    }

    // 각 열에 대해 시추관을 설치했을 때의 최대 석유량을 찾음
    let answer = Math.max(...result);
    return answer;
}
