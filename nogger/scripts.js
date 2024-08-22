const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverMessage = document.getElementById("gameOver");

let timer = 0;
let isAlive;
let timerInterval;

function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");

    setTimeout(function () {
      dino.classList.remove("jump");
    }, 600); // Duration matches the CSS jump animation length
  }
}

function startGame() {
  // Hide start button and game over message, show game elements
  startBtn.style.display = "none";
  restartBtn.style.display = "none";
  gameOverMessage.style.display = "none";
  dino.style.display = "block";
  cactus.style.display = "block";

  // Reset timer
  timer = 0;
  timerDisplay.textContent = `Time: ${timer}s`;

  // Start timer interval
  timerInterval = setInterval(function () {
    timer++;
    timerDisplay.textContent = `Time: ${timer}s`;
  }, 1000);

  // Collision detection
  isAlive = setInterval(function () {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 55 && cactusLeft > 0 && dinoBottom <= 100) { // Adjusted collision detection
      clearInterval(isAlive);
      clearInterval(timerInterval);

      // Show game over message and restart button
      gameOverMessage.style.display = "block";
      restartBtn.style.display = "block";
      dino.style.display = "none";
      cactus.style.display = "none";
    }
  }, 10);
}

// Start the game only when the start button is clicked
startBtn.addEventListener("click", function () {
  startGame();
});

// Restart the game when the restart button is clicked
restartBtn.addEventListener("click", function () {
  startGame();
});

document.addEventListener("keydown", function () {
  jump();
});
