const configGame = {
    multiplayer: false,
    singleplayer: true,
    max_players: 4,
}

const level = [
    [1, 0, 3],
    [2, 4, 1],
    [3, 4, 2]
]
let sendInfoGame = null;
let finalJuego = null;
let game;
let ownerDelLobby;
let self = null;
// let player = [
//     setVelocity(),
//     active = false,
// ];
// let scale;
let width = 600;
let height = 400;

function init(_sendInfoGame, _finalJuego) {
    sendInfoGame = _sendInfoGame;
    finalJuego = _finalJuego;

    var config = {
        type: Phaser.CANVAS,
        width: 600,
        height: 370,
        canvas: document.getElementById('canvas'),
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
        scale: {
            zoom: 2,
        },
    };
    game = new Phaser.Game(config);
    return game;
}

// Precarga de los recursos del juego
function preload() {
    this.load.spritesheet('sokoban', './fitxers/GamesFiles/MemoryGame/images/sokoban_tilesheet.png', {
        frameWidth: 64
    });

    this.load.image('bear', './fitxers/GamesFiles/MemoryGame/images/bear.png');
    this.load.image('chicken', './fitxers/GamesFiles/MemoryGame/images/chicken.png');
    this.load.image('duck', './fitxers/GamesFiles/MemoryGame/images/duck.png');
    this.load.image('parrot', './fitxers/GamesFiles/MemoryGame/images/parrot.png');

}


function create() {
    self = this;
    this.cursors = this.input.keyboard.createCursorKeys()

    createAnimations.call(this);

    this.player = this.physics.add.sprite(width * 0.5, height * 0.6, 'sokoban')
    this.physics.add.existing(this.player);

    this.player.setSize(40, 16);

    this.player.setOrigin(0.3, 0.75); // Ajusta los valores según tus necesidades

    this.player.play('down-idle');


    this.player.setCollideWorldBounds(true)

    this.input.keyboard.on('keyup-SPACE', function (event) {
        const spaceJustPressed = event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE;
        if (spaceJustPressed && self.activeBox) {
            openBox.call(self, self.activeBox);
            self.activeBox.setFrame(10);
            self.activeBox = undefined;
        }
    });
    this.boxGroup = this.physics.add.staticGroup()

    let xPer = 0.25;
    let y = 150;
    for (let row = 0; row < level.length; ++row) {
        for (let col = 0; col < level[row].length; ++col) {
            /** @type {Phaser.Physics.Arcade.Sprite} */
            const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10);
            box.setSize(64, 32)
                .setOffset(0, 32)
                .setData('itemType', level[row][col]);

            xPer += 0.25;
        }

        xPer = 0.25;
        y += 150;
    }
    this.itemsGroup = this.add.group()

    const timerLabel = this.add.text(width * 0.5, 50, '45', { fontSize: 48 })
        .setOrigin(0.5)

    this.countdown = new CountdownController(this, timerLabel)
    this.countdown.startTimer(handleCountdownFinished())

    this.physics.add.collider(this.player, this.boxGroup, this.handlePlayerBoxCollide, undefined, this)
}

