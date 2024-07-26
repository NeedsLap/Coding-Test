function solution(genres, plays) {
    let genreMap = {};
    let genrePlayCount = {};

    
    genres.forEach((genre, index) => {
        let playAmount = plays[index];
        
        if (!genreMap[genre]) {
            genreMap[genre] = [];
            genrePlayCount[genre] = 0;
        }
        
        genreMap[genre].push({ index: index, play: playAmount });
        genrePlayCount[genre] += playAmount;
    });

    
    let sortedGenres = Object.keys(genrePlayCount).sort((a, b) => genrePlayCount[b] - genrePlayCount[a]);

    
    let bestAlbum = [];
        sortedGenres.forEach(genre => {
        let sortedSongs = genreMap[genre].sort((a, b) => b.play - a.play);
        sortedSongs.slice(0, 2).forEach(song => bestAlbum.push(song.index));
    });

    return bestAlbum;
}

