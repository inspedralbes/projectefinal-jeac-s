var test = "Test d'exportació multiple";
var test2 = "aixo no s'ha de veure!";

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
    
      })
      .catch((error) => {
        console.log('Error importing modules:', error);
      });
  }

  Ballgame();