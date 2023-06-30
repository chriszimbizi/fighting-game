// Collision detection function
function collisionDetection({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <=
      rectangle2.position.y + rectangle2.height &&
    rectangle1.isAttacking
  );
}

// Toggle Settings Button
const settingsButton = document.querySelector(".settings-icon i");
const settingsDropdown = document.querySelector(".settings-dropdown");

// Event listener to toggle settings visibility and close settings dropdown when clicking outside
document.addEventListener("click", toggleSettings);

// Function to toggle settings visibility and close settings dropdown when clicking outside
function toggleSettings(event) {
  const targetElement = event.target;
  const isSettingsButton = targetElement === settingsButton;
  const isInsideDropdown = settingsDropdown.contains(targetElement);

  settingsDropdown.classList.toggle(
    "active",
    isSettingsButton || isInsideDropdown // Force: Add when true, remove when false
  );
  settingsButton.classList.toggle("rotate", isSettingsButton);
}

// Timer function
let timer = 60;
let timerId;
const screenText = document.querySelector("#screenText");

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  // Declare winner when time runs out
  else if (timer === 0) {
    determineWinner({ player1: player, player2: enemy, timerId });
  }
}

// Function to handle time control selection
const timeControlSelect = document.querySelector("#timeControl");

function handleTimeControlChange() {
  const selectedTimer = parseInt(timeControlSelect.value);
  // Update the timer with the selected time
  timer = selectedTimer;
  document.querySelector("#timer").innerHTML = timer;

  // Restart the game if it's already started
  if (!gamePaused) {
    restartGame();
  }
}

// Add event listener to the time control select element
timeControlSelect.addEventListener("change", handleTimeControlChange);

// Function to determine winner
let gameOver = false;

function determineWinner({ player1, player2, timerId }) {
  // Check winner
  if (player1.health > player2.health) {
    screenText.innerHTML = "Player 1 Wins";
  } else if (player1.health < player2.health) {
    screenText.innerHTML = "Player 2 Wins";
  } else {
    screenText.innerHTML = "Tie";
  }

  // Display result
  screenText.style.display = "grid";

  // Stop timer
  clearTimeout(timerId);

  // Set game over to true
  gameOver = true;
}
