function solution(genres, plays) {
  const answer = [];
  /// 노래 재생수 합을 담는 Map
  const genresCount = new Map();
  /// 노래 재생수와 인덱스를 담는 Map
  const genresMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    genresCount.set(genres[i], (genresCount.get(genres[i]) || 0) + plays[i]);
    if (!genresMap.has(genres[i])) {
      genresMap.set(genres[i], []);
    }
    genresMap.get(genres[i]).push([plays[i], i]);
  }
  /// 재생순 많이들은 순으로 정렬
  for (v of genresMap.keys()) {
    genresMap.get(v).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  }
  /// 많이들은 순으로 장르 정렬
  const genresOrder = [...genresCount.entries()]
    .sort((a, b) => {
      const sumA = a[1];
      const sumB = b[1];
      return sumB - sumA;
    })
    .map((item) => item[0]);

  /// 장르순으로 인덱스 answer에 push
  for (v of genresOrder) {
    const songIndex = genresMap.get(v).map((v) => v[1]);
    answer.push(...songIndex.slice(0, 2));
  }

  return answer;
}
