export function sumOfSquares(arr) {
    return arr.reduce((sum, num) => sum + num * num, 0);
  }