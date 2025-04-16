function isPalindromeOne(str) {
    // Приводим к строке, убираем пробелы и приводим к нижнему регистру
    const cleanedStr = String(str)
      .toLowerCase()
      .replace(/\s+/g, '');
    
    // Сравниваем строку с её перевернутой версией
    return cleanedStr === cleanedStr.split('').reverse().join('');
  }

  function isPalindromeTwo(str) {
    const s = String(str).toLowerCase().replace(/\s+/g, '');
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }