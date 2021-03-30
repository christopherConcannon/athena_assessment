export const average = nums => {
  return Math.round(nums.reduce((acc, cur) => acc + cur, 0) / nums.length)
}