console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4

console.log(calculateDogAge(7));
// → 'Your doggie is 49 years old in dog years!'

console.log(reverseNumber(-12345));
// → -54321

console.log(isPalindrome('madam'));
// → true

console.log(findLongestWord('Hello Javascript, how are you'));
// → Javascript

console.log(returnTypeOfArgument(45));
// → number

excuteInputFunction(paramFunction);
// → 'I am a parameter function'

console.log(getFunctionName());
// → 'getFunctionName'

function min(num1, num2) {
  return num1 < num2 ? num1 : num2;
}

function isEven(num) {
  num = Math.abs(num);

  if (num === 0) {
    return true;
  }

  if (num === 1) {
    return false;
  }

  return isEven(num - 2);
}

function countBs(input) {
  let result = 0;
  let b = 'B';
  for (let char of input) {
    if (char === b) {
      result += 1;
    }
  }
  return result;
}

function countChar(input, inputChar) {
  let result = 0;
  let matchChar = inputChar;
  for (let char of input) {
    if (char === matchChar) {
      result += 1;
    }
  }
  return result;
}

function calculateDogAge(age) {
  return `Your doggie is ${age * 7} years old in dog years!`
}

function reverseNumber(num) {
  return parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num);
}

function isPalindrome(input) {
  let reverseInput = input.split('').reverse().join('');
  
  if (input === reverseInput) {
    return true;
  } else {
    return false;
  }
}

function sortAlphabetically(input) {
  return input.split('').sort().join('').replace(/\s+/g, '');
}

function findLongestWord(input) {
  let arrInput = input.match(/([A-Za-z])+/g);
  let result = arrInput[0];
  for (let index = 1; index < arrInput.length; index++) {
    if (arrInput[index].length > result.length) {
      result = arrInput[index];
    }
  }
  return result;
}

function returnTypeOfArgument(arg) {
  return typeof arg;
}

function excuteInputFunction(func) {
  func();
  
}

function paramFunction() {
  console.log('I am a parameter function');
}

function getFunctionName() {
  return arguments.callee.name;
}