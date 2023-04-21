// import { RestartButton } from "../components/restart-button.js";
// import Phaser from "phaser";

var RestartButton = null;
import('../components/restart-button.js')
  .then((module) => {
    // use the imported module here
    RestartButton = module;
    console.log(RestartButton.RestartButton);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
    this.restartButton = new RestartButton.RestartButton(this.scene);
  }

  preload() {
    this.load.image('gameover', './images/gameover.png');
    // this.restartButton.preload();
  }

  create() {
    this.add.image(410, 250, 'background');
    // this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}