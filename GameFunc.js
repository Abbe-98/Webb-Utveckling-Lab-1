let currentPlayer = "";
let currentMode = "";
let startTime = 0;


const easyMode = document.getElementById("easy-mode");
const hardMode = document.getElementById("hard-mode");
// When easy-mode is checked → hard-mode is forced to uncheck.
easyMode.addEventListener("change", () => {
    if (easyMode.checked) {
        hardMode.checked = false; // uncheck hard if easy is checked
    }
});
// When hard-mode is checked → easy-mode is forced to uncheck.
hardMode.addEventListener("change", () => {
if (hardMode.checked) {
  easyMode.checked = false; // uncheck easy if hard is checked
}
});


function actuallyStartGame() {
  const username = document.getElementById("Username-input").value.trim();

  // Check username not empty
  if (!username) {
    showFeedbkIfEmpty("Please enter your username before starting!");
    return;
  }

  // Check difficulty selected
  if (!(easyMode.checked || hardMode.checked)) {
    showFeedbkIfEmpty("Please select a difficulty (Easy or Hard)!");
    return;
  }

    // Save game info
  currentPlayer = username;
  currentMode = easyMode.checked ? "Easy" : "Hard";
  startTime = Date.now(); // mark start in ms


  // Välj sidan du vill visa
  showPage('actualGamePage');

    let gameMain = document.getElementById("actualGamePage");
  if (gameMain.classList.contains("active")) {
    gameMain.style.height = "90%"
    gameMain.style.width = "90%";
  }

  startTimer(); // startar nerräkningen automatiskt
  generateQuestions();

}  

const questions = [];

function generateQuestions() {
  
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const correctAnswer = num1 + num2; 
  document.getElementById('question-text').innerText = `${num1} + ${num2} = ?`;

  // Lägg till svarshandling
  document.getElementById('answer-input').value = ''; // nollställ
  document.getElementById('answer-input').dataset.correctAnswer = correctAnswer; // spara rätt svar
  //checkAnswer(); // kallas i html
  console.clear();

  //om tiden går ut
  

}

let correctAnswersCount = 0;
let questionCounter = document.getElementById("correctAnswersCount");

function checkAnswer() {
  const answerInput = document.getElementById('answer-input');
  const userAnswer = answerInput.value.trim(); // raw value
  const correctAnswer = parseInt(answerInput.dataset.correctAnswer);

  // Case 1: Empty input
  if (userAnswer === "") {
    showWrongAnswer("Answer cannot be empty!");
    return;
  }

  const parsedAnswer = parseInt(userAnswer);
    // Case 2: Not a valid number
  if (isNaN(parsedAnswer)) {
    showWrongAnswer("Please enter a valid number!");
    return;
  }

  // Case 3: Correct answer
  if (parsedAnswer === correctAnswer) {
    showRightAnswer("Rätt svar!");
    correctAnswersCount++;

    let totalQuestions = 10;
    questionCounter.innerText = `Question: ${correctAnswersCount}/${totalQuestions}`;


    // Win case
    if (correctAnswersCount === totalQuestions) {
      wonGame();
      const stopSec = Date.now();
      const secondsPlayed = Math.floor((stopSec - startTime) / 1000);
      saveHighScore(currentPlayer, currentMode, secondsPlayed, "Winner");
    } else {
      generateQuestions();
    }
    return;
  } else {
    showWrongAnswer("The answer is wrong!");
  }  

  answerInput.value = "";
}

function showFeedbkIfEmpty(message) {
  const showFeedbkIfEmp = document.getElementById('feedbkIfEmpty');
  showFeedbkIfEmp.innerText = message;
  showFeedbkIfEmp.className = 'show';
  setTimeout(() => { showFeedbkIfEmp.className = showFeedbkIfEmp.className.replace('show', ''); }, 2000);
}

function showRightAnswer(message) {
  const showRightAnswer = document.getElementById('rightAnswer');
  showRightAnswer.innerText = message;
  showRightAnswer.className = 'show';
  setTimeout(() => { showRightAnswer.className = showRightAnswer.className.replace('show', ''); }, 2000);
}

function showWrongAnswer(message) {
  const showWrongAnswer = document.getElementById('wrongAnswer');
  showWrongAnswer.innerText = message;
  showWrongAnswer.className = 'show';
  setTimeout(() => { showWrongAnswer.className = showWrongAnswer.className.replace('show', ''); }, 2000);
}

let timerID; // global so both start/stop can use it
let startSec; // when the timer starts
let stopSec;  // when the timer stops
let timeLeft;

function startTimer() {
   timeLeft = currentMode === "Easy" ? 60 : 5; // if easy easy 60 sek, else hard 30 sek 
  const timerDisplay = document.getElementById('timer-display');

  timerDisplay.innerText = `Time Left: ${timeLeft}s`;
  clearInterval(timerID);

  timerID = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    }
    if (timeLeft <= 0) {
      clearInterval(timerID);
      timerDisplay.innerText = "Tiden är slut!";
        
      lostGame();

      // Only save Loser if the game hasn’t already ended
      if (correctAnswersCount < 10) {
        const stopSec = Date.now();
        const secondsPlayed = Math.floor((stopSec - startTime) / 1000);
        saveHighScore(currentPlayer, currentMode, secondsPlayed, "Loser");
      }
    }
  }, 1000);
}

// ------------------------------------------------ //
function stopTimer(){
  clearInterval(timerID);
}

function wonGame(){
    stopTimer();
    showPage('wonPage');
}

function lostGame(){
    stopTimer();
    showPage('lostPage');
}


function saveHighScore(player, mode, time, result) {
  let scores = JSON.parse(localStorage.getItem("highScores")) || [];

  scores.push({ player: player, mode: mode, time: time, result: result });

  localStorage.setItem("highScores", JSON.stringify(scores));

  renderHighScores();
}

function renderHighScores() {
  const scoresTable = document.querySelector("#scores-list tbody");
  scoresTable.innerHTML = ""; // clear old rows

  let scores = JSON.parse(localStorage.getItem("highScores")) || [];

scores.sort((a, b) => {
  // Sort by time first (lower is better)
  if (a.time !== b.time) {
    return a.time - b.time;
  }
  // If times are equal → Hard beats Easy
  if (a.mode === b.mode) return 0;
  return a.mode === "Hard" ? -1 : 1;
});

  scores.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.player}</td>
      <td>${entry.mode} - ${entry.time}s - ${entry.result}</td>
    `;
    scoresTable.appendChild(row);
  });
}

// Run this on page load to show stored scores
window.onload = () => {
  renderHighScores();
};
// ------------------------------------------------ //
