// ------------ Game State Variables -----------
let secretNumber;
let attempts;
let guessHistory;
let gameActive = true;

// ------------ DOM Elements -----------
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');
const messageDiv = document.getElementById('message');
const historyDiv = document.getElementById('history');
const themeToggle = document.getElementById('theme-toggle');
const howToPlayBtn = document.getElementById('howtoplay');
const howToPlayPopup = document.getElementById('howtoplay-popup');
const closeHowToPlay = document.getElementById('close-howtoplay');

// ------------ Game Functions -----------

/** Start or restart the game */
function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessHistory = [];
  gameActive = true;
  showMessage('', ''); // clear message
  historyDiv.innerHTML = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartBtn.style.display = 'none';
  guessInput.focus();
}

/** Check the user's guess */
function checkGuess() {
  if (!gameActive) return;

  const guess = Number(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    showMessage('❌ Please enter a number between 1 and 100.', 'error');
    return;
  }
  attempts++;
  guessHistory.push(guess);

  if (guess < secretNumber) {
    showMessage('⬆️ Too low!', 'hint');
  } else if (guess > secretNumber) {
    showMessage('⬇️ Too high!', 'hint');
  } else {
    showMessage(`🎉 <strong>Correct!</strong> The number was <b>${secretNumber}</b>. Attempts: <b>${attempts}</b>`, 'success');
    gameActive = false;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = '';
  }
  renderHistory();
  guessInput.value = '';
  guessInput.focus();
}

/** Show feedback message with style */
function showMessage(msg, type) {
  messageDiv.innerHTML = msg;
  messageDiv.className = 'message'; // reset classes
  if (type) messageDiv.classList.add(type);
  // Animate message fade-in
  setTimeout(() => messageDiv.classList.add('show'), 40);
  setTimeout(() => messageDiv.classList.remove('show'), type === 'success' ? 7000 : 1800);
}

/** Render all previous guesses as badges */
function renderHistory() {
  if (guessHistory.length === 0) {
    historyDiv.innerHTML = '';
    return;
  }
  historyDiv.innerHTML = 'Guesses: ' +
    guessHistory.map(g => `<span>${g}</span>`).join('');
}

// ------------ Events -----------

// Guess with button
guessBtn.addEventListener('click', checkGuess);

// Guess with Enter key
guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});

// Restart with button
restartBtn.addEventListener('click', startGame);

// Restart with 'r' key when finished
document.addEventListener('keydown', (e) => {
  if ((e.key === 'r' || e.key === 'R') && !gameActive) {
    startGame();
  }
});

// ------------ Theme Toggle -----------
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  document.querySelector('.game-container').classList.toggle('dark');
  document.querySelector('.game-container').classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});
document.body.classList.add('dark');
document.querySelector('.game-container').classList.add('dark');

// ------------ How to Play Popup -----------
function showHowToPlay(show) {
  howToPlayPopup.style.display = show ? '' : 'none';
  if (show) closeHowToPlay.focus();
}
howToPlayBtn.addEventListener('click', () => showHowToPlay(true));
howToPlayBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') showHowToPlay(true);
});
closeHowToPlay.addEventListener('click', () => showHowToPlay(false));
closeHowToPlay.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') showHowToPlay(false);
});
howToPlayPopup.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') showHowToPlay(false);
});
document.addEventListener('click', (e) => {
  if (e.target === howToPlayPopup) showHowToPlay(false);
});

// ------------ Accessibility: Focus trap for popup -----------
howToPlayPopup.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    closeHowToPlay.focus();
  }
});

// ------------ Start Game On Load -----------
startGame();