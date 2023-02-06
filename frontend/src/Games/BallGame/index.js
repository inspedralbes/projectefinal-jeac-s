import { Game } from './scenes/game.js';
import { Congratulations } from './scenes/congratulations.js';
import { Gameover } from './scenes/gameover.js';
// import { start } from '../../../script.js';
import Phaser from "phaser";


export function Ballgame() {

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
document.getElementById('canvas').getContext("2d", {
  willReadFrequently: true,
});

// start();  

// 
}
