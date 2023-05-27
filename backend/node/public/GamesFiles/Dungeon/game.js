const configGame = {
    multiplayer: true,
    singleplayer: false,
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
let interactingChest = null;
let chestsOpenedOwner = 0;
let chestsOpenedNotOwner = 0;
let chestCount = 0;
var textOwner;
var textNotOwner;
let hitCount = 6;
let heartContainer;
let hitText;
var fauneLizardCollider;
var faune2LizardCollider;
var coins = 0;
var totalCoins = 0;
var textCoins;
var textDead;
var sumaCofres = 0;
var sumaCofres2 = 0;

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
    this.load.image('tiles', './fitxers/GamesFiles/Dungeon/tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', './fitxers/GamesFiles/Dungeon/tiles/dungeon-01.json');
    this.load.atlas('faune', './fitxers/GamesFiles/Dungeon/character/fauna.png', './fitxers/GamesFiles/Dungeon/character/fauna.json');
    this.load.atlas('lizard', './fitxers/GamesFiles/Dungeon/enemies/lizard.png', './fitxers/GamesFiles/Dungeon/enemies/lizard.json');
    this.load.image('ui-heart-empty', './fitxers/GamesFiles/Dungeon/ui/ui_heart_empty.png');
    this.load.image('ui-heart-full', './fitxers/GamesFiles/Dungeon/ui/ui_heart_full.png');
    this.load.image('knife', './fitxers/GamesFiles/Dungeon/weapons/weapon_knife.png');
    this.load.atlas('treasure', './fitxers/GamesFiles/Dungeon/items/treasure.png', './fitxers/GamesFiles/Dungeon/items/treasure.json');
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

    this.anims.create({
        key: 'chest-open',
        frames: this.anims.generateFrameNames('treasure', { start: 0, end: 2, prefix: 'chest_empty_open_anim_f', suffix: '.png' }),
        frameRate: 5
    })

    this.anims.create({
        key: 'chest-closed',
        frames: [{ key: 'treasure', frame: 'chest_empty_open_anim_f0.png' }],
    })
}

function create() {
    textOwner = this.add.text(-68, 0, '', { font: '10px Arial', fill: '#ffffff' });
    textOwner.setScrollFactor(0);
    textOwner.setX(4);
    textOwner.setY(24);
    textOwner.setDepth(1);

    textNotOwner = this.add.text(0, 0, '', { font: '10px Arial', fill: '#ffffff' });
    textNotOwner.setScrollFactor(0);
    textNotOwner.setX(340);
    textNotOwner.setY(24);
    textNotOwner.setDepth(1);

    // Create and position the textCoins
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    textCoins = this.add.text(centerX, 4, '0', { font: '10px Arial', fill: '#ffffff' });
    textCoins.setOrigin(0.5, 0);
    textCoins.setScrollFactor(0);
    textCoins.setDepth(1);

    // Create and position the image
    const image = this.add.image(textCoins.x - textCoins.width / 2 - 10, 6, 'treasure', 'coin_anim_f0.png');
    image.setOrigin(0.5, 0);
    image.setScrollFactor(0);

    image.setDepth(1);


    self = this;
    createAnimations.call(this);
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer('Ground', tileset);
    wallsLayer = map.createLayer('Walls', tileset);
    wallsLayer.setCollisionByProperty({ collides: true });


    lizard = this.physics.add.sprite(256, 128, 'lizard', 'lizard_m_idle_anim_f0.png');
    lizard.anims.play('lizard-idle');
    lizard.body.setSize(14, 18);
    lizard.body.setOffset(0, 10);

    lizard.setScale(1.8)
    this.physics.add.collider(lizard, wallsLayer, handleLizardWallCollision, null, this);

    this.knives = this.physics.add.group({
        classType: Phaser.GameObjects.Image
    });
    this.physics.add.collider(this.knives, wallsLayer, handleKnifeWallCollision, undefined, this);
    this.physics.add.collider(this.knives, lizard, handleKnifeLizardCollision, undefined, this);

    heartContainer = this.add.container(lizard.x, lizard.y - 20);
    let heart = this.add.sprite(0, 0, 'ui-heart-full');
    heartContainer.add(heart);

    // Create a text object and add it to the container
    hitText = this.add.text(0, 0, hitCount.toString(), { font: '10px Arial', fill: '#ffffff' });
    heartContainer.add(hitText);
    this.fauneHearts = this.add.group({
        classType: Phaser.GameObjects.Image
    });

    this.fauneHearts.createMultiple({
        key: 'ui-heart-full',
        setXY: {
            x: 10,
            y: 10,
            stepX: 16
        },
        quantity: 3,
    });
    this.fauneHearts.children.iterate((child, index) => {
        child.setScrollFactor(0);
        child.setX(10 + (index * 16)); // Adjust X position for Faune's hearts
    });

    this.faune2Hearts = this.add.group({
        classType: Phaser.GameObjects.Image
    });

    this.faune2Hearts.createMultiple({
        key: 'ui-heart-full',
        setXY: {
            x: this.cameras.main.width - 10, // Right-aligned
            y: 10,
            stepX: -16 // Negative stepX to create hearts from right to left
        },
        quantity: 3,
    });

    this.faune2Hearts.children.iterate((child, index) => {
        child.setScrollFactor(0);
    });

    const chests = this.physics.add.staticGroup();

    var chestsLayer = map.getObjectLayer('Chests');

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
    chestCount = chestsLayer.objects.length;
    chestsLayer.objects.forEach(chestObj => {
        const chest = chests.get(chestObj.x, chestObj.y - chestObj.height * 0.5, 'treasure');
        chest.anims.play('chest-closed');
        this.physics.add.collider([faune, faune2], chest, () => {
            interactingChest = chest;
        });
    });

}

