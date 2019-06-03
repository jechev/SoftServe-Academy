// Go to cinema task
let age = 11;
let accompanied = true;

isCanGoToCinema(age, accompanied);

function isCanGoToCinema(age, accompanied) {
  let result = false;

  if (age >= 12 || accompanied === true) {
    result = true;
  }

  return result;
}
// Looping a triangle
let symbol = '#';

for (let index = 1; index <= 7; index++) {
  console.log(symbol.repeat(index));
}

//Fizzbuzz
for (let index = 1; index <= 100; index++) {
  if (index % 5 === 0 && index % 3 === 0) {
    console.log('FizzBuzz');
  } else if (index % 5 === 0) {
    console.log('Buzz');
  } else if(index % 3 === 0) {
    console.log('Fizz');
  } else {
    console.log(index);
  }
}

//Chessboard
let board = '';
let evenRow = '# # # # ';
let oddRow = ' # # # #';

for (var i = 0; i < 8; i++) {
  if (i % 2 == 0) {
    board += evenRow + '\n';
  } else {
    board += oddRow + '\n';
  }
}

console.log(board);
