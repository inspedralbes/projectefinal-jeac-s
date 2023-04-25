// import { Game } from './scenes/game.js';
// import { Congratulations } from './scenes/congratulations.js';
// import { Gameover } from './scenes/gameover.js';
// import { start } from '../../../script.js';
//import Phaser from "phaser";

// var Game = null;
// var instance = null;
// import('../../../BallGame/scenes/game.js')
//   .then((module) => {
//     // use the imported module here
//     Game= module;
//     // instance = new Game();
//     console.log(Game);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

//   var Congratulations = null;
// import('../../../BallGame/scenes/congratulations.js')
//   .then((module) => {
//     // use the imported module here
//     Congratulations= module;
//     console.log(Congratulations);
//   })
//   .catch((error) => {
//     // handle any errors that occur while loading the module
//   });
//   var Gameover = null;
// import('../../../BallGame/scenes/gameover.js')
//   .then((module) => {
//     // use the imported module here
//     Gameover= module;
//     console.log(Gameover);
//   })
//   .catch((error) => {
//     // handle any errors that occur while loading the module
//   });

//  function Ballgame() {

//   if (Game != null & Gameover != null & Congratulations != null) {
//     const config = {
//       type: Phaser.canvas,
//       width: 800,
//       height: 500,
//       canvas: document.getElementById('canvas'),
//       scene: [Game, Gameover, Congratulations],
//       physics: {
//         default: 'arcade',
//         arcade: {
//           // gravity: { y: 400 },
//           debug: false
//         }
//       },  
//     }
    
//     console.log("No null");

    
//     var game = new Phaser.Game(config);
    
    
//   }
  
//   else  {
//     console.log("Algo null");
//   }
  
  
  // start();  
  
  // 
// }
var test = "Test d'exportació multiple";
var test2 = "aixo no s'ha de veure!";
//export { Ballgame, test };



