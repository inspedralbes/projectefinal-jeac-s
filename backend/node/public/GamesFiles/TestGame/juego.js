var contador = 0;
var textoContador;
var sendInfoGame = null;
var finalJuego = null;
var tiempoObjeto = 3000;
var ownerDelLobby;
var sendObjetToPlatform;
var objects;

function init(_sendObjetToPlatform, _sendInfoGame, _finalJuego) {
    sendObjetToPlatform = _sendObjetToPlatform;
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
                var object = objects.create(
                    Phaser.Math.Between(50, 750),
                    Phaser.Math.Between(50, 550),
                    "object"
                );
                object.setScale(0.4);

                object.setInteractive();
                sendObjetToPlatform(object);

                object.on("pointerdown", function () {
                    object.destroy();
                    contador += 10;
                    if (contador > 250) {
                        finalJuego();
                        textoContador.setText('GAME OVER');
                    } else {
                        textoContador.setText(contador);
                        sendInfoGame(contador);
                    }
                });
                this.time.addEvent({
                    delay: tiempoObjeto - 100,
                    callback: function () {
                        if (object.active) {
                            object.destroy();
                        }
                    },
                    // Use the same scope for the create and destroy events
                    callbackScope: this
                });
            },
            // Use the same scope for the create and destroy events
            callbackScope: this
        });
    }
}

function recibirInfo(puntos) {
    var texto = '';
    puntos.forEach(function (p) {
        texto += p.member + ': ' + p.score + '\n';
    });
    textoContador.setText(texto);
    console.log(puntos);
}

function recibirInfoLobby(lobby) {
    lobby.members.forEach((member) => {
        console.log(member);
        if (member.isOwner) {
            ownerDelLobby = member.isOwner;
        } else {
            ownerDelLobby = false;
        }
    });

    console.log(ownerDelLobby);
}

function recibirObjetoDePlataforma(objeto) {
    if (!ownerDelLobby) {
        var self = this; // Almacenar el contexto actual

        var object = objects.create(objeto.objectGame.x, objeto.objectGame.y, objeto.objectGame.textureKey);
        object.setScale(objeto.objectGame.scale.x);

        object.setInteractive();
        object.on("pointerdown", function () {
            object.destroy();
            contador += 10;
            if (contador > 250) {
                finalJuego();
                textoContador.setText('GAME OVER');
            } else {
                textoContador.setText(contador);
                sendInfoGame(contador);
            }
        });
        console.log(objeto.resultGame);
    }
}


function executeGame() {
    var obj = [];

    obj.init = init;
    obj.recibir = recibirInfo;
    obj.recibirInfoLobby = recibirInfoLobby;
    obj.recibirObjetoDePlataforma = recibirObjetoDePlataforma;
    return obj;
}

executeGame();

