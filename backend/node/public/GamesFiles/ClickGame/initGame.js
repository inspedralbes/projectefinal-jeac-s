function init() {
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
// Variables globales
var contador = 0;
var textoContador;

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

    // Agregar evento de clic a la imagen
    imagen.on('pointerdown', function () {
        if (contador == 10) {
            endGame(contador);
        } else {
            contador++;
            textoContador.setText('Contador: ' + contador);
            enviar(contador);
        }
    });
    return imagen;
}

function enviar(cont) {
    console.log(cont);
    return cont;
}

function recibir(item) {
    console.log(item);
    return item
}

function endGame(cont) {
    console.log(cont);
    return cont;
}

function executeGame() {
    var obj = {};

    obj.init = init;
    obj.enviar = enviar;
    obj.endGame = endGame;
    obj.recibir = recibir;

    return obj;
}

executeGame();