//Ballgame();


  // const config = {
  //   type: Phaser.canvas,
  //   width: 800,
  //   height: 500,
  //   canvas: document.getElementById('canvas'),
  //   scene: [instance, Gameover, Congratulations],
  //   physics: {
  //     default: 'arcade',
  //     arcade: {
  //       // gravity: { y: 400 },
  //       debug: false
  //     }
  //   },  
  // }
  
  // console.log("No null");

  
  // var game = new Phaser.Game(config);


 async function Ballgame() {
    Promise.all([
      import('../../../GamesFiles/BallGame/scenes/game.js'),
      import('../../../GamesFiles/BallGame/scenes/congratulations.js'),
      import('../../../GamesFiles/BallGame/scenes/gameover.js'),
    ])
      .then(([gameModule, congratulationsModule, gameoverModule]) => {
        // Save the imported modules to variables
        const Game = gameModule;
        const Congratulations = congratulationsModule;
        const Gameover = gameoverModule;
        console.log("Gameover", Game);
        let a = Game.imports();
        console.log("a", Game.imports);
        setTimeout(StartGame, 3000);
        
       function StartGame() {
        console.log("Start Game");
        const config = {
          type: Phaser.canvas,
          width: 800,
          height: 500,
          canvas: document.getElementById('canvas'),
          scene: [Game.Game, Congratulations.Congratulations, Gameover.Gameover],
          physics: {
            default: 'arcade',
            arcade: {
              // gravity: { y: 400 },
              debug: false
            }
          },
        };
        
        // Create the game instance
        var game = new Phaser.Game(config);
        }
        //Create the game configuration object
        

        function preload() {
          this.load.image('bullet', 'assets/tests/timer/bullet-bill.png');
          this.load.image('cannon', 'assets/tests/timer/cannon.png');
          this.load.image('ground', 'assets/tests/timer/ground.png');
      }
    
      function create() {
          //   Bullet 1 (600px in 6 seconds)
    
          this.add.image(0, 200, 'ground').setOrigin(0);
    
          bullet1 = this.add.image(64, 76, 'bullet').setOrigin(0);
    
          speed1 = Phaser.Math.GetSpeed(600, 6);
    
          this.add.image(64, 72, 'cannon').setOrigin(0);
    
          this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });
    
          //   Bullet 2 (600px in 3 seconds)
    
          this.add.image(0, 500, 'ground').setOrigin(0);
    
          bullet2 = this.add.image(64, 376, 'bullet').setOrigin(0);
    
          speed2 = Phaser.Math.GetSpeed(600, 3);
    
          this.add.image(64, 500, 'cannon').setOrigin(0, 1);
    
          this.add.text(64, 350, '600px / 3 secs', { fill: '#000' });
      }
    
      //  The update function is passed 2 values:
      //  The current time (in ms)
      //  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied
    
      function update(time, delta) {
          bullet1.x += speed1 * delta;
    
          if (bullet1.x > 864) {
              bullet1.x = 64;
          }
    
          bullet2.x += speed2 * delta;
    
          if (bullet2.x > 864) {
              bullet2.x = 64;
          }
      }
      })
      .catch((error) => {
        console.log('Error importing modules:', error);
      });
  }
  


  
  
  function aaa() {

  //   const config = {
  //     type: Phaser.canvas,
  //     width: 800,
  //     height: 500,
  //     canvas: document.getElementById('canvas'),
  //     scene: {
  //       preload: preload,
  //       create: create
  //     },
  //     physics: {
  //       default: 'arcade',
  //       arcade: {
  //         // gravity: { y: 400 },
  //         debug: false
  //       }
  //     },
  //   };
    
  //   // Create the game instance
  //   var game = new Phaser.Game(config);


    
  //   function preload() {
  //     // this.load.image('gameover', './images/gameover.png');
  //     // this.restartButton.preload();
  //   }
    
  //   function create() {
  //     // this.add.image(410, 250, 'background');
  //     // this.restartButton.create();
  //     // this.gameoverImage = this.add.image(400, 90, 'gameover');
  //   }

  //   function update() {
     
  // }






  console.log("Llega aqui");

  // var config = {
  //     type: Phaser.canvas,
  //     width: 1200,
  //     height: 800,
  //     canvas: document.getElementById('canvas'),
  //     parent: 'phaser-example',
  //     backgroundColor: 'red',
  //     useTicker: true,
  //     scene: {
  //         preload: preload,
  //         create: create,
  //         update: update
  //     }
  // };


  // var bullet2;

  // var speed1;
  // var speed2;

  // var game = new Phaser.Game(config);


  // function preload() {
  //     this.load.image('bullet', 'assets/tests/timer/bullet-bill.png');
  //     this.load.image('cannon', 'assets/tests/timer/cannon.png');
  //     this.load.image('ground', 'assets/tests/timer/ground.png');
  // }

  // function create() {
  //     //   Bullet 1 (600px in 6 seconds)

  //     this.add.image(0, 200, 'ground').setOrigin(0);

  //     bullet1 = this.add.image(64, 76, 'bullet').setOrigin(0);

  //     speed1 = Phaser.Math.GetSpeed(600, 6);

  //     this.add.image(64, 72, 'cannon').setOrigin(0);

  //     this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });

  //     //   Bullet 2 (600px in 3 seconds)

  //     this.add.image(0, 500, 'ground').setOrigin(0);

  //     bullet2 = this.add.image(64, 376, 'bullet').setOrigin(0);

  //     speed2 = Phaser.Math.GetSpeed(600, 3);

  //     this.add.image(64, 500, 'cannon').setOrigin(0, 1);

  //     this.add.text(64, 350, '600px / 3 secs', { fill: '#000' });
  // }

  // //  The update function is passed 2 values:
  // //  The current time (in ms)
  // //  And the delta time, which is derived from the elapsed time since the last frame, with some smoothing and range clamping applied

  // function update(time, delta) {
  //     bullet1.x += speed1 * delta;

  //     if (bullet1.x > 864) {
  //         bullet1.x = 64;
  //     }

  //     bullet2.x += speed2 * delta;

  //     if (bullet2.x > 864) {
  //         bullet2.x = 64;
  //     }
  // }







  }

  Ballgame();