function createAnimations() {
    this.anims.create({
        key: 'down-idle',
        frames: [{ key: 'sokoban', frame: 52 }]
    });

    this.anims.create({
        key: 'down-walk',
        frames: this.anims.generateFrameNumbers('sokoban', { start: 52, end: 54 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'up-idle',
        frames: [{ key: 'sokoban', frame: 55 }]
    })

    this.anims.create({
        key: 'up-walk',
        frames: this.anims.generateFrameNumbers('sokoban', { start: 55, end: 57 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'left-idle',
        frames: [{ key: 'sokoban', frame: 81 }]
    })

    this.anims.create({
        key: 'left-walk',
        frames: this.anims.generateFrameNumbers('sokoban', { start: 81, end: 83 }),
        frameRate: 10,
        repeat: -1
    })

    this.anims.create({
        key: 'right-idle',
        frames: [{ key: 'sokoban', frame: 78 }]
    })

    this.anims.create({
        key: 'right-walk',
        frames: this.anims.generateFrameNumbers('sokoban', { start: 78, end: 80 }),
        frameRate: 10,
        repeat: -1
    })
}


function handleCountdownFinished() {
    if (this.player) {
        this.player.active = false;
        this.player.setVelocity(0, 0);
    }
    // console.log("You lose!");

    // const { width, height } = this.scale;
    // self.player.add.text(width * 0.5, height * 0.5, 'You Lose!', { fontSize: 48 })
    //     .setOrigin(0.5);
    // let gameOverText = this.add.text(width * 0.5, height * 0.5, 'Game Over', { fontSize: '64px', fill: 'black' });
}
// /**
//  * 
//  * @param {Phaser.Physics.Arcade.Sprite} player 
//  * @param {Phaser.Physics.Arcade.Sprite} box
//  */
function handlePlayerBoxCollide(player, box) {
    const opened = box.getData('opened')

    if (opened) {
        return
    }

    if (this.activeBox) {
        return
    }

    this.activeBox = box

    this.activeBox.setFrame(9)
}

// /**
//  * 
//  * @param {Phaser.Physics.Arcade.Sprite} box 
//  */
function openBox(box) {
    if (!box) {
        return
    }

    const itemType = box.getData('itemType')

    /** @type {Phaser.GameObjects.Sprite} */
    let item

    switch (itemType) {
        case 0:
            item = self.itemsGroup.get(box.x, box.y)
            item.setTexture('bear')
            break

        case 1:
            item = self.itemsGroup.get(box.x, box.y)
            item.setTexture('chicken')
            break

        case 2:
            item = self.itemsGroup.get(box.x, box.y)
            item.setTexture('duck')
            break

        case 3:
            item = self.itemsGroup.get(box.x, box.y)
            item.setTexture('parrot')
            break

        case 4:
            item = self.itemsGroup.get(box.x, box.y)
            item.setTexture('penguin')
            break
    }

    if (!item) {
        return
    }

    box.setData('opened', true)

    item.setData('sorted', true)
    item.setDepth(2000)

    item.setActive(true)
    item.setVisible(true)

    item.scale = 0
    item.alpha = 0

    self.selectedBoxes.push({ box, item })

    self.tweens.add({
        targets: item,
        y: '-=50',
        alpha: 1,
        scale: 1,
        duration: 500,
        onComplete: () => {
            if (itemType === 0) {
                handleBearSelected()
                return
            }

            if (this.selectedBoxes.length < 2) {
                return
            }

            checkForMatch()
        }
    })
}


function handleBearSelected() {
    const { box, item } = this.selectedBoxes.pop();

    item.setTint(0xff0000);
    box.setFrame(7);

    self.player.active = false;
    self.player.setVelocity(0, 0);

    self.time.delayedCall(1000, () => {
        item.setTint(0xffffff);
        box.setFrame(10);
        box.setData('opened', false);

        self.tweens.add({
            targets: item,
            y: '+=50',
            alpha: 0,
            scale: 0,
            duration: 300,
            onComplete: () => {
                self.player.active = true;
            }
        });
    });
}


function checkForMatch() {

    const second = self.selectedBoxes.pop()
    const first = self.selectedBoxes.pop()
console.log(firs);
    if (first.item && second.item && first.item.texture !== second.item.texture) {
        self.tweens.add({
            targets: [first.item, second.item],
            y: '+=50',
            alpha: 0,
            scale: 0,
            duration: 300,
            delay: 1000,
            onComplete: () => {
                self.itemsGroup.killAndHide(first.item)
                self.itemsGroup.killAndHide(second.item)

                first.box.setData('opened', false)
                second.box.setData('opened', false)
            }
        })
        return
    }

    ++self.matchesCount

    self.time.delayedCall(1000, () => {
        first.box.setFrame(8)
        second.box.setFrame(8)

        if (self.matchesCount >= 4) {
            // game won
            self.countdown.stop()

            self.player.active = false
            self.player.setVelocity(0, 0)

            // const { width, height } = this.scale
            self.add.text(width * 0.5, height * 0.5, 'You Win!', {
                fontSize: 48
            })
                .setOrigin(0.5)
        }
    })
}

function updatePlayer() {
    if (!self.player.active) {
        return;
    }

    const speed = 200;

    if (self.cursors.left.isDown) {
        self.player.setVelocityX(-speed);
        self.player.play('left-walk', true);
    }
    else if (self.cursors.right.isDown) {
        self.player.setVelocityX(speed);
        self.player.play('right-walk', true);
    }
    else if (self.cursors.up.isDown) {
        self.player.setVelocityY(-speed);
        self.player.play('up-walk', true);
    }
    else if (self.cursors.down.isDown) {
        self.player.setVelocityY(speed);
        self.player.play('down-walk', true);
    }
    else {
        self.player.setVelocity(0, 0);
        const key = self.player.anims.currentAnim.key;
        const parts = key.split('-');
        const direction = parts[0];
        self.player.play(`${direction}-idle`);
    }

    const spaceJustPressed = Phaser.Input.Keyboard.JustUp(self.cursors.space)
    if (spaceJustPressed && self.activeBox) {
        openBox(self.activeBox)

        self.activeBox.setFrame(10)
        self.activeBox = undefined
    }
}

function updateActiveBox() {
    if (!self.activeBox) {
        return;
    }

    const distance = Phaser.Math.Distance.Between(
        self.player.x, self.player.y,
        self.activeBox.x, self.activeBox.y
    );

    if (distance >= 64) {
        self.activeBox.setFrame(10);
        self.activeBox = undefined;
    }
}

function update() {
    updatePlayer();
    updateActiveBox();

    this.children.each(c => {
        /** @type {Phaser.Physics.Arcade.Sprite} */
        // @ts-ignore
        const child = c;

        if (child.getData('sorted')) {
            return;
        }

        child.setDepth(child.y);
    });

    this.countdown.updateTimer();
}

const CountdownController = function (scene, label) {
    this.scene = scene;
    this.label = label;

    let timerEvent;
    let duration = 0;

    this.startTimer = (callback, duration = 45000) => {
        this.stopTimer();

        this.finishedCallback = callback;
        this.duration = duration;

        this.timerEvent = this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.label.text = '0';
                this.stopTimer();

                if (callback) {
                    callback();
                }
            }
        });
    };

    this.stopTimer = () => {
        if (this.timerEvent) {
            this.timerEvent.destroy();
            this.timerEvent = undefined;
        }
    };

    this.updateTimer = () => {
        if (!this.timerEvent || this.duration <= 0) {
            return;
        }

        const elapsed = this.timerEvent.getElapsed();
        const remaining = this.duration - elapsed;
        const seconds = remaining / 1000;

        this.label.text = seconds.toFixed(2);
    };
};

























function recibirInfoFromPlatform(data) {
    console.log("Datos recibidos:", data);


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
