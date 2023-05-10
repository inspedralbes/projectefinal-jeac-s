// let configGame = {
//   multiplayer: true,
//   max_players: 4,
// }


let playersArray = [];
let otherPlayers = [];
let jugadores;
let yourId = 0;
let team = 'blue';
let ownerDelLobby;
let self = null;
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
  self = this;

  otherPlayers = this.physics.add.group();

  
  //this.otherPlayers = this.physics.add.group();

  addPlayers(this);
  this.cursors = this.input.keyboard.createCursorKeys();

  this.blueScoreText = this.add.text(16, 16, 'Points', { fontSize: '32px', fill: '#0000FF' });
  this.redScoreText = this.add.text(584, 16, 'Points', { fontSize: '32px', fill: '#FF0000' });

  //     if (self.star) self.star.destroy();
  //     self.star = self.physics.add.image(star.x, star.y, 'star');
  //     self.physics.add.overlap(self.ship, self.star, function () {
  //     }, null, self);


  if(ownerDelLobby) {
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
      sendInfoGame({action: "shipMovement", id: yourId, posX: this.ship.x, posY: this.ship.y, rotation: this.ship.rotation})
    }
    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };
  }
}

// function addPlayer(self, playerInfo) {
//   self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
//   if (playerInfo.team === 'blue') {
//     self.ship.setTint(0x0000ff);
//   } else {
//     self.ship.setTint(0xff0000);
//   }
//   self.ship.setDrag(100);
//   self.ship.setAngularDrag(100);
//   self.ship.setMaxVelocity(200);
// }

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

function recibirInfoFromPlatform(data) {
  //console.log("data", data);
  if (data.infoGame.action == "shipMovement") {
    //console.log("Ship hace la movicion");
    playerMoved(data);
  }

  else if (data.infoGame.action == 'starLocation' && !ownerDelLobby) {
    
    console.log("Location star", data);
    if (self.star) {
      self.star.destroy();
    }
    self.star = self.physics.add.image(data.infoGame.posX, data.infoGame.posY, 'star');
    self.physics.add.overlap(self.ship, self.star, function () {
      //this.socket.emit('starCollected');
      self.star.destroy();
      sendInfoGame({action: "starCollectedByUser"});
    }, null, self);
  }

  else if (data.infoGame.action == 'starCollectedByUser' && ownerDelLobby){
    if (self.star) {
      self.star.destroy();
    }
    newStar(self);
  }
}

function newStar(self) {
  var star = {
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50
  };
  
  if (self.star) self.star.destroy();
  self.star = self.physics.add.image(star.x, star.y, 'star');
  sendInfoGame({action: "starLocation", star_object: self.star, posX: star.x, posY: star.y})

  self.physics.add.overlap(self.ship, self.star, function () {
    //this.socket.emit('starCollected');
    self.star.destroy();
    newStar(self);
  }, null, self);
}

function recibirInfoLobby(lobby) {
  //console.log("lobby", lobby);
  //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", lobby);

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

    let player = {
      id: member.idUser,
      nombre: member.username,
      posX: newX,
      posY: newY,
      self: false,
      team: team
    }

    if (lobby.yourId == member.idUser) {
      player.self = true;
      yourId = lobby.yourId;
    }

    playersArray.push(player);
    if (team == 'blue') {
      team = 'red';
    }
    else {
      team = 'blue';
    }

  });

  //console.log("playersArray", playersArray);

}

function addPlayers(self) {

  if (jugadores == null) {
    console.log("pla");
    jugadores = self.add.group();
  }

  playersArray.forEach((player) => {
    self.load.image('jugadorImagen', '../GamesFiles/Starfinder/images/spaceShips_001.png');
    //console.log("Player", player);
    //Crea una imagen para el jugador y agrégalo al grupo de jugadores
    //let jugadorImagen = self.add.image(player.newX, player.newY, 'jugadorImagen');

    if (player.self == true) {
      self.ship = self.physics.add.image(player.newX, player.newY, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
      console.log("PlayerAAAAAAAA", player);

      if (player.team === 'blue') {

        self.ship.setTint(0x0000ff);
      }
      else {
        self.ship.setTint(0xff0000);

      }
      self.ship.setDrag(100);
      self.ship.setAngularDrag(100);
      self.ship.setMaxVelocity(200);
    }
    else {
     let other = self.physics.add.image(player.newX, player.newY, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
     console.log("Player", player);
     if (player.team === 'blue') {
        other.setTint(0x0000ff);
      }
      else {
        other.setTint(0xff0000);

      }
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