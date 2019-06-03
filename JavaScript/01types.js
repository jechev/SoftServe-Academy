// Integer
let number = 3;
let number1 = Number(5);

// Float
let floatNumber = 4.5;
let floatNumber1 = new Number(4.5);

// Boolean
let boolean = true;
let boolean1 = new Boolean(false);

// String
let string = 'demo';
let string1 = new String('demo');

// DateTime
let date = new Date('2018-06-04');

// undefined
let b = undefined;

// Array
let arrNumbers = [1, 2, 3];
let arrNumbers1 = new Array(1, 2, 3, 4);

let arrStrings = ['demo', 'demo1', 'demo3'];
let arrStrings1 = new Array('javascript', 'angular');

let mixedArr = [1, false, 'string', {name: 'Pesho'}];
let mixxedArr = new Array(true, 6 , 'demo', 8);

// object
let obj = { id: 1, name: 'ABC' };

let obj1 = new Object();
obj1.id = 2;
obj1.name = 'ABC';

// delete property
delete obj.name;
delete obj1.name;

// add property
obj.prop1 = '';
obj1['prop1'] = '';

// assign value to property
let q = 'tst';
obj.prop1 = q;
obj1['prop1'] = q;

// What are results of these expressions?
let expr1 = '' + 1 + 0; // '10'
let expr2 = '' - 1 + 0; // -1
let expr3 = true + false; // 1
let expr4 = 6 / '3'; // 2
let expr5 = '2' * '3'; // 6
let expr6 = 4 + 5 + 'px'; // '9px'
let expr7 = '$' + 4 + 5; // '$45'
let expr8 = '4' - 2; // 2
let expr9 = '4px' - 2; // NaN
let expr10 = 7 / 0; // Infinity
let expr11 = '  -9  ' + 5; // '  -9  5'
let expr12 = '  -9  ' - 5; // - 14
let expr13 = null + 1; // 1
let expr14 = undefined + 1; /// NaN