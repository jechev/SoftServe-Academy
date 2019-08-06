// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/hangman.js":[function(require,module,exports) {
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
var lives = 10;
var points = 0;
var matchedLetters = 0;
var words = ['acres', 'adult', 'advice', 'arrangement', 'attempt', 'august', 'autumn', 'border', 'breeze', 'brick', 'calm', 'canal', 'casey', 'cast', 'chose', 'claws', 'coach', 'letantly', 'contrast', 'cookies', 'customs', 'damage', 'danny', 'deeply', 'depth', 'discussion', 'doll', 'donkey', 'egypt', 'ellen', 'essential', 'exchange', 'exist', 'explanation', 'facing', 'film', 'finest', 'fireplace', 'floating', 'folks', 'fort', 'garage', 'grabbed', 'grandmother', 'habit', 'happily', 'harry', 'heading', 'hunter', 'illinois', 'image', 'independent', 'instant', 'january', 'kids', 'label', 'lee', 'lungs', 'manufacturing', 'martin', 'mathematics', 'melted', 'memory', 'mill', 'mission', 'monkey', 'mount', 'mysterious', 'neighborhood', 'norway', 'nuts', 'occasionally', 'official', 'ourselves', 'palace', 'pennsylvania', 'philadelphia', 'plates', 'poetry', 'policeman', 'positive', 'possibly', 'practical', 'pride', 'promised', 'recall', 'relationship', 'remarkable', 'require', 'rhyme', 'rocky', 'rubbed', 'rush', 'sale', 'satellites', 'satisfied', 'scared', 'selection', 'shake', 'shaking', 'shallow', 'shout', 'silly', 'simplest', 'slight', 'slip', 'slope', 'soap', 'solar', 'species', 'spin', 'stiff', 'swung', 'tales', 'thumb', 'tobacco', 'toy', 'trap', 'treated', 'tune', 'university', 'vapor', 'vessels', 'wealth', 'wolf', 'zoo'];
var rand; // Take random word from all words

var uniqueLettersInWord;
var canvasSteps = [drawFrame1, drawFrame2, drawFrame3, drawFrame4, drawHead, drawBody, drawRightHand, drawLeftHand, drawRightFoot, drawLeftFoot]; // Array with canvas functions order by steps

var numberOfCanvasStep = 0; /// HTML elements

var lettersContainer = document.getElementById('letters-container');
var wordContainer = document.getElementById('word-container');
var pointsContainer = document.getElementById('points-container');
var livesContainer = document.getElementById('lives-container');
var resetButton = document.getElementById('reset');
var listWithLetters = document.createElement('ul');
var canvas = document.getElementById('hangman');
var context = canvas.getContext('2d');
letters.map(function (letter) {
  return createButton(letter, lettersContainer);
}); // Create list with all letters in HTML

resetButton.addEventListener('click', resetGame);
livesContainer.innerHTML = 'You have ' + lives + ' lives';
pointsContainer.innerHTML = 'Points: ' + points;
setNewWord(); /// Create <ul> with '_' for the choosen word

function removeChildren(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createButton(value, parentEl) {
  var button = document.createElement('button');
  button.classList.add('letter-button');
  button.value = value;
  button.innerHTML = value;
  button.addEventListener("click", clickLetter);
  parentEl.appendChild(button);
}

function createListFromWord(word) {
  console.log(word);
  Array.prototype.forEach.call(word, function (letter, index) {
    var listItem = document.createElement('li');
    listItem.id = index;
    listItem.innerHTML = '_';
    listWithLetters.appendChild(listItem);
  });
  wordContainer.appendChild(listWithLetters);
}

function showMatchedLetters(indexes, letter) {
  indexes.forEach(function (index) {
    var listItem = document.getElementById(index);
    listItem.innerHTML = letter;
  });
}

function clickLetter(event) {
  if (lives > 0) {
    var letter = event.target.innerHTML;
    event.target.disabled = true;
    var indexes = getAllIndexes(rand, letter);
    showMatchedLetters(indexes, letter);
    countPointsAndLives(indexes);

    if (matchedLetters === uniqueLettersInWord) {
      points += 5;
      setNewWord();
    }

    pointsContainer.innerHTML = 'Points: ' + points;
    livesContainer.innerHTML = 'You have ' + lives + ' lives';
  }
} // Gaming functions


function countPointsAndLives(indexes) {
  if (indexes.length === 0) {
    canvasSteps[numberOfCanvasStep]();
    numberOfCanvasStep++;
    if (points > 0) points--;
    lives--;
  } else {
    matchedLetters++;
    points += indexes.length;
  }
} // Clear HTML, set a new word and reset all variables without points


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
  letters.map(function (letter) {
    return createButton(letter, lettersContainer);
  });
  createListFromWord(rand);
  livesContainer.innerHTML = 'You have ' + lives + ' lives';
}

function resetGame() {
  setNewWord();
  points = 0;
  pointsContainer.innerHTML = 0;
} // Helpful function for arrays


function countUnique(arr) {
  return new Set(arr).size;
}

function getAllIndexes(arr, val) {
  var indexes = [],
      i = -1;

  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }

  return indexes;
}

function takeRandomElement(arr) {
  var index = Math.floor(Math.random() * arr.length);
  var element = arr.splice(index, 1);
  return element[0];
} // Canvas functions


function clearCanvas() {
  canvas.width = canvas.width;
}

;

function setColor(color) {
  context.strokeStyle = color;
}

;

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
}

;

function drawHead() {
  context.beginPath();
  context.arc(200, 100, 50, 0, Math.PI * 2, true);
  context.closePath();
  context.lineWidth = 4;
  context.stroke();
}

;

function drawBody() {
  context.beginPath();
  context.moveTo(200, 150);
  context.lineTo(200, 300);
  context.stroke();
}

;

function drawRightHand() {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(150, 250);
  context.stroke();
}

;

function drawLeftHand() {
  context.beginPath();
  context.moveTo(200, 170);
  context.lineTo(250, 250);
  context.stroke();
}

;

function drawRightFoot() {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(150, 380);
  context.stroke();
}

;

function drawLeftFoot() {
  context.beginPath();
  context.moveTo(200, 300);
  context.lineTo(250, 380);
  context.stroke();
}

;
},{}],"C:/Users/dimit/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58161" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/dimit/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/hangman.js"], null)
//# sourceMappingURL=/hangman.cd826bd6.js.map