import { Game } from '../Games/BallGame/BallGame/scenes/game.js';
import { Congratulations } from '../Games/BallGame/BallGame/scenes/congratulations.js';
import { Gameover } from '../Games/BallGame/BallGame/scenes/gameover.js';
// import { start } from '../../../script.js';
import Phaser from "phaser";


 function Ballgame() {

    const config = {
      type: Phaser.canvas,
      width: 800,
      height: 500,
      canvas: document.getElementById('canvas'),
      scene: [Game, Gameover, Congratulations],
      physics: {
        default: 'arcade',
        arcade: {
          // gravity: { y: 400 },
          debug: false
        }
      },  
    }

    var game = new Phaser.Game(config);

// start();  

// 
}
var test = "Test d'exportació multiple";
var test2 = "aixo no s'ha de veure!";
export { Ballgame, test };



