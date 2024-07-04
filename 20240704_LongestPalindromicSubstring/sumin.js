const longestPalindrome = function (s) {
  const n = s.length;

  if (n === 1) return s;

  const dp = Array.from(Array(n), () => Array(n).fill(false));

  let start = 0;
  let maxLength = 1;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLength = 2;
    }
  }

  for (let length = 3; length <= n; length++) {
    for (i = 0; i < n - length + 1; i++) {
      const j = i + length - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        start = i;
        maxLength = length;
      }
    }
  }

  return s.substring(start, start + maxLength);
};
