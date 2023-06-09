import Preloader from "./scenes/Preloader";
import Game from "./scenes/Game";

const configGame = {
    multiplayer: true,
    singleplayer: true,
    max_players: 4,
}

let game;

function init(_sendInfoGame, _finalJuego) {
    //traspasamos la funciones recibidas a variables globales
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;


    var config = {
        type: Phaser.CANVAS,
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
        scene: [Preloader, Game]
    };

    game = new Phaser.Game(config);

    return game;
}

// // Precarga de los recursos del juego
// function preload() {
//     this.load.image('bear', '../GamesFiles/MemoryGame/images/bear.png');
//     this.load.image('chicken', '../GamesFiles/MemoryGame/images/chicken.png');
//     this.load.image('duck', '../GamesFiles/MemoryGame/images/duck.png');
//     this.load.image('parrot', '../GamesFiles/MemoryGame/images/parrot.png');
//     this.load.spritesheet('sokoban', '../GamesFiles/MemoryGame/images/sockoban_tilesheet.png', {
//         frameWidth: 64
//     });
//     // this.load.spritesheet('');

// }

// function create(){
//     self = this;
// }
