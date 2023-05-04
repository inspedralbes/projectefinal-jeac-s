// Variables globales
var contador = 0;
let contadorEnemigo = 0;
var textoContador;
let textoContadorEnemigo;

var idGame = null;
var sendInfoGame = null;
var finalJuego = null;

function init(_idGame, _sendInfoGame, _finalJuego) {

    //traspasamos la funciones recibidas a variables globales
    idGame = _idGame;
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;
    console.log("");

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
    textoContador = this.add.text(10, 10, 'Contador: ' + contador, { font: '32px Arial', fill: '#FFFF' });
    textoContadorEnemigo = this.add.text(10, 10, 'Contador: ' + contadorEnemigo, { font: '32px Arial', fill: '#0000' });


    // Agregar evento de clic a la imagen
    imagen.on('pointerdown', function () {
        contador++;
        if (contador > 10) {
            finalJuego();
            textoContador.setText('GAME OVER');
            textoContadorEnemigo.setText('GAME OVER');


        } else {
            textoContador.setText('Contador: ' + contador);
            // enviamos la puntuacion actualizada a la plataforma
            sendInfoGame(idGame, contador);
        }
    });
    return imagen;
}

function executeGame() {
    var obj = {};

    obj.init = init;
    return obj;
}

executeGame();