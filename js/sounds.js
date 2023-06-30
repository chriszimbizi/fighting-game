function createAudio(path, volume = 1) {
  const audio = new Audio(path);
  audio.preload = "auto";
  audio.load();
  audio.currentTime = 0;
  audio.volume = volume;
  return audio;
}

// Create the sound effects
const swordSlashSound = createAudio("assets/sounds/fast-sword-whoosh.wav");
const takeHitSound = createAudio("assets/sounds/take-hit.wav", 0.25);
const deathSound = createAudio("assets/sounds/death.mp3", 0.1);
const gameOverSound = createAudio("assets/sounds/game-over.mp3");

// Play a sound effect
function playSoundEffect(sound) {
  sound.play();
}
