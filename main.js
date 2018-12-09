import 'phaser';
import './style.css'
import emptytile from  './assets/emptytile.png';
import tiles from './assets/tiles.png';

class playGame extends Phaser.Scene{
  constructor(){
    super("PlayGame");
  }
  create(){
    this.boardArray = [];
    for(let i = 0; i < gameOptions.boardSize.rows; i++){
        this.boardArray[i] = [];
        for(let j = 0; j < gameOptions.boardSize.cols; j++){
          let titlePosition = this.getTitlePosition(i, j);

          console.info('test');
          const image = this.add.image(titlePosition.x, titlePosition.y, "emptytyle")
            .setInteractive();

          image.on('pointerdown', () => {
            this.addNewSpirite(i, j);
          });

          let tile = this
            .add.sprite(titlePosition.x, titlePosition.y, "tiles", 0).setInteractive();

          tile.visible = false;

          tile.on('pointerdown', () => {
            this.test(i,j)
          });

          this.boardArray[i][j] = {
            tileValue: 0,
            tileSprite: tile,

          }
        }
    }
  }
  test(i, j){
    console.info(i,j)
  }
  listener (pointer, gameObject, j) {
    console.info(pointer, gameObject, j);
  }
  getTitlePosition(row, col){
    let posX = gameOptions.titleSpacing * (col + 1) + gameOptions.titleSize *
      (col + 0.5);
    let posY = gameOptions.titleSpacing * (row + 1) + gameOptions.titleSize *
      (row + 0.5);

    return new Phaser.Geom.Point(posX, posY);
  }
  addNewSpirite(i, j){
    this.boardArray[i][j].tileValue = 1;
    this.boardArray[i][j].tileSprite.visible = true;
    this.boardArray[i][j].tileSprite.setFrame(0);
  }
  addTile(){
    this.boardArray[1][1].tileValue = 1;
    this.boardArray[1][1].tileSprite.visible = true;
    this.boardArray[1][1].tileSprite.setFrame(0);
  }
}

class bootGame extends Phaser.Scene{
  constructor(){
    super("bootGame");
  }
  preload() {
    this.load.image("emptytyle", emptytile);
    this.load.spritesheet("tiles", tiles, {
      frameWidth: gameOptions.titleSize,
      frameHeight: gameOptions.titleSize
    })
  }
  create(){
    console.info("game is booting...");
    this.scene.start("PlayGame");
  }
}

const gameOptions = {
  titleSize: 200,
  titleSpacing: 20,
  boardSize: {
    rows: 4,
    cols: 4
  }
};

const gameConfig = {
  width: gameOptions.boardSize.cols * (gameOptions.titleSize +
    gameOptions.titleSpacing) + gameOptions.titleSpacing,
  height: gameOptions.boardSize.rows * (gameOptions.titleSize +
    gameOptions.titleSpacing) + gameOptions.titleSpacing,
  backgroundColor: 0xecf0f1,
  scene: [bootGame, playGame]
};

let game;

window.onload = function () {
    game = new Phaser.Game(gameConfig)
    const gameWidth = game.config.width;
    const gameHeight = game.config.height;
    window.focus();

    resizeGame();
    window.addEventListener("resize", resizeGame);
}

const resizeGame = () => {
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    console.info('if')
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio ) + "px";
  } else {
    console.info('else')
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}
