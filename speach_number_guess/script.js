const msg = document.querySelector('#msg');

const randomNum = getRandomNumber();

console.log(`The correct number is: ${randomNum}`);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

function onSpeak(e){
  console.log(e.value);
}

function getRandomNumber(){
  return Math.floor(Math.random() * 100) + 1;
}

recognition.addEventListener('result', onSpeak);