function handleKnifeWallCollision(knife) {
    knife.destroy()
}

function handleKnifeLizardCollision(lizard, knife) {
    if (knife.active) {
        knife.destroy();
        if (lizard) {
            hitCount--;
            hitText.setText(hitCount.toString());
            if (hitCount <= 0) {
                // Make the lizard invisible and remove its collider with Faune
                lizard.setVisible(false);
                heartContainer.setVisible(false);
                self.physics.world.removeCollider(fauneLizardCollider);
                if (faune2) {
                    self.physics.world.removeCollider(faune2LizardCollider);
                }
                // Reset the lizard and hitCount after 5 seconds
                self.time.delayedCall(5000, () => {
                    lizard.setVisible(true);
                    heartContainer.setVisible(true);
                    fauneLizardCollider = self.physics.add.collider(faune, lizard, handleLizardPlayerCollision, undefined, self);
                    if (faune2) {
                        faune2LizardCollider = self.physics.add.collider(faune2, lizard, handleLizardPlayerCollisionFaune2, undefined, self);
                    }
                    hitCount = 6; // Reset hitCount to its original value
                    hitText.setText(hitCount.toString());
                });
            }
            var data = {
                hitCount: hitCount
            };
            sendInfoGame(data);
        }
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
    const heartsArray = self.fauneHearts.getChildren();
    const heartIndex = health;
    if (heartIndex >= 0 && heartIndex < heartsArray.length) {
        heartsArray[heartIndex].setTexture('ui-heart-empty');
    }

    if (health <= 0) {
        faune.anims.play('faune-faint');
        faune.setVelocity(0, 0);
        // Remove collision between faune and lizard
        self.physics.world.removeCollider(fauneLizardCollider);
        var data = {
            dead: "dead"
        }
        sendInfoGame(data)
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
    const heartsArray = self.faune2Hearts.getChildren();
    const heartIndex = health;
    if (heartIndex >= 0 && heartIndex < heartsArray.length) {
        heartsArray[heartIndex].setTexture('ui-heart-empty');
    }

    if (health <= 0) {
        faune2.anims.play('faune-faint');
        faune2.setVelocity(0, 0);
        // Remove collision between faune2 and lizard
        self.physics.world.removeCollider(faune2LizardCollider);
        var data = {
            dead2: "dead"
        }
        sendInfoGame(data)
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
    const heartsArray = ownerDelLobby ? self.fauneHearts.getChildren() : self.faune2Hearts.getChildren();

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
    const EKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    let character = ownerDelLobby ? faune : faune2;

    if (health >= 0) {
        const heartIndex = health;
        if (heartIndex >= 0 && heartIndex < heartsArray.length) {
            heartsArray[heartIndex].setTexture('ui-heart-empty');
        }

        // Send hearts information
        const heartsData = heartsArray.map(heart => heart.texture.key === 'ui-heart-full');
        var currentPosition = { x: character.x, y: character.y }; // Usar 'character' en lugar de 'faune'

        const data = {
            faune: ownerDelLobby ? { x: currentPosition.x, y: currentPosition.y, hearts: heartsData, text: textOwner._text } : null,
            faune2: !ownerDelLobby ? { x: currentPosition.x, y: currentPosition.y, hearts: heartsData, text: textNotOwner._text } : null,
            direction: direction,
            animation: character.anims.currentAnim.key,
            scaleX: character.scaleX,
        };
        sendInfoGame(data);
    }
    if (interactingChest) {
        if (Phaser.Input.Keyboard.JustDown(EKey) && interactingChest.anims.currentAnim.key == "chest-closed") {
            interactingChest.anims.play('chest-open');
            if (interactingChest.anims.currentAnim.key == "chest-open") {
                if (ownerDelLobby) {
                    chestsOpenedOwner++;
                }
                if (!ownerDelLobby) {
                    chestsOpenedNotOwner++;
                }
                const coinsToAdd = Math.floor(Math.random() * 151) + 50; // Generate a random number between 50 and 200 (inclusive)
                // Add the coins to the owner's lobby
                coins += coinsToAdd;
                var data = {
                    chestOwner: ownerDelLobby ? { chestsOpenedOwner } : null,
                    chestNotOwner: !ownerDelLobby ? { chestsOpenedNotOwner } : null,
                    coins: coins
                }
                sendInfoGame(data)
            }
            interactingChest = null; // Reset the interactingChest variable
        }
    }
    if (health > 0) {
        if (!this.knives) {
            return;
        }
        if (ownerDelLobby) {
            textOwner.setText(`Cofres: ${chestsOpenedOwner} / ${chestCount}`);
            if (space.isDown && !spaceDown && (self.time.now - lastShotTime) > 1000) {
                spaceDown = true;
                lastShotTime = self.time.now; // Update the last shot time

                const parts = faune.anims.currentAnim.key.split('-');
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
                        if (faune.scaleX < 0) {
                            vec.x = -1;
                        } else {
                            vec.x = 1;
                        }
                        break;
                }
                const angle = vec.angle();
                const knife = self.knives.get(faune.x, faune.y, 'knife');

                knife.setActive(true);
                knife.setVisible(true);

                knife.setRotation(angle);
                knife.x += vec.x * 16;
                knife.y += vec.y * 16;

                self.physics.velocityFromRotation(angle, 300, knife.body.velocity);
                var knifee = {
                    knifee: knife
                }
                sendInfoGame(knifee)
            } else if (!space.isDown) {
                spaceDown = false;
            }
        }

        if (!ownerDelLobby) {
            textNotOwner.setText(`Cofres: ${chestsOpenedNotOwner} / ${chestCount}`);
            if (space.isDown && !spaceDown && (self.time.now - lastShotTime) > 1000) {
                spaceDown = true;
                lastShotTime = self.time.now; // Update the last shot time

                const parts = faune2.anims.currentAnim.key.split('-');
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
                        if (faune2.scaleX < 0) {
                            vec.x = -1;
                        } else {
                            vec.x = 1;
                        }
                        break;
                }
                const angle = vec.angle();
                const knife = self.knives.get(faune2.x, faune2.y, 'knife');

                knife.setActive(true);
                knife.setVisible(true);

                knife.setRotation(angle);
                knife.x += vec.x * 16;
                knife.y += vec.y * 16;

                self.physics.velocityFromRotation(angle, 300, knife.body.velocity);
                var knifee2 = {
                    knifee2: knife
                }
                sendInfoGame(knifee2)
            } else if (!space.isDown) {
                spaceDown = false;
            }
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
    heartContainer.x = lizard.x;
    heartContainer.y = lizard.y - 20;
}

function recibirInfoFromPlatform(data) {
    const centerX = self.cameras.main.width / 2;
    const centerY = self.cameras.main.height / 2.5;

    if (data.infoGame.dead || data.infoGame.dead2) {
        if (data.infoGame.dead == "dead" || data.infoGame.dead2 == "dead") {
            self.time.addEvent({
                delay: 500,
                callback: () => {
                    self.scene.pause();
                    textDead = self.add.text(centerX, centerY, 'GAME OVER', { font: '40px Arial', fill: '#ffffff' });
                    textDead.setOrigin(0.5, 0);
                    textDead.setScrollFactor(0);
                    textDead.setDepth(1);
                },
            });
        }
    }

    if (data.infoGame.chestOwner) {
        sumaCofres = data.infoGame.chestOwner.chestsOpenedOwner
    }

    if (data.infoGame.chestNotOwner) {
        sumaCofres2 = data.infoGame.chestNotOwner.chestsOpenedNotOwner
    }

    if (sumaCofres == 3 && sumaCofres2 == 3) {
        self.time.addEvent({
            delay: 500,
            callback: () => {
                self.scene.pause();
                textDead = self.add.text(centerX, centerY, 'NIVEL COMPLETADO', { font: '40px Arial', fill: '#ffffff' });
                textDead.setOrigin(0.5, 0);
                textDead.setScrollFactor(0);
                textDead.setDepth(1);
            },
        });
    }

    if (!ownerDelLobby && data.infoGame.faune) {
        if (data.infoGame.faune.text) {
            textOwner.setText(data.infoGame.faune.text);
        }
        if (!faune && self) {
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
        const heartsArray = self.fauneHearts.getChildren();
        const heartsData = data.infoGame.faune.hearts;
        if (heartsData) {
            heartsArray.forEach((heart, index) => {
                if (heartsData[index]) {
                    heart.setTexture('ui-heart-full');
                } else {
                    heart.setTexture('ui-heart-empty');

                }
            });
        }
    }

    if (ownerDelLobby && data.infoGame.faune2) {
        if (data.infoGame.faune2.text) {
            textNotOwner.setText(data.infoGame.faune2.text);
        }
        if (!faune2 && self) {
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
        const heartsArray = self.faune2Hearts.getChildren();
        const heartsData = data.infoGame.faune2.hearts;
        if (heartsData) {
            heartsArray.forEach((heart, index) => {
                if (heartsData[index]) {
                    heart.setTexture('ui-heart-full');
                } else {
                    heart.setTexture('ui-heart-empty');
                }
            });
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

    if (!ownerDelLobby && data.infoGame.knifee) {
        const knifeData = data.infoGame.knifee;
        const knife = self.knives.get(knifeData.x, knifeData.y, 'knife');

        knife.setActive(true);
        knife.setVisible(true);

        knife.setRotation(knifeData.rotation);
        knife.x = knifeData.x;
        knife.y = knifeData.y;

        self.physics.velocityFromRotation(knifeData.rotation, 300, knife.body.velocity);
    }

    if (ownerDelLobby && data.infoGame.knifee2) {
        const knifeData = data.infoGame.knifee2;
        const knife = self.knives.get(knifeData.x, knifeData.y, 'knife');

        knife.setActive(true);
        knife.setVisible(true);

        knife.setRotation(knifeData.rotation);
        knife.x = knifeData.x;
        knife.y = knifeData.y;

        self.physics.velocityFromRotation(knifeData.rotation, 300, knife.body.velocity);
    }

    if (data.infoGame.coins) {
        totalCoins += data.infoGame.coins;
        textCoins.setText(totalCoins);
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