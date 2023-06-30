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
