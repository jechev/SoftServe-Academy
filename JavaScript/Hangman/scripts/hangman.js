let letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
let lives = 10;
let points = 0;

let matchedLetters = 0;
let words = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'august', 'autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'casey', 'cast', 'chose', 'claws', 'coach', 'letantly', 'contrast', 'cookies', 'customs', 'damage', 'danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'egypt', 'ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'harry', 'heading', 'hunter', 'illinois', 'image', 'independent', 'instant', 'january', 'kids', 'label', 'lee', 'lungs', 'manufacturing', 'martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'mount', 'mysterious', 'neighborhood', 'norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'pennsylvania', 'philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo'];

let rand; // Take random word from all words
let uniqueLettersInWord;
let canvasSteps = [drawFrame1, drawFrame2, drawFrame3, drawFrame4, drawHead, drawBody, drawRightHand, drawLeftHand, drawRightFoot, drawLeftFoot]; // Array with canvas functions order by steps
let numberOfCanvasStep = 0;
/// HTML elements
let lettersContainer = document.getElementById('letters-container');
let wordContainer = document.getElementById('word-container');
let pointsContainer = document.getElementById('points-container');
let livesContainer = document.getElementById('lives-container');
let resetButton = document.getElementById('reset');
let listWithLetters = document.createElement('ul');
let canvas = document.getElementById('hangman');
let context = canvas.getContext('2d');

letters.map(letter => createButton(letter, lettersContainer)); // Create list with all letters in HTML

resetButton.addEventListener('click', resetGame);
livesContainer.innerHTML = 'You have ' + lives + ' lives';
pointsContainer.innerHTML = 'Points: ' + points;

setNewWord(); /// Create <ul> with '_' for the choosen word

function removeChildren(container){
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createButton(value, parentEl) {
  let button = document.createElement('button');
  button.classList.add('letter-button');
  button.value = value;
  button.innerHTML = value;
  button.addEventListener("click", clickLetter);
  parentEl.appendChild(button);
}

function createListFromWord(word) {
  console.log(word);
  Array.prototype.forEach.call(word,(letter, index) => {
    let listItem = document.createElement('li');
    listItem.id = index;
    listItem.innerHTML = '_';
    listWithLetters.appendChild(listItem);
  });

  wordContainer.appendChild(listWithLetters);
}

function showMatchedLetters(indexes, letter) {
  indexes.forEach(index => {
    let listItem = document.getElementById(index);
    listItem.innerHTML = letter;
  });
}

function clickLetter(event) {
  if (lives > 0) {
    let letter = event.target.innerHTML;
    event.target.disabled = true;

    let indexes = getAllIndexes(rand, letter);
    showMatchedLetters(indexes, letter);
    countPointsAndLives(indexes);

    if (matchedLetters === uniqueLettersInWord) {
      points+= 5;
      setNewWord();
    }

    pointsContainer.innerHTML ='Points: ' + points;
    livesContainer.innerHTML = 'You have ' + lives + ' lives';
  }
}


// Gaming functions
function countPointsAndLives(indexes){
  if (indexes.length === 0) {
    canvasSteps[numberOfCanvasStep]();
    numberOfCanvasStep++;
    if (points > 0) points--;
    
    lives--;
  } else {
    matchedLetters++;
    points += indexes.length;
  }
}

// Clear HTML, set a new word and reset all variables without points
function setNewWord() {
  rand = takeRandomElement(words);
  uniqueLettersInWord = countUnique(rand);
  lives = 10;
  matchedLetters = 0;
  numberOfCanvasStep = 0;
  removeChildren(listWithLetters);
  removeChildren(lettersContainer);
  clearCanvas();
  setColor('#FFFFFF');
  setLineWidth(10);
  letters.map(letter => createButton(letter, lettersContainer));
  createListFromWord(rand);
  livesContainer.innerHTML = 'You have ' + lives + ' lives';
}


function resetGame() {
  setNewWord();
  points = 0;
  pointsContainer.innerHTML = 0;
}

// Helpful function for arrays

function countUnique(arr) {
  return new Set(arr).size;
}

function getAllIndexes(arr, val) {
  let indexes = [], i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
      indexes.push(i);
  }
  return indexes;
}

function takeRandomElement(arr) {
  let index = Math.floor(Math.random() * arr.length);
  let element = arr.splice(index, 1);
  
  return element[0];
}

// Canvas functions
function clearCanvas() {
  canvas.width = canvas.width;
};

function setColor(color) {
  context.strokeStyle = color;
};

function setLineWidth(width) {
  context.lineWidth = width;
}

function drawFrame1() {
  context.beginPath();
  context.moveTo(350, 450);
  context.lineTo(45, 450);
  context.stroke();
}

function drawFrame2() {
  context.beginPath();
  context.moveTo(350, 450);
  context.lineTo(70, 450);
  context.lineTo(70, 10);
  context.stroke();
}

function drawFrame3() {
  context.beginPath();
  context.lineTo(65, 10);
  context.lineTo(200, 10);
  context.stroke();
}

function drawFrame4() {
  context.beginPath();
  context.lineTo(70, 10);
  context.lineTo(200, 10);
  context.lineTo(200, 50);
  context.stroke();
}


function drawFrames() {
  context.beginPath();
  context.moveTo(350, 450);
  context.lineTo(10, 450);
  context.lineTo(70, 450);

  context.lineTo(70, 10);
  context.lineTo(200, 10);
  context.lineTo(200, 50);
  context.stroke();
};

function drawHead() {
  context.beginPath();
  context.arc(200, 100, 50, 0, Math.PI*2, true);
  context.closePath();
  context.lineWidth = 4;
  context.stroke();
};

function drawBody() {
  context.beginPath();
  context.moveTo(200, 150);
  context.lineTo(200, 300);
  context.stroke();
};

function drawRightHand() {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(150, 250);
  context.stroke();
};

function drawLeftHand() {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(250, 250);
  context.stroke();
};

function drawRightFoot() {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(150, 380);
  context.stroke();
};

function drawLeftFoot() {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(250, 380);
  context.stroke();
};

