var contador = 0;
var textoContador;
var sendInfoGame = null;
var finalJuego = null;
var tiempoObjeto = 1000;
var ownerDelLobby;
var objects;
var object;
var user;
var infoGame = {
    "object": object,
    "user": user,
    "score": contador
};

function init(_sendInfoGame, _finalJuego) {
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    var config = {
        type: Phaser.canvas,
        width: 800,
        height: 600,
        canvas: document.getElementById('canvas'),
        scene: {
            preload: preload,
            create: create,
        },
    };

    var game = new Phaser.Game(config);
    return game;
}

function preload() {
    this.load.image("object", "./object.jpg");
}

function create() {
    objects = this.add.group();
    textoContador = this.add.text(10, 10, contador, { font: '32px Arial', fill: '#FFFF' });

    if (ownerDelLobby) {
        this.time.addEvent({
            delay: tiempoObjeto,
            loop: true,
            callback: function () {
                object = objects.create(
                    Phaser.Math.Between(50, 750),
                    Phaser.Math.Between(50, 550),
                    "object"
                );
                var infoGame = {
                    "object": object,
                    "user": user,
                    "score": contador
                };

                object.setScale(0.4);
                object.setInteractive();
                if (sendInfoGame != null) {
                    sendInfoGame(infoGame);
                }

                object.on("pointerdown", function () {
                    object.destroy(true, false);
                    contador += 10;
                    if (contador == 50) {
                        finalJuego(contador);
                        textoContador.setText('GAME OVER');
                    }
                });
                this.time.addEvent({
                    delay: tiempoObjeto - 100,
                    callback: function () {
                        if (object.active) {
                            object.destroy();
                        }
                    },
                    callbackScope: this
                });
            },
            callbackScope: this
        });
    }
}

function recibirInfoFromPlatform(data) {
    if (!ownerDelLobby) {
        if (data.infoGame && data.infoGame.object) {
            var object = objects.create(data.infoGame.object.x, data.infoGame.object.y, data.infoGame.object.textureKey);
            object.setScale(data.infoGame.object.scale.x);
            object.setInteractive();

            object.on("pointerdown", function () {
                object.destroy();
                contador += 10;
                if (contador == 50) {
                    finalJuego(contador);
                    textoContador.setText('GAME OVER');
                } else {
                    infoGame.score = contador;
                    infoGame.user = user;
                    sendInfoGame(infoGame);
                }
            });
            setTimeout(() => {
                if (object.active) {
                    object.destroy();
                }
            }, tiempoObjeto - 100);
        }
    }
    console.log("Recibido de la plataforma - " + "User: " + data.infoGame.user + " Score: " + data.infoGame.score + "\n");
    textoContador.setText(data.infoGame.user + ": " + data.infoGame.score)
}

function recibirInfoLobby(lobby) {
    console.log(lobby);
    lobby.members.forEach((member) => {
        if (member.idUser == lobby.yourId) {
            user = member.username;
        }
        if (lobby.ownerId == lobby.yourId) {
            ownerDelLobby = true;
        } else {
            ownerDelLobby = false;
        }
    });
    console.log(user);
}

function executeGame() {
    var obj = [];

    obj.init = init;
    obj.recibirInfoFromPlatform = recibirInfoFromPlatform;
    obj.recibirInfoLobby = recibirInfoLobby;
    return obj;
}

executeGame();