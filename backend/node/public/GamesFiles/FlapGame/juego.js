var bird;
var pipes;
var gameOverText;
var score = 0;

function init(_sendInfoGame, _finalJuego) {

    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 800 },
                debug: false
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
// Declare global variables


function preload() {
    // Preload assets
    this.load.image('bird', '../GamesFiles/FlapGame/assets/bird.png');
    this.load.image('pipe', '../GamesFiles/FlapGame/assets/pipe.png');
}

function create() {
    // Create the bird
    bird = this.physics.add.sprite(100, 300, 'bird');
    bird.setCollideWorldBounds(true);
    bird.setGravityY(-800);

    // Create pipes group
    pipes = this.physics.add.group();

    // Create score text
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Create collisions
    this.physics.add.collider(bird, pipes, gameOver, null, this);

    // Handle input
    this.input.on('pointerdown', flap, this);

    // Generate pipes
    this.time.addEvent({
        delay: 1500,
        callback: generatePipes,
        callbackScope: this,
        loop: true
    });
}

function update() {
    // Check if the bird is out of bounds
    if (bird.y > this.sys.game.config.height) {
        gameOver();
    }

    // Rotate the bird based on its velocity
    bird.angle = Math.min(90, bird.body.velocity.y * 3);

    // Update score
    pipes.getChildren().forEach(function (pipe) {
        if (pipe.getBounds().right < bird.getBounds().left && !pipe.scored) {
            pipe.scored = true;
            score++;
            scoreText.setText('Score: ' + score);
        }
    });
}

function flap() {
    // Apply vertical velocity to the bird
    bird.setVelocityY(-350);
}

function generatePipes() {
    // Calculate a random pipe gap position
    var gapPosition = Phaser.Math.Between(100, 400);

    // Create the upper pipe
    var upperPipe = pipes.create(800, gapPosition - 300, 'pipe');
    upperPipe.body.allowGravity = false;

    // Create the lower pipe
    var lowerPipe = pipes.create(800, gapPosition + 100, 'pipe');
    lowerPipe.flipY = true;
    lowerPipe.body.allowGravity = false;

    // Set pipe velocity
    pipes.setVelocityX(-200);

    // Remove pipes when they're out of bounds
    pipes.getChildren().forEach(function (pipe) {
        if (pipe.getBounds().right < 0) {
            pipe.destroy();
        }
        pipe.scored = false;
    });
}

function gameOver() {
    // Stop the game and display game over text
    this.physics.pause();
    gameOverText = this.add.text(250, 250, 'Game Over', { fontSize: '64px', fill: '#000' });
} s