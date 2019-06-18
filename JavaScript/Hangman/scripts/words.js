var app = app || {};

(function(hangman) {
  let wordContainer = document.getElementById('word-container');
  let uniqueLetters = 0;
  let word;
  let listWithLetters = document.createElement('ul');
  
  let words = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'august', 'autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'casey', 'cast', 'chose', 'claws', 'coach', 'letantly', 'contrast', 'cookies', 'customs', 'damage', 'danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'egypt', 'ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'harry', 'heading', 'hunter', 'illinois', 'image', 'independent', 'instant', 'january', 'kids', 'label', 'lee', 'lungs', 'manufacturing', 'martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'mount', 'mysterious', 'neighborhood', 'norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'pennsylvania', 'philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo'];

  function takeRandomElement(arr) {
    let index = Math.floor(Math.random() * arr.length);
    let element = arr.splice(index, 1);
    
    return element[0];
  }

  function countUnique(arr) {
    return new Set(arr).size;
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

  function loadNewWord() {
    let newWord = takeRandomElement(words);
    uniqueLetters = countUnique(newWord);
    createListFromWord(newWord);
    localStorage.setItem('word', newWord);;
  }
  
  
  hangman.loadNewWord = function () {
    loadNewWord();
  }
  


})(app);