// JavaScript for Page Navigation
// ------------------------------------------------------------
function showPage(pageId) {
  // Hide all pages
  var pages = document.querySelectorAll('.page');
  pages.forEach(function(page) {
    page.classList.remove('active', 'active2'); // remove both
  });

  // Get the selected page
  var selectedPage = document.getElementById(pageId);

  // Always add .active
  if (pageId !== 'Main_Menu') {
    selectedPage.classList.add('active');
  }

  // If it's Main_Menu, also add .active2
  else if (pageId === 'Main_Menu') {
    selectedPage.classList.add('active2');
  }
}
// -------------------------------------------------------------
  // end of Page Navigation 
// -------------------------------------------------------------


// JavaScript for Fullscreen Toggle
// -------------------------------------------------------------
  var checkbox = document.getElementById('fullscreen-toggle');

      function toggleFullscreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
          checkbox.checked = true;
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            checkbox.checked = false;
          }
        } 
      }



  // Catch F11 and Esc before browser fullscreen
  document.addEventListener('keydown', (event) => {
    if (event.key === 'F11' || event.key === 'Escape') {
      event.preventDefault();   // stop browser fullscreen/exit
      event.stopPropagation();  // stop bubbling
      toggleFullscreen();       // use our own API-based toggle
    }
  });

  // Keep checkbox in sync when exiting fullscreen by other means
  document.addEventListener('fullscreenchange', () => {
    checkbox.checked = !!document.fullscreenElement;
  });
  // -------------------------------------------------------------
  // End of Fullscreen Toggle
  // ------------------------------------------------------------


  // javaScript for player button start game
  // -------------------------------------------------------------
function startGame() {
  var playerName = document.getElementById('player-name');

  // hide footer and menu
  document.querySelector('.menu').style.display = 'none';
  document.getElementById('Main_Menu').classList.remove('active2');

  document.querySelector('.fa-solid.fa-house').style.display = 'none';
  document.querySelector('.fa-solid.fa-lightbulb').style.display = 'none';
  document.querySelector('.content').style.top = "0";
  
  showPage("Game_Main");
  
  let gameMain = document.getElementById("Game_Main");
  if (gameMain.classList.contains("active")) {
    gameMain.style.height = "90%"
    gameMain.style.width = "90%";
  }

  // add Exit button
  document.querySelector('.footer-tabs').innerHTML =
    '<a href="#Main_Menu" ' +
    'id="exitBtn" class="fa-solid fa-arrow-right-from-bracket">' +
    '<span>Exit</span></a>';

  // attach exit handler
  document.getElementById('exitBtn').addEventListener('click', exitGame);
}
    // ---------------------------------------------------------------
    // End of player button start game
    // ---------------------------------------------------------------


// Exit game function
// --------------------------------------------------------------
function exitGame(e) {
  e.preventDefault(); // prevent jumping to anchor
  document.querySelector('.fa-solid.fa-arrow-right-from-bracket').style.display = 'none';

  // restore footer and menu
  document.querySelector('.menu').style.display = 'flex';
  document.getElementById('Game_Main').classList.remove('active');
  document.querySelector('.content').style.top = "";
  document.getElementById('Main_Menu').classList.add('active2');

  // restore original footer-tabs
  document.querySelector('.footer-tabs').innerHTML =
    '<a href="#instructions" onclick="showPage(\'instructions\')" class="fa-solid fa-lightbulb"><span>Instructions</span></a>' +
    '<a href="#Main_Menu" onclick="showPage(\'Main_Menu\')" class="fa-solid fa-house"><span>Main Menu</span></a>';
}

function actuallyStartGame() {
  // Välj sidan du vill visa
  showPage('actualGamePage');

  // Generera en mattefråga
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const correctAnswer = num1 + num2;
  document.getElementById('question-text').innerText = `${num1} + ${num2} = ?`;

  // Lägg till svarshandling
  document.getElementById('answer-input').value = ''; // nollställ
  document.getElementById('answer-input').dataset.correctAnswer = correctAnswer; // spara rätt svar
  
  //checkAnswer();  // Lägg till event på Check-knappen
  // Lägg till event på Finish-knappen
  // (om du har en Finish-knapp inuti HTML eller implementerar den dynamiskt)
}

function checkAnswer() {
  const answerInput = document.getElementById('answer-input');
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = parseInt(answerInput.dataset.correctAnswer);

  if (userAnswer === correctAnswer) {
    showRightAnswer('Rätt svar!');
  } else {
    showWrongAnswer('Fel svar, försök igen!');
  }
}

function showRightAnswer(message) {
  const showRightAnswear = document.getElementById('rightAnswer');
  rightAnswer.innerText = message;
  rightAnswer.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}

function showWrongAnswer(message) {
  const showWrongAnswer = document.getElementById('wrongAnswer');
  showWrongAnswer.innerText = message;
  showWrongAnswer.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show', ''); }, 3000);
}