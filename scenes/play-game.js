import Phaser from 'phaser';
import gameOptions from '../game-settings/game-options';

export default class playGame extends Phaser.Scene {
  constructor() {
    super('PlayGame');
  }
  create() {
    playGame.webSockets = new WebSocket('wss://echo.websocket.org/');
    // playGame.webSockets.onopen = (evt) => playGame.sayHello(evt);
    playGame.boardArray = [];
    for (let i = 0; i < gameOptions.boardSize.rows; i++) {
      playGame.boardArray[i] = [];
      for (let j = 0; j < gameOptions.boardSize.cols; j++) {
        const position = playGame.getTitlePosition(i, j);
        const image = this.add.image(position.x, position.y, 'emptytyle')
            .setInteractive();


        image.on('pointerdown', () => playGame.addNewSprite(i, j));


        const tile = this.add.sprite(position.x, position.y, 'tiles', 0)
            .setInteractive();

        tile.visible = false;

        // tile.on('pointerdown', () => playGame.test(i, j));

        playGame.boardArray[i][j] = {
          tileValue: 0,
          tileSprite: tile,
        };
      }
    }
  }
  // static sayHello(evt) {
  //   console.info(evt);
  // }
  static getTitlePosition(row, col) {
    const posX = gameOptions.titleSpacing * (col + 1) + gameOptions.titleSize *
            (col + 0.5);
    const posY = gameOptions.titleSpacing * (row + 1) + gameOptions.titleSize *
            (row + 0.5);

    return new Phaser.Geom.Point(posX, posY);
  }
  static addNewSprite(i, j) {
    playGame.boardArray[i][j].tileValue = 1;
    playGame.boardArray[i][j].tileSprite.visible = true;
    playGame.boardArray[i][j].tileSprite.setFrame(0);
    const board = {};
    for (let i = 0; i < gameOptions.boardSize.rows; i++) {
      for (let j = 0; j < gameOptions.boardSize.cols; j++) {
        const tmpKey = 'a' + (i+j);
        board[tmpKey] = playGame.boardArray[i][j].tileValue;
      }
    }
    // playGame.webSockets.send(JSON.stringify(playGame.boardArray));
    playGame.webSockets.send(JSON.stringify(board));
  }
}
