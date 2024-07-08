// 투 포인터 O(n^2)
const threeSum = function(nums) {
  const answer = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1, right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        answer.push([nums[i], nums[left], nums[right]]);

	while (nums[left] === nums[left + 1]) {
	  left++;
	}

	while (nums[right] === nums[right - 1]) {
	  right--;
	}

	left++;
	right--;
      } else if (sum < 0) {
	left++;
      } else {
	right--;
      }
    }
  }

  return answer;
};

// 브루트 포스(완전탐색) O(n^3)
// 시간 초과
const threeSum = function(nums) {
  const answer = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < nums.length - 1; j++) {   
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }
	    
      for (let k = j + 1; k < nums.length; k++) {
        if (k > j + 1 && nums[k] === nums[k - 1]) {
          continue;
        }

      if (nums[i] + nums[j] + nums[k] === 0) {
	  answer.push([nums[i], nums[j], nums[k]]);
      }
    }
  }

  return answer;
};
