//Дана строка - последовательность, которая может состоять как из 0, так и 1. Необходимо найти максимальную последовательность 1 и вывести ее длину.

function maxSequenceOfOnes(str) {
    let maxCount = 0;
    let currentCount = 0;
    
    for (let char of str) {
      if (char === '1') {
        currentCount++;
        maxCount = Math.max(maxCount, currentCount);
      } else {
        currentCount = 0;
      }
    }
    
    return maxCount;
  }