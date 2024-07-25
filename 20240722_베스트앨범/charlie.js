// map + 정렬 + 정렬
// 시간복잡도 O(n^2)
function solution(genres, plays) {
  const genreMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    // Map에 key : genre, value : [index, index, ...] 로 만들어주기
    genreMap.set(genres[i], [...(genreMap.get(genres[i]) || []), i]);
  }

  // 총 플레이 횟수에 따라 정렬
  // 총 플레이 횟수 합산을 위해 reduce 사용
  // sortedGenres = [[가장 많이 재생된 Genre, [index 나열]], [다음 Genre, [index...]], ...]
  const sortedGenres = [...genreMap.entries()].sort((a, b) => {
    const aSum = a[1].reduce((ac, cu) => ac + plays[cu], 0);
    const bSum = b[1].reduce((ac, cu) => ac + plays[cu], 0);
    return bSum - aSum;
  });

  // 앞에서부터 돌면서 index를 플레이 횟수 기준으로 정렬
  // genre = [genre Name, [가장 많이 플레이된 index, 다음 index, ...]]
  // 길이가 1이면 하나만 넣고, 2이상이면 2개를 넣기
  const answer = [];
  for (const genre of sortedGenres) {
    genre[1].sort((a, b) => plays[b] - plays[a]);
    console.log(genre[1]);
    if (genre[1].length == 1) {
      answer.push(genre[1][0]);
    } else {
      answer.push(genre[1][0], genre[1][1]);
    }
  }
  return answer;
}

// 위 코드를 claude 도움으로 최적화한 아래 코드
// 시간 복잡도 O(n log n)
function solution(genres, plays) {
  const genreMap = new Map();
  const genrePlayCount = new Map();

  // genreMap 의 결과물은 같으나 value 의 배열은 참조라는 것을 이용
  // 새로운 배열을 만들어주는게 아니라, push 하는 것으로 시간복잡도 감소
  // 이왕 반복하는김에 장르별 플레이 횟수도 함께 저장 -> reduce 따로 안해도 됨
  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (!genreMap.has(genre)) {
      genreMap.set(genre, []);
      genrePlayCount.set(genre, 0);
    }

    genreMap.get(genre).push(i);
    genrePlayCount.set(genre, genrePlayCount.get(genre) + play);
  }

  // 플레이 횟수 저장한 Map을 내림차순으로 정렬
  const sortedGenres = [...genrePlayCount.entries()].sort(
    (a, b) => b[1] - a[1]
  );
  const answer = [];

  // 정렬된 순서대로 genreMap에서 노래 목록 추출
  // 노래 목록을 플레이 많이 된 순서로 정렬 -> answer에 넣어주기
  for (const [genre] of sortedGenres) {
    const songs = genreMap.get(genre);
    songs.sort((a, b) => plays[b] - plays[a]);

    answer.push(songs[0]);
    if (songs.length > 1) {
      answer.push(songs[1]);
    }
  }

  return answer;
}
