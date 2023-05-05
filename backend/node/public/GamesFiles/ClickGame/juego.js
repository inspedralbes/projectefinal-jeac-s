// Variables globales
var contador = 0;
var textoContador;
var sendInfoGame = null;
var finalJuego = null;

function init(_sendInfoGame, _finalJuego) {

    //traspasamos la funciones recibidas a variables globales
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    // Inicializar el juego
    var config = {
        type: Phaser.canvas,
        width: 800,
        height: 600,
        canvas: document.getElementById('canvas'),
        scene: {
            preload: preload,
            create: create
        }
    };

    var game = new Phaser.Game(config);
    return game;
}

// Cargar imagen
function preload() {
    this.load.image('boton', './retro.jpg');
}

// Agregar la imagen y el texto
function create() {
    // Agregar imagen
    var imagen = this.add.sprite(400, 300, 'boton');
    imagen.setInteractive();

    // Agregar texto
    textoContador = this.add.text(10, 10, contador, { font: '32px Arial', fill: '#FFFF' });

    // Agregar evento de clic a la imagen
    imagen.on('pointerdown', function () {
        contador++;
        if (contador > 10) {
            finalJuego();
            textoContador.setText('GAME OVER');
        } else {
            textoContador.setText(contador);
            // enviamos la puntuacion actualizada a la plataforma
            sendInfoGame(contador);
        }
    });
    return imagen;
}

function recibirInfo(puntos) {
    console.log("Soy el Juego - " + puntos)
}

function executeGame() {
    var obj = {};

    obj.init = init;
    obj.recibir = recibirInfo;
    console.log(obj);
    return obj;
}

executeGame();