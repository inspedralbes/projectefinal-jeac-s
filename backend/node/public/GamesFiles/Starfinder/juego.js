// let configGame = {
//   multiplayer: true,
//   max_players: 4,
// }

let teams = [];
let playersArray = [];
let otherPlayers = [];
let jugadores;
let yourId = 0;
let team = 'blue';
let ownerDelLobby;
let self = null;
var scores = {
  blue: 0,
  red: 0
};
let canvasWidth = 800;
let canvasHeight = 600;


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
  this.load.image('blue_ship_1', '../GamesFiles/Starfinder/images/spaceShips_blue.png');
  this.load.image('red_ship_1', '../GamesFiles/Starfinder/images/spaceShips_red.png');
  this.load.image('blue_ship_2', '../GamesFiles/Starfinder/images/enemy_blue.png');
  this.load.image('red_ship_2', '../GamesFiles/Starfinder/images/enemy_red.png');

  this.load.image('star', '../GamesFiles/Starfinder/images/star_gold.png');
  this.load.image('background', '../GamesFiles/Starfinder/images/spaceBackground.png');


}

function create() {
  self = this;

  otherPlayers = this.physics.add.group();


  //this.otherPlayers = this.physics.add.group();

  addPlayers(this);
  this.cursors = this.input.keyboard.createCursorKeys();

  this.blueScoreText = this.add.text(16, 16, 'Blue: ' + scores.blue, { fontSize: '32px', fill: '#0000FF' });
  this.redScoreText = this.add.text(584, 16, 'Red: ' + scores.red, { fontSize: '32px', fill: '#FF0000' });

  //     if (self.star) self.star.destroy();
  //     self.star = self.physics.add.image(star.x, star.y, 'star');
  //     self.physics.add.overlap(self.ship, self.star, function () {
  //     }, null, self);


  if (ownerDelLobby) {
    newStar(self);
  }
  else {
    console.log("ownerdellobby", ownerDelLobby);
  }
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
      //this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, rotation: this.ship.rotation });
      sendInfoGame({ action: "shipMovement", id: yourId, posX: this.ship.x, posY: this.ship.y, rotation: this.ship.rotation })
    }
    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };
  }

}

function recibirInfoFromPlatform(data) {
  //console.log("data", data);
  if (data.infoGame.action == "shipMovement") {
    //console.log("Ship hace la movicion");
    playerMoved(data);
  }

  else if (data.infoGame.action == 'starLocation' && !ownerDelLobby) {

    //console.log("Location star", data);
    if (self.star) {
      self.star.destroy();
    }
    self.star = self.physics.add.image(data.infoGame.posX, data.infoGame.posY, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
      //this.socket.emit('starCollected');
      self.star.destroy();
      sendInfoGame({ action: "starCollectedByUser" });
      playersArray.forEach((player) => {
        console.log("PlayerPlayerPlayer", player);
        if (player.id == yourId) {
          console.log("PlayerTeam", player);
          sendInfoGame({ action: "update_score", team: player.team })
        }
      });
      //sendInfoGame({ action: "update_score", team: self.ship })

    }, null, self);
  }

  else if (data.infoGame.action == 'starCollectedByUser' && ownerDelLobby) {
    if (self.star) {
      self.star.destroy();
    }
    newStar(self);
  }
  else if (data.infoGame.action == 'update_score') {
    //console.log("AAAAAAAA", data);
    if (data.infoGame.team === 'red') {
      scores.red += 10;
    } else {
      scores.blue += 10;
    }
    self.blueScoreText.setText('Blue: ' + scores.blue);
    self.redScoreText.setText('Red: ' + scores.red);

    if (scores.blue == 20) {
      playersArray.forEach(player => {
        if (player.id == yourId) {
          if (player.team == 'blue') {
            finalJuego(25);
          }
          else {
            finalJuego(10);
          }
        }
      });
    }

    if (scores.red == 20) {
      playersArray.forEach(player => {
        if (player.id == yourId) {
          if (player.team == 'red') {

            finalJuego(25);
          }
          else {

            finalJuego(10);
          }
        }
      });
    }

  }
}

