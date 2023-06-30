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
