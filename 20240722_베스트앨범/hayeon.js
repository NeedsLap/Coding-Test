// Map & 정렬
function solution(genres, plays) {
    const answer = [];
    const genresTotal = new Map();
    const musics = new Map();
  
    genres.forEach((v, i) => {
        genresTotal.set(v, (genresTotal.get(v) || 0) + plays[i]); // 장르별 재생 횟수
        musics.set(v, [...(musics.get(v) || []), [plays[i], i]]); // 장르별 노래 번호 리스트
    });
    // [[장르, 총 재생 횟수]]
    [...genresTotal]
        .sort((a, b) => b[1] - a[1])
        .forEach(([genre]) => {
            // 장르 내 많이 재생된 두 곡
            const bestMusics = musics
                .get(genre)
                .sort((a, b) => b[0] - a[0])
                .slice(0, 2)
                .map(v => v[1]);
            answer.push(...bestMusics);
        });
    
    return answer;
}