function newStar(self) {
  var star = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
  };

  if (self.star) self.star.destroy();
  self.star = self.physics.add.image(star.x, star.y, 'star');
  sendInfoGame({ action: "starLocation", star_object: self.star, posX: star.x, posY: star.y })

  self.physics.add.overlap(self.ship, self.star, function () {

    self.star.destroy();
    playersArray.forEach((player) => {
      console.log("PlayerPlayerPlayer", player);
      if (player.id == yourId) {
        console.log("PlayerTeam", player);
        sendInfoGame({ action: "update_score", team: player.team })
      }
    });

    newStar(self);
  }, null, self);
}

function recibirInfoLobby(lobby) {
  //console.log("lobby", lobby);
  //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", lobby);
  let distanceFromCorner = 50;
  console.log("Config", game.width);
  teams = [
    {
      color: "blue",
      sprite: "blue_ship_1",
      x: 100 + distanceFromCorner,
      y: 100 + distanceFromCorner,
    },
    {
      color: "red",
      sprite: "red_ship_1",
      x: canvasWidth - 100 - distanceFromCorner,
      y: 100 + distanceFromCorner

    },
    {
      color: "blue",
      sprite: "blue_ship_2",
      x: canvasWidth - 100 - distanceFromCorner,
      y: canvasHeight - 100 - distanceFromCorner
    },
    {
      color: "red",
      sprite: "red_ship_2",
      x: 100 + distanceFromCorner,
      y: canvasHeight - 100 - distanceFromCorner
    },
  ]


  let aux = 0;
  lobby.members.forEach((member) => {
    user = member.username;
    //console.log("MEENEBEEH", member);
    if (lobby.ownerId == lobby.yourId) {
      ownerDelLobby = true;
    } else {
      ownerDelLobby = false;
    }
    let newX = Math.floor(Math.random() * 700) + 50;
    let newY = Math.floor(Math.random() * 700) + 50;
    console.log("newX", newX, "newY", newY);

    let player = {
      id: member.idUser,
      nombre: member.username,
      posX: teams[aux].x,
      posY: teams[aux].y,
      self: false,
      team: teams[aux].color,
      sprite: teams[aux].sprite
    }

    if (lobby.yourId == member.idUser) {
      player.self = true;
      yourId = lobby.yourId;
    }

    playersArray.push(player);

    aux++;
  });
}

function addPlayers(self) {


  if (jugadores == null) {
    jugadores = self.add.group();
  }

  playersArray.forEach((player) => {
    console.log("Player", player);
    //Crea una imagen para el jugador y agrégalo al grupo de jugadores
    // let jugadorImagen = self.physics.add.image(100, 150, 'red_ship_1').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
    // let jugadorImagen2 = self.physics.add.image(500, 150, 'blue_ship_2').setOrigin(0.5, 0.5).setDisplaySize(53, 40);


    if (player.self == true) {
      //console.log("PlayerAAAAAAAA", player);

      self.ship = self.physics.add.image(player.posX, player.posY, player.sprite).setOrigin(0.5, 0.5).setDisplaySize(53, 40);
      self.ship.setDrag(100);
      self.ship.setAngularDrag(100);
      self.ship.setMaxVelocity(200);
    }
    else {
      //sconsole.log("Player", player);
      let other = self.physics.add.image(player.posX, player.posY, player.sprite).setOrigin(0.5, 0.5).setDisplaySize(53, 40);

      other.playerId = player.id;
      otherPlayers.add(other);

    }
    //jugadores.add(jugadorImagen);
    //console.log("jugadores", jugadoress);

  })
}

function playerMoved(data) {
  otherPlayers.getChildren().forEach(function (otherPlayer) {
    if (data.infoGame.id === otherPlayer.playerId) {
      otherPlayer.setRotation(data.infoGame.rotation);
      otherPlayer.setPosition(data.infoGame.posX, data.infoGame.posY);
    }
  });
}


function executeGame() {
  var obj = [];

  obj.init = init;
  //obj.config_game = configGame;
  obj.recibirInfoFromPlatform = recibirInfoFromPlatform;
  obj.recibirInfoLobby = recibirInfoLobby;
  return obj;
}

executeGame();