// 투 포인터 알고리즘 활용
var threeSum = function (nums) {
  // 오름차순 정렬
  nums.sort((a, b) => a - b);
  const answer = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // 첫 번째 숫자의 중복 건너뛰기
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // i는 고정, j는 왼쪽 출발, k는 오른쪽 출발
    let j = i + 1,
      k = nums.length - 1;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      // sum이 음수면 음수++, 양수면 양수--;
      if (sum > 0) {
        k--;
      } else if (sum < 0) {
        j++;
      } else {
        answer.push([nums[i], nums[j], nums[k]]);
        // 두 번째와 세 번째 숫자의 중복 건너뛰기
        while (j < k && nums[j] === nums[j + 1]) j++;
        while (j < k && nums[k] === nums[k - 1]) k--;
        j++;
        k--;
      }
    }
  }
  return answer;
};
