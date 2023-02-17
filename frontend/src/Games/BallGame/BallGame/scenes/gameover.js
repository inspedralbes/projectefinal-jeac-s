import { RestartButton } from "../components/restart-button.js";
import Phaser from "phaser";



export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('gameover', 'Games/BallGame/images/gameover.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'background');
    this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}