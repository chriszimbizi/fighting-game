// Setup
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const canvasWidth = (canvas.width = 1024);
const canvasHeight = (canvas.height = 576);

context.fillRect(0, 0, canvasWidth, canvasHeight);

const gravity = 0.7;

// Background sprite
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "assets/backgrounds/background.png",
});

// Shop Sprite
const shop = new Sprite({
  position: {
    x: 625,
    y: 128,
  },
  imageSrc: "assets/backgrounds/shop.png",
  framesMax: 6,
  scale: 2.75,
});

// Player sprite
const player = new Fighter({
  position: {
    x: canvasWidth - 5 * (canvasWidth / 6),
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  imageSrc: "assets/characters/samuraiMack/idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "assets/characters/samuraiMack/idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "assets/characters/samuraiMack/run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "assets/characters/samuraiMack/jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "assets/characters/samuraiMack/fall.png",
      framesMax: 2,
    },
    attack: {
      imageSrc: "assets/characters/samuraiMack/attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "assets/characters/samuraiMack/take-hit.png",
      framesMax: 4,
    },
    takeHitStun: {
      imageSrc: "assets/characters/samuraiMack/take-hit-stun.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "assets/characters/samuraiMack/death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 140,
    height: 50,
  },
});

// Enemy sprite
const enemy = new Fighter({
  position: {
    x: canvasWidth - canvasWidth / 4,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },

  imageSrc: "assets/characters/kenji/idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 173,
  },
  sprites: {
    idle: {
      imageSrc: "assets/characters/kenji/idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "assets/characters/kenji/run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "assets/characters/kenji/jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "assets/characters/kenji/fall.png",
      framesMax: 2,
    },
    attack: {
      imageSrc: "assets/characters/kenji/attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "assets/characters/kenji/take-hit.png",
      framesMax: 3,
    },
    takeHitStun: {
      imageSrc: "assets/characters/kenji/take-hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "assets/characters/kenji/death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -150,
      y: 50,
    },
    width: 140,
    height: 50,
  },
});

// Animation loop
function animate() {
  // Variable to store the animation frame ID
  animationFrameId = window.requestAnimationFrame(animate);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw sprites
  background.update();
  shop.update();
  // Overlay to increase contrast between characters and background
  context.fillStyle = "rgba(255, 255, 255, 0.1)";
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  //  Player movement
  if (keys.a.pressed && player.lastKeyPressed === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKeyPressed === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  // Jumping & Falling
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKeyPressed === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKeyPressed === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  // Jumping & Falling
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // Player attacks enemy
  if (
    collisionDetection({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;
    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
      ease: Power4.easeInOut,
    });
  }

  // Player misses attack
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // Enemy attacks player
  if (
    collisionDetection({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 1
  ) {
    player.takeHit();
    enemy.isAttacking = false;
    gsap.to("#playerHealth", {
      width: player.health + "%",
      ease: Power4.easeInOut,
    });
  }

  // Enemy misses attack
  if (enemy.isAttacking && enemy.framesCurrent === 4) {
    enemy.isAttacking = false;
  }

  // End game based on health
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player1: player, player2: enemy, timerId });
  }
}

// Function to start game
function startGame() {
  animate();
  decreaseTimer();
  gameStarted = true;
  document.querySelector(".health-timer-container").style.display = "flex";
  screenText.style.display = "none";
}

// Function to restart game
function restartGame() {
  cancelAnimationFrame(animationFrameId);
  gameOver = false;
  gamePaused = false;

  // Reset Timer
  clearTimeout(timerId);
  const selectedTimer = parseInt(timeControlSelect.value);
  timer = !isNaN(selectedTimer) ? selectedTimer : 60;

  // Reset Health
  player.health = 100;
  player.isDead = false;
  enemy.health = 100;
  enemy.isDead = false;

  gsap.to("#playerHealth", {
    width: player.health + "%",
  });
  gsap.to("#enemyHealth", {
    width: enemy.health + "%",
  });

  // Reset Player Positions
  player.position.x = canvasWidth - 5 * (canvasWidth / 6);
  enemy.position.x = canvasWidth - canvasWidth / 4;

  startGame();
}

// Function to toggle pause
function togglePause() {
  if (gamePaused) {
    resumeGame();
    gamePaused = false;
    screenText.style.display = "none";
  } else {
    pauseGame();
    gamePaused = true;
    screenText.innerHTML = "Game Paused";
    screenText.style.display = "grid";
  }
}

// Function to resume the game
function resumeGame() {
  gamePaused = false;
  // Resume Timer
  decreaseTimer();
  animate();
}

// Function to pause the game
function pauseGame() {
  gamePaused = true;
  // Stop Timer
  clearTimeout(timerId);
  cancelAnimationFrame(animationFrameId);
}
