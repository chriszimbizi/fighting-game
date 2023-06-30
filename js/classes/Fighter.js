class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.velocity = velocity;

    this.height = 150;
    this.width = 50;

    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 6;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }

    this.lastKeyPressed;

    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };

    this.isAttacking;
    this.health = 100;
    this.isDead = false;
  }

  update() {
    // Draw Fighter
    this.draw();

    // Animate Fighter
    if (!this.isDead) {
      this.animateFrames();
    }

    // Attack boxes
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // Draw attack boxes
    // context.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x = 0;

    // Gravity
    if (this.position.y + this.height + this.velocity.y > canvasHeight - 96) {
      this.velocity.y = 0;
      this.position.y = 331;
    } else {
      this.velocity.y += gravity;
    }
  }

  attack() {
    this.isAttacking = true;
    this.switchSprite("attack");
    playSoundEffect(swordSlashSound);
  }

  death() {
    this.switchSprite("death");
    playSoundEffect(deathSound);
  }

  takeHit() {
    this.health -= 10;
    playSoundEffect(takeHitSound);

    const randomChance = Math.random();

    if (this.health === 0) {
      this.death();
    } else if ((this.health < 90 && randomChance < 0.1) || this.health === 10) {
      this.switchSprite("takeHitStun");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    // Override all other animations when fighter is dead
    if (this.image === this.sprites.death.image) {
      // Wait for death animation to finish before ceasing fighter animations
      if (this.framesCurrent === this.sprites.death.framesMax - 1) {
        this.isDead = true;
      }
      return;
    }
    // Override all other animations when fighter attacks
    if (
      this.image === this.sprites.attack.image &&
      this.framesCurrent < this.sprites.attack.framesMax - 1
    ) {
      return;
    }

    // Override all other animations when fighter gets hit
    if (
      (this.image === this.sprites.takeHit.image &&
        this.framesCurrent < this.sprites.takeHit.framesMax - 1) ||
      (this.image === this.sprites.takeHitStun.image &&
        this.framesCurrent < this.sprites.takeHitStun.framesMax - 1)
    ) {
      return;
    }

    switch (sprite) {
      case "idle":
        if (this.image !== this.sprites.idle.image) {
          this.image = this.sprites.idle.image;
          this.framesMax = this.sprites.idle.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "run":
        if (this.image !== this.sprites.run.image) {
          this.image = this.sprites.run.image;
          this.framesMax = this.sprites.run.framesMax;
          this.framesCurrent = 0;
        }
        break;

      case "jump":
        if (this.image !== this.sprites.jump.image) {
          this.image = this.sprites.jump.image;
          this.framesMax = this.sprites.jump.framesMax;
          this.framesCurrent = 0;
          break;
        }

      case "fall":
        if (this.image !== this.sprites.fall.image) {
          this.image = this.sprites.fall.image;
          this.framesMax = this.sprites.fall.framesMax;
          this.framesCurrent = 0;
          break;
        }

      case "attack":
        if (this.image !== this.sprites.attack.image) {
          this.image = this.sprites.attack.image;
          this.framesMax = this.sprites.attack.framesMax;
          this.framesCurrent = 0;
          break;
        }

      case "takeHit":
        if (this.image !== this.sprites.takeHit.image) {
          this.image = this.sprites.takeHit.image;
          this.framesMax = this.sprites.takeHit.framesMax;
          this.framesCurrent = 0;
          break;
        }

      case "takeHitStun":
        if (this.image !== this.sprites.takeHitStun.image) {
          this.image = this.sprites.takeHitStun.image;
          this.framesMax = this.sprites.takeHitStun.framesMax;
          this.framesCurrent = 0;
          break;
        }

      case "death":
        if (this.image !== this.sprites.death.image) {
          this.image = this.sprites.death.image;
          this.framesMax = this.sprites.death.framesMax;
          this.framesCurrent = 0;
          break;
        }
    }
  }
}
