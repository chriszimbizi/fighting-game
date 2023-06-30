let gameStarted = false;
let gamePaused = false;

// Start + Pause Game
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (!gameStarted) {
      startGame();
    } else if (gameOver) {
      restartGame();
    }
  } else if (event.key === "Escape") {
    togglePause();
  }
});

// Keys object
const keys = {
  w: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },

  a: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },

  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
};

// Event listeners for movement
window.addEventListener("keydown", (event) => {
  // Player
  if (!gameOver && !gamePaused && gameStarted) {
    if (!player.isDead) {
      switch (event.key) {
        case "w":
          player.velocity.y = -15;
          player.lastKeyPressed = "w";
          break;
        case "a":
          keys.a.pressed = true;
          player.lastKeyPressed = "a";
          break;
        case "d":
          keys.d.pressed = true;
          player.lastKeyPressed = "d";
          break;
        case " ":
          player.attack();
          break;
      }
    }

    // Enemy
    if (!enemy.isDead) {
      switch (event.key) {
        case "ArrowUp":
          enemy.velocity.y = -15;
          enemy.lastKeyPressed = "ArrowUp";
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          enemy.lastKeyPressed = "ArrowLeft";
          break;
        case "ArrowRight":
          keys.ArrowRight.pressed = true;
          enemy.lastKeyPressed = "ArrowRight";
          break;
        case "ArrowDown":
          enemy.attack();
          break;
      }
    }
  }
});

window.addEventListener("keyup", (event) => {
  // Player
  switch (event.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }

  //   Enemy
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
  }
});
