import "./styles.css";
let game;
const gameOptions = {
  heroGravity: 600,
  heroSpeed: 250
};

const st_button = document.getElementById("btn-start");

st_button.addEventListener("click", loadGame);
function loadGame() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#E2725B",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1500,
      height: 1000
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0
        }
      }
    },
    scene: PlayGame
  };

  game = new Phaser.Game(gameConfig);
  window.focus();
}

class PlayGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.score = 0;
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("flower", "assets/pink-flower.png");
    this.load.spritesheet("hero", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
  }

  create() {
    //this codepart is also mostly from the demo10-phaser code example.

    this.groundGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    });

    for (let i = 0; i < 30; i++) {
      this.groundGroup.create(
        Phaser.Math.Between(0, game.config.width),
        Phaser.Math.Between(0, game.config.height),
        "ground"
      );
    }
    this.hero = this.physics.add.sprite(
      game.config.width / 3,
      game.config.height / 3,
      "hero"
    );
    this.hero.body.gravity.y = gameOptions.heroGravity;
    this.physics.add.collider(this.hero, this.groundGroup);

    this.flowersGroup = this.physics.add.group({});
    this.physics.add.collider(this.hero, this.groundGroup);

    this.physics.add.overlap(
      this.hero,
      this.flowersGroup,
      this.collectFlower,
      null,
      this
    );

    this.add.image(16, 16, "pink-flower");
    this.scoreText = this.add.text(32, 3, "0", {
      fontSize: "30px",
      fill: "#ffffff"
    });

    this.cursors = this.input.keyboard.createCursorKeys();
  }
}
