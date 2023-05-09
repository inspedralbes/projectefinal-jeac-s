let configGame = {
  multiplayer: true,
  max_players: 4,
}

function init(_sendInfoGame, _finalJuego) {

    //traspasamos la funciones recibidas a variables globales
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

  
    var config = {
        type: Phaser.canvas,
        width: 800,
        height: 600,
        canvas: document.getElementById('canvas'),
        physics: {
            default: 'arcade',
            arcade: {
                debug: false,
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);
    return game;
}


function preload() {
    this.load.image('ship', '../GamesFiles/Starfinder/images/spaceShips_001.png');
    this.load.image('otherPlayer', '../GamesFiles/Starfinder/images/enemyBlack5.png');
    this.load.image('star', '../GamesFiles/Starfinder/images/star_gold.png');
}

function create() {
    var self = this;

    var star = {
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50
    };

    this.otherPlayers = this.physics.add.group();

    addPlayer(self, 1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.blueScoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#0000FF' });
    this.redScoreText = this.add.text(584, 16, '', { fontSize: '32px', fill: '#FF0000' });

    if (self.star) self.star.destroy();
    self.star = self.physics.add.image(star.x, star.y, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
    }, null, self);
}

function update() {
    if (this.ship) {
      if (this.cursors.left.isDown) {
        this.ship.setAngularVelocity(-150);
      } else if (this.cursors.right.isDown) {
        this.ship.setAngularVelocity(150);
      } else {
        this.ship.setAngularVelocity(0);
      }
  
      if (this.cursors.up.isDown) {
        this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
      } else {
        this.ship.setAcceleration(0);
      }
  
      this.physics.world.wrap(this.ship, 5);
  
      // emit player movement
      var x = this.ship.x;
      var y = this.ship.y;
      var r = this.ship.rotation;
      if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
        // this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
      }
      // save old position data
      this.ship.oldPosition = {
        x: this.ship.x,
        y: this.ship.y,
        rotation: this.ship.rotation
      };
    }
  }

  function addPlayer(self, playerInfo) {
    self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    if (playerInfo.team === 'blue') {
      self.ship.setTint(0x0000ff);
    } else {
      self.ship.setTint(0xff0000);
    }
    self.ship.setDrag(100);
    self.ship.setAngularDrag(100);
    self.ship.setMaxVelocity(200);
  }
  
//   function addOtherPlayers(self, playerInfo) {
//     const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
//     if (playerInfo.team === 'blue') {
//       otherPlayer.setTint(0x0000ff);
//     } else {
//       otherPlayer.setTint(0xff0000);
//     }
//     otherPlayer.playerId = playerInfo.playerId;
//     self.otherPlayers.add(otherPlayer);
//   }

function recibirInfo(puntos) {
    var texto = '';
    puntos.forEach(function(p) {
      texto += p.member + ': ' + p.score + '\n';
      console.log("PPPPPPPPPPPPPPPPPPPPPPPP", p);
    });
    textoContador.setText(texto);
    console.log(puntos);
  }

  function getUsers(list) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", list);
  }

function executeGame() {
    var obj = [];

    obj.init = init;
    obj.config_game = configGame;
    obj.recibir = recibirInfo;
    obj.players = getUsers;
    return obj;
}

executeGame();