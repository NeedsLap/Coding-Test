// 연습문제 : Flood Fill
/* 
- 난관극복 #1 : 시작지점과 변경하고 싶은 color 가 같다면? 에 대한 경우를 생각하지 못함
- 난관극복 #2 : 위 경우를 예외처리해 주지 않아도 인접한 칸 체크하고 끝나니 상관 없다고 생각했으나, DFS 함수가 연결된 모든 공간을 재방문하려고 시도 => 조건 불충족으로 다시 탐색하는 과정이 반복 
=> 스택이 계속 쌓여 스택오버 플로우가 발생하는걸 생각하지 못했습니다. */

var floodFill = function(image, sr, sc, color) {
    const startColor = image[sr][sc];

    if (startColor === color) return image;

    function dfs(i, j) {
        if (i < 0 || j < 0 || i >= image.length || j >= image[0].length || image[i][j] !== startColor) return;
    
        image[i][j] = color;

        dfs(i + 1, j); 
        dfs(i - 1, j); 
        dfs(i, j + 1); 
        dfs(i, j - 1); 
    }
    dfs(sr,sc)

    return image  
};

// 메인문제 : 바닥 장식
const file = process.platform === 'linux' ? '/dev/stdin' : './index.txt';
const input = require('fs').readFileSync(file).toString().split('\n');

// ✅ 1. 이중 for 문을 사용한 방법
// const [N,M] = input[0].split(" ").map(Number);
// let area = [];

// for (let i = 1; i <= N; i++ ){
//     area.push(input[i].split(""))
// }

// size = N * M;

// for(let i = 0; i < N; i++){
//     for(let j = 0; j < M; j++){
//         let c = area[i][j];
        //"_" 이면서 왼쪽 타일과 같은 케이스
//         if(j >= 1 && c === "-" && c === area[i][j-1]) {
//             size--
//         }
        //"|" 이면서 아래쪽 타일과 같은 케이스
//         else if(i < N-1 && c === "|" && c === area[i+1][j])
//             size--;
//     }

// }
// console.log(size)

// ✅ 2. DFS
const [N,M] = input.shift().split(" ").map(Number);
let area = [];
for (let i = 0; i < N; i++){
    area.push(input[i].split(""));
}

const visited = Array.from({length :N}, ()=> Array(M).fill(false));
let size = 0;

function dfs(x, y){
    let current = area[x][y];
    let directions;

    if(current === "-"){
        directions = [[0,1],[0,-1]]; //가로췌크
    }else if (current === "|"){
        directions = [[1,0],[-1,0]]; //세로췌크
    }

    visited[x][y] = true;

    for (let [dx, dy] of directions){
        let nx = x + dx;
        let ny = y + dy;

        //범위내 있고, 방문하지 않았으며, 같은 문자라면 DFS 진행한다.
        if(nx >= 0 && nx < N && ny >=0 && ny < M && !visited[nx][ny] && area[nx][ny] === current){
            dfs(nx, ny);
        }
    }
}

// 전체 바닥장식 순회 
for (let i = 0; i < N; i++){
    for (let j = 0; j < M; j++){    
        if(! visited[i][j]){
            dfs(i,j);
            size++
        }
    }
}

console.log(size)