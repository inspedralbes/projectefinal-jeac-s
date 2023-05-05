// Variables globales
var contador = 0;
var textoContador;
var sendInfoGame = null;
var finalJuego = null;
var tiempoObjeto = 800;

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
    var objects = this.add.group();

    textoContador = this.add.text(10, 10, contador, { font: '32px Arial', fill: '#FFFF' });

    this.time.addEvent({
        delay: tiempoObjeto,
        loop: true, // indica que se repite el evento
        callback: function () {
            var object = objects.create(
                Phaser.Math.Between(50, 750),
                Phaser.Math.Between(50, 550),
                "object"
            );
            object.setScale(0.4); // se ajusta el tamaño del objeto

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
            // si se llega al final del tiempo sin destruir el objeto, se resta 10 al contador
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

function recibirInfo(puntos) {
    var texto = '';
    puntos.forEach(function (p) {
        texto += p.member + ': ' + p.score + '\n';
    });
    textoContador.setText(texto);
    console.log(puntos);
}

function executeGame() {
    var obj = [];

    obj.init = init;
    obj.recibir = recibirInfo;
    return obj;
}

executeGame();