const settingsBtn = document.querySelector('#settings-btn'); 
const settings = document.querySelector('#settings');
const word = document.querySelector('#word');
const text = document.querySelector('#text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endgameEl = document.querySelector('#end-game-container');
const settingsForm = document.querySelector('#settings-form');
const difficultySelect = document.querySelector('#difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randomWord;

let score = 0;

let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM(){
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore(){
  score++;
  scoreEl.innerText = score;
}

function updateTime(){
  time--;
  timeEl.innerText = `${time}s`;

  if(time === 0){
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver(){
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onClick="location.reload()">Play Again</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();

function toggleSettings(){
  settings.classList.toggle('hide');
}

settingsBtn.addEventListener('click', toggleSettings);
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if(insertedText === randomWord){
    addWordToDOM();
    updateScore();
    e.target.value = '';

    if(difficulty === 'hard'){
      time += 2;
    } else if(difficulty === 'medium'){
      time += 4;
    } else{
      time += 5;
    }
    updateTime();
  }
});

settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});