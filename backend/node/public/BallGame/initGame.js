// import { Game } from './scenes/game.js';
// import { Congratulations } from './scenes/congratulations.js';
// import { Gameover } from './scenes/gameover.js';
// import { start } from '../../../script.js';
//import Phaser from "phaser";

var Game = null;
import('../../../BallGame/scenes/game.js')
  .then((module) => {
    // use the imported module here
    Game= module;
    console.log(Game);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

  var Congratulations = null;
import('../../../BallGame/scenes/congratulations.js')
  .then((module) => {
    // use the imported module here
    Congratulations= module;
    console.log(Congratulations);
  })
  .catch((error) => {
    // handle any errors that occur while loading the module
  });
  var Gameover = null;
import('../../../BallGame/scenes/gameover.js')
  .then((module) => {
    // use the imported module here
    Gameover= module;
    console.log(Gameover);
  })
  .catch((error) => {
    // handle any errors that occur while loading the module
  });

 function Ballgame() {

  if (Game != null & Gameover != null & Congratulations != null) {
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
    
    console.log("No null");

    
    var game = new Phaser.Game(config);
    
    
  }
  
  else  {
    console.log("Algo null");
  }
  
  
  // start();  
  
  // 
}
var test = "Test d'exportació multiple";
var test2 = "aixo no s'ha de veure!";
//export { Ballgame, test };


Ballgame();



