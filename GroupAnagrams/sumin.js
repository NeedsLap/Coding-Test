const groupAnagrams = function (strs) {
  if (strs.length === 1) return [strs];

  let gruop = {};
  for (let s of strs) {
    let sortedStr = s.split("").sort().join("");
    if (gruop[sortedStr]) {
      gruop[sortedStr].push(s);
    } else {
      gruop[sortedStr] = [s];
    }
  }

  return Object.values(gruop).reverse();
};
