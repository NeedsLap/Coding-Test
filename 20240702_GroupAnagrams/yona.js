const groupAnagrams = function(strs) {
    let words = {};

    for (let str of strs){
        let keyword = str.split("").sort().join("")
        if(words[keyword]){
            words[keyword].push(str)
        }else{
            words[keyword] = [str]
        }
        
    }
    return Object.values(words);
};
