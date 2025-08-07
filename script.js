// ----- Game State -----
let secretNumber;
let attempts;
let guessHistory;
let gameActive = true;

// ----- DOM Elements -----
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');
const messageDiv = document.getElementById('message');
const historyDiv = document.getElementById('history');

// ----- Functions -----
function startGame() {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessHistory = [];
  gameActive = true;
  messageDiv.textContent = '';
  historyDiv.textContent = '';
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  restartBtn.style.display = 'none';
  guessInput.focus();
}

function checkGuess() {
  if (!gameActive) return;

  const guess = Number(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    messageDiv.textContent = 'Enter a number between 1 and 100!';
    return;
  }
  attempts++;
  guessHistory.push(guess);

  if (guess < secretNumber) {
    messageDiv.textContent = 'Too low!';
  } else if (guess > secretNumber) {
    messageDiv.textContent = 'Too high!';
  } else {
    messageDiv.textContent = `🎉 Correct! The number was ${secretNumber}. Attempts: ${attempts}`;
    gameActive = false;
    guessInput.disabled = true;
    guessBtn.disabled = true;
    restartBtn.style.display = '';
  }
  historyDiv.textContent = `Guesses: ${guessHistory.join(', ')}`;
  guessInput.value = '';
  guessInput.focus();
}

// Keyboard support: Enter to guess, R to restart
guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' && !gameActive) startGame();
});

// Button events
guessBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', startGame);

// Theme toggle (reuse from calculator)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  document.querySelector('.game-container').classList.toggle('dark');
  document.querySelector('.game-container').classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('dark') ? '🌙' : '☀️';
});
document.body.classList.add('dark');
document.querySelector('.game-container').classList.add('dark');

// Start game on load
startGame();