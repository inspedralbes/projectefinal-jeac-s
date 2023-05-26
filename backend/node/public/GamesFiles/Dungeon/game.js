const configGame = {
    multiplayer: true,
    singleplayer: true,
    max_players: 2,
};

var sendInfoGame = null;
var finalJuego = null;
var game;
var ownerDelLobby;
var user;
var faune;
var faune2;
var fauneCreated = false;
var wallsLayer;
let self = null;
var lastPosition = { x: 0, y: 0 };
let direction = '';
var lizard;
const speed = 70;
const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
};
var lizardLastPosition = { x: 0, y: 0 };
let hit = 0;
var health = 3;
let lastShotTime = 0;
let spaceDown = false;

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
                gravity: { y: 0 },
                debug: false,
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

function preload() {
    this.load.image('tiles', '../GamesFiles/Dungeon/tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', '../GamesFiles/Dungeon/tiles/dungeon-01.json');
    this.load.atlas('faune', '../GamesFiles/Dungeon/character/fauna.png', '../GamesFiles/Dungeon/character/fauna.json');
    this.load.atlas('lizard', '../GamesFiles/Dungeon/enemies/lizard.png', '../GamesFiles/Dungeon/enemies/lizard.json');
    this.load.image('ui-heart-empty', '../GamesFiles/Dungeon/ui/ui_heart_empty.png');
    this.load.image('ui-heart-full', '../GamesFiles/Dungeon/ui/ui_heart_full.png');
    this.load.image('knife', '../GamesFiles/Dungeon/weapons/weapon_knife.png');

    this.cursors = this.input.keyboard.createCursorKeys();
}
function createAnimations() {
    this.anims.create({
        key: 'faune-idle-down',
        frames: [{ key: 'faune', frame: 'walk-down-3.png' }],
    });
    this.anims.create({
        key: 'faune-idle-up',
        frames: [{ key: 'faune', frame: 'walk-up-3.png' }]
    })

    this.anims.create({
        key: 'faune-idle-side',
        frames: [{ key: 'faune', frame: 'walk-side-3.png' }]
    })

    this.anims.create({
        key: 'faune-run-down',
        frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-down-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-run-up',
        frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-up-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-run-side',
        frames: this.anims.generateFrameNames('faune', { start: 1, end: 8, prefix: 'run-side-', suffix: '.png' }),
        repeat: -1,
        frameRate: 15
    })

    this.anims.create({
        key: 'faune-faint',
        frames: this.anims.generateFrameNames('faune', { start: 1, end: 4, prefix: 'faint-', suffix: '.png' }),
        repeat: 0,
        frameRate: 15
    })

    this.anims.create({
        key: 'lizard-idle',
        frames: this.anims.generateFrameNames('lizard', { start: 0, end: 3, prefix: 'lizard_m_idle_anim_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    })

    this.anims.create({
        key: 'lizard-run',
        frames: this.anims.generateFrameNames('lizard', { start: 0, end: 3, prefix: 'lizard_m_run_anim_f', suffix: '.png' }),
        repeat: -1,
        frameRate: 10
    })
}

function create() {
    self = this;
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer('Ground', tileset);
    wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });

    createAnimations.call(this);

    lizard = this.physics.add.sprite(256, 128, 'lizard', 'lizard_m_idle_anim_f0.png');
    lizard.anims.play('lizard-idle');
    this.physics.add.collider(lizard, wallsLayer, handleLizardWallCollision, null, this);

    this.knives = this.physics.add.group({
        classType: Phaser.GameObjects.Image
    });
    this.physics.add.collider(this.knives, wallsLayer, handleKnifeWallCollision, undefined, this);
    this.physics.add.collider(this.knives, lizard, handleKnifeLizardCollision, undefined, this);

    this.hearts = this.add.group({
        classType: Phaser.GameObjects.Image
    });

    this.hearts.createMultiple({
        key: 'ui-heart-full',
        setXY: {
            x: 10,
            y: 10,
            stepX: 16
        },
        quantity: 3,
    });
    this.hearts.children.iterate((child) => {
        child.setScrollFactor(0);
    });

    if (ownerDelLobby) {
        faune = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png');
        faune.body.setSize(faune.width * 0.5, faune.height * 0.8);
        faune.anims.play('faune-idle-down');
        this.cameras.main.startFollow(faune, true);
        var direction = Direction.RIGHT;
        this.moveEvent = this.time.addEvent({
            delay: 2000,
            callback: () => {
                setLizardVelocity(direction);
            },
            loop: true,
        });
        setLizardVelocity(direction);
        this.physics.add.collider(faune, wallsLayer);
        fauneLizardCollider = this.physics.add.collider(faune, lizard, handleLizardPlayerCollision, undefined, this);
    } else {
        faune2 = this.physics.add.sprite(128, 128, 'faune', 'walk-down-3.png');
        faune2.body.setSize(faune2.width * 0.5, faune2.height * 0.8);
        faune2.anims.play('faune-idle-down');
        this.cameras.main.startFollow(faune2, true);

        this.physics.add.collider(faune2, wallsLayer);
        faune2LizardCollider = this.physics.add.collider(faune2, lizard, handleLizardPlayerCollisionFaune2, undefined, this);
    }
}

function handleKnifeWallCollision(knife) {
    knife.destroy()
}

function handleKnifeLizardCollision(knife, lizard) {
    knife.destroy();
    if (lizard) {
        lizard.destroy();
        var data = {
            ded: "dead"
        }
        sendInfoGame(data)
    }
}

function handleLizardPlayerCollision(faune, lizard) {
    const dx = faune.x - lizard.x;
    const dy = faune.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    faune.setVelocity(dir.x, dir.y);

    hit = 1;
    health--;

    // Update the hearts display
    const heartsArray = self.hearts.getChildren();
    const heartIndex = health;
    if (heartIndex >= 0 && heartIndex < heartsArray.length) {
        heartsArray[heartIndex].setTexture('ui-heart-empty');
    }

    if (health <= 0) {
        faune.anims.play('faune-faint');
        faune.setVelocity(0, 0);
        // Remove collision between faune and lizard
        self.physics.world.removeCollider(fauneLizardCollider);
    }
}

function handleLizardPlayerCollisionFaune2(faune2, lizard) {
    const dx = faune2.x - lizard.x;
    const dy = faune2.y - lizard.y;

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200);

    faune2.setVelocity(dir.x, dir.y);

    hit = 1;
    health--;

    // Update the hearts display
    const heartsArray = self.hearts.getChildren();
    const heartIndex = health;
    if (heartIndex >= 0 && heartIndex < heartsArray.length) {
        heartsArray[heartIndex].setTexture('ui-heart-empty');
    }

    if (health <= 0) {
        faune2.anims.play('faune-faint');
        faune2.setVelocity(0, 0);
        // Remove collision between faune2 and lizard
        self.physics.world.removeCollider(faune2LizardCollider);
    }
}

function handleLizardWallCollision() {
    // Generate a random direction for lizard's velocity
    var newDirection = Phaser.Math.Between(0, 3);
    setLizardVelocity(newDirection);
}

function setLizardVelocity(direction) {
    if (lizard && lizard.body) {
        switch (direction) {
            case Direction.UP:
                lizard.setVelocity(0, -speed);
                break;

            case Direction.DOWN:
                lizard.setVelocity(0, speed);
                break;

            case Direction.LEFT:
                lizard.setVelocity(-speed, 0);
                break;

            case Direction.RIGHT:
                lizard.setVelocity(speed, 0);
                break;
        }
    }
}


function update() {
    if (hit > 0) {
        hit++;
        if (hit > 4) {
            hit = 0;
        }
        return;
    }
    if (!this.cursors || (!faune && !faune2)) {
        return;
    }
    const speed = 100;
    const { left, right, up, down, space } = this.cursors;
    let character = ownerDelLobby ? faune : faune2;

    if (health > 0) {
        if (!this.knives) {
            return;
        }
        if (space.isDown && !spaceDown && (this.time.now - lastShotTime) > 1000) {
            spaceDown = true;
            lastShotTime = this.time.now; // Update the last shot time

            const parts = character.anims.currentAnim.key.split('-');
            const direction = parts[2];
            const vec = new Phaser.Math.Vector2(0, 0);
            switch (direction) {
                case 'up':
                    vec.y = -1;
                    break;

                case 'down':
                    vec.y = 1;
                    break;
                default:
                case 'side':
                    if (character.scaleX < 0) {
                        vec.x = -1;
                    } else {
                        vec.x = 1;
                    }
                    break;
            }
            const angle = vec.angle();
            const knife = this.knives.get(character.x, character.y, 'knife');

            knife.setActive(true);
            knife.setVisible(true);

            knife.setRotation(angle);
            knife.x += vec.x * 16;
            knife.y += vec.y * 16;

            this.physics.velocityFromRotation(angle, 300, knife.body.velocity);
            var knifee = {
                knifee: knife
            }
            sendInfoGame(knifee)
        } else if (!space.isDown) {
            spaceDown = false;
        }
        if (left.isDown) {
            character.anims.play('faune-run-side', true);
            character.setVelocity(-speed, 0);
            character.scaleX = -1;
            character.body.offset.x = 24;
            direction = 'left';
        } else if (right.isDown) {
            character.anims.play('faune-run-side', true);
            character.setVelocity(speed, 0);
            character.scaleX = 1;
            character.body.offset.x = 8;
            direction = 'right';
        } else if (up.isDown) {
            character.anims.play('faune-run-up', true);
            character.setVelocity(0, -speed);
            direction = 'up';
        } else if (down.isDown) {
            character.anims.play('faune-run-down', true);
            character.setVelocity(0, speed);
            direction = 'down';
        } else {
            const parts = character.anims.currentAnim.key.split('-');
            parts[1] = 'idle';
            character.play(parts.join('-'));
            character.setVelocity(0, 0);
        }
    }

    var currentPosition = { x: character.x, y: character.y }; // Usar 'character' en lugar de 'faune'
    if (currentPosition.x !== lastPosition.x || currentPosition.y !== lastPosition.y) {
        lastPosition = currentPosition;
        var data = {
            faune: ownerDelLobby ? { x: currentPosition.x, y: currentPosition.y } : null,
            faune2: !ownerDelLobby ? { x: currentPosition.x, y: currentPosition.y } : null,
            direction: direction,
            animation: character.anims.currentAnim.key,
            scaleX: character.scaleX,
        };
        sendInfoGame(data);
    }

    if (lizard) {
        var lizardCurrentPosition = { x: lizard.x, y: lizard.y };
        if (lizardCurrentPosition.x !== lizardLastPosition.x || lizardCurrentPosition.y !== lizardLastPosition.y) {
            lizardLastPosition = lizardCurrentPosition;
            var lizardPosition = { x: lizard.x, y: lizard.y };
            sendInfoGame({ lizard: lizardPosition });
        }
    } 
}

function recibirInfoFromPlatform(data) {
    if (!ownerDelLobby && data.infoGame.faune) {
        if (!faune) {
            faune = self.physics.add.sprite(data.infoGame.faune.x, data.infoGame.faune.y, 'faune', 'walk-down-3.png');
            faune.body.setSize(faune.width * 0.5, faune.height * 0.8);
            self.cameras.main.startFollow(faune2, true);

            self.physics.add.collider(faune, wallsLayer);
        } else {
            var newPosition = data.infoGame.faune;
            if (newPosition.x !== faune.x || newPosition.y !== faune.y) {
                faune.setPosition(newPosition.x, newPosition.y);
                faune.anims.play(data.infoGame.animation, true);
                faune.scaleX = data.infoGame.scaleX;
                faune.body.offset.x = data.infoGame.scaleX === -1 ? 24 : 8;
            }
        }
    }

    if (ownerDelLobby && data.infoGame.faune2) {
        if (!faune2) {
            faune2 = self.physics.add.sprite(data.infoGame.faune2.x, data.infoGame.faune2.y, 'faune', 'walk-down-3.png');
            faune2.body.setSize(faune2.width * 0.5, faune2.height * 0.8);
            self.cameras.main.startFollow(faune, true);
            self.physics.add.collider(faune2, wallsLayer);
        } else {
            var newPosition = data.infoGame.faune2;
            if (newPosition.x !== faune2.x || newPosition.y !== faune2.y) {
                faune2.setPosition(newPosition.x, newPosition.y);
                faune2.anims.play(data.infoGame.animation, true);
                faune2.scaleX = data.infoGame.scaleX;
                faune2.body.offset.x = data.infoGame.scaleX === -1 ? 24 : 8;
            }
        }
    }
    if (!ownerDelLobby && data.infoGame.lizard) {

        if (!lizard) {
            lizard = self.physics.add.sprite(data.infoGame.lizard.x, data.infoGame.lizard.y, 'lizard', 'lizard_m_idle_anim_f0.png');
        } else {
            var newPosition = data.infoGame.lizard;
            if (newPosition.x !== lizard.x || newPosition.y !== lizard.y) {
                lizard.setPosition(newPosition.x, newPosition.y);
            }
        }
    }
    if (data.infoGame.knifee) {
        console.log(data.infoGame.knifee);
    }

    if (data.infoGame.ded == "dead") {
        lizard.destroy();
    }
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