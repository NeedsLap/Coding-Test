let threeSum = function (nums) {
  let answer = [];
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1;
    right = nums.length - 1;
    while (left < right) {
      let threeSum = nums[i] + nums[left] + nums[right];
      if (threeSum > 0) {
        right--;
      } else if (threeSum < 0) {
        left++;
      } else {
        answer.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      }
    }
  }
  return answer;
};
