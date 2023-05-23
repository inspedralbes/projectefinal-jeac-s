const configGame = {
    multiplayer: true,
    singleplayer: true,
    max_players: 2,
}

var sendInfoGame = null;
var finalJuego = null;
var game;

function init(_sendInfoGame, _finalJuego) {
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    var config = {
        type: Phaser.canvas,
        width: 400,
        height: 300,
        canvas: document.getElementById('canvas'),
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 }
            }
        },
        scene: {
            preload: preload,
            create: create,
        },
        scale: {
            zoom: 2
        }
    };

    game = new Phaser.Game(config);
    return game;
}

function preload() {
    this.load.image("tiles", "../GamesFiles/Dungeon/tiles/dungeon_tiles.png");
    this.load.tilemapTiledJSON('dungeon', "../GamesFiles/Dungeon/tiles/dungeon-01.json");
}

function create() {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer('Ground', tileset);
    const wallsLayer = map.createLayer('Walls', tileset);

    wallsLayer.setCollisionByProperty({ collides: true });

    const debugGraphics = this.add.graphics().setAlpha(0.7);

    wallsLayer.renderDebug(debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    })
}

function recibirInfoFromPlatform(data) {
    console.log(data);
}

function recibirInfoLobby(lobby) {
    console.log(lobby);
}

function userLeft(user) {
    console.log("User left: ", user);
}

function destroyGame() {
    if (game != null || game != undefined) {
        game.destroy(true, false);
    }
}

function executeGame() {
    var obj = [];

    obj.init = init;
    obj.config_game = configGame;
    obj.recibirInfoFromPlatform = recibirInfoFromPlatform;
    obj.recibirInfoLobby = recibirInfoLobby;
    obj.userLeft = userLeft;
    obj.destroyGame = destroyGame;
    return obj;
}

executeGame();