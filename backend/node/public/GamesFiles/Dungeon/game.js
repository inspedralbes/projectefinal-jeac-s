const configGame = {
    multiplayer: true,
    singleplayer: true,
    max_players: 2,
}
var game;
var sendInfoGame = null;
var finalJuego = null;
var player;
var walls;
var treasure;
var enemies;
var score = 0;
var scoreText;
var level = 1;
var levelText;
var projectiles;
var shootKey;
var playerDirection = 'right';

function init(_sendInfoGame, _finalJuego) {
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    // Configuración del juego
    var config = {
        type: Phaser.canvas,
        width: 800,
        height: 600,
        canvas: document.getElementById('canvas'),
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    game = new Phaser.Game(config);
    return game;
}

function preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('treasure', 'assets/treasure.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('projectile', 'assets/projectile.png');
}

function create() {
    // Crear el jugador
    player = this.physics.add.sprite(32, 32, 'player');
    player.setCollideWorldBounds(true);
    projectiles = this.physics.add.group();

    // Crear las paredes
    // walls = this.physics.add.staticGroup();
    // walls.create(400, 0, 'wall').setOrigin(0.5, 0).refreshBody();
    // walls.create(400, 600, 'wall').setOrigin(0.5, 1).refreshBody();
    // walls.create(0, 300, 'wall').setOrigin(0, 0.5).refreshBody();
    // walls.create(800, 300, 'wall').setOrigin(1, 0.5).refreshBody();

    // Crear el tesoro
    treasure = this.physics.add.sprite(Phaser.Math.Between(100, 700), Phaser.Math.Between(100, 500), 'treasure');

    // Crear los enemigos
    enemies = this.physics.add.group();
    createEnemies();

    // Colisiones
    this.physics.add.collider(player, walls);
    this.physics.add.overlap(player, treasure, collectTreasure, null, this);
    this.physics.add.overlap(player, enemies, hitEnemy, null, this);

    // Texto de puntuación
    scoreText = this.add.text(16, 16, 'Puntuación: 0', { fontSize: '32px', fill: '#fff' });

    // Texto de nivel
    levelText = this.add.text(16, 50, 'Nivel: 1', { fontSize: '24px', fill: '#fff' });

    // Controles del jugador
    cursors = this.input.keyboard.createCursorKeys();
    shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    player.setFlipX(true);

}

function update() {
    // Movimiento del jugador
    player.setVelocity(0);

    if (Phaser.Input.Keyboard.JustDown(shootKey)) {
        var projectile;
        var velocityX = 0;
        var velocityY = 0;

        if (playerDirection === 'right') {
            velocityX = 500;
        } else if (playerDirection === 'left') {
            velocityX = -500;
        } else if (playerDirection === 'up') {
            velocityY = -500;
        } else if (playerDirection === 'down') {
            velocityY = 500;
        }

        if (cursors.up.isDown && cursors.right.isDown) {
            velocityX = 500;
            velocityY = -500;
        } else if (cursors.up.isDown && cursors.left.isDown) {
            velocityX = -500;
            velocityY = -500;
        } else if (cursors.down.isDown && cursors.right.isDown) {
            velocityX = 500;
            velocityY = 500;
        } else if (cursors.down.isDown && cursors.left.isDown) {
            velocityX = -500;
            velocityY = 500;
        }

        projectile = projectiles.create(player.x, player.y, 'projectile');
        projectile.setVelocity(velocityX, velocityY);

        this.physics.add.collider(projectile, enemies, destroyEnemy, null, this);
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
        playerDirection = 'left';
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
        playerDirection = 'right';
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
        playerDirection = 'up';
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
        playerDirection = 'down';
    }

    if (playerDirection === 'left') {
        player.setFlipX(true);
    } else if (playerDirection === 'right') {
        player.setFlipX(false);
    }
}

function collectTreasure(player, treasure) {
    treasure.disableBody(true, true);
    score += 10;
    scoreText.setText('Puntuación: ' + score);

    if (score % 50 === 0) {
        level++;
        levelText.setText('Nivel: ' + level);
        createEnemies();
    }

    // Aquí puedes agregar tu lógica para continuar el juego después de recoger el tesoro
}

function hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    alert('¡Has sido atrapado por un enemigo!');

    // Aquí puedes agregar tu lógica para reiniciar el juego después de ser atrapado
}

function createEnemies() {
    enemies.clear(true, true);

    for (var i = 0; i < level; i++) {
        var x = Phaser.Math.Between(100, 700);
        var y = Phaser.Math.Between(100, 500);
        var enemy = enemies.create(x, y, 'enemy');
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(1);
        enemy.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
    }
}

function destroyEnemy(projectile, enemy) {
    projectile.disableBody(true, true);
    enemy.disableBody(true, true);
    score += 20;
    scoreText.setText('Puntuación: ' + score);

    if (enemies.countActive() === 0) {
        level++;
        levelText.setText('Nivel: ' + level);
        createEnemies();
    }
}


function recibirInfoFromPlatform(data) {
    console.log(data);
}

function recibirInfoLobby(lobby) {
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