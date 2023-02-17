import { LiveCounter } from '../components/Live-counter.js';
import { PhaseConstructor } from '../components/Levels/Phase-Constructor.js';
import { Platform } from '../components/Platform.js';
import { Ball } from '../components/Ball.js';
import Phaser from "phaser";

// import { start } from '../../../script.js';
// import { endGame } from '../../../script.js';



const initialLives = 6;
const initialSpeedX = -60;

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }

    
    init() {
      this.phaseConstructor = new PhaseConstructor(this);
      this.score = 0;
      this.liveCounter = new LiveCounter(this, initialLives);
      this.ball = new Ball(this);
      this.platform = new Platform(this);
      this.glueRecordVelocityX = initialSpeedX; 

    }

    preload() {
      

      this.load.image('background', './images/background.png');
      this.load.image('gameover', './images/gameover.png');
      this.load.image('platform', '../images/platform.png');
      this.load.image('ball', '../images/ball.png');
      this.load.image('bluebrick', '../images/brickBlue.png');
      this.load.image('blackbrick', '../images/brickBlack.png');
      this.load.image('greenbrick', '../images/brickGreen.png');
      this.load.image('orangebrick', '../images/brickOrange.png');
      this.load.image('greybrick', '../images/brickGrey.png');
      this.load.image('whitebrick', '../images/brickWhite.png');
      this.load.image('yellowbrick', '../images/brickYellow.png');

      this.load.spritesheet('bluediamond',
      '../images/blue_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('reddiamond',
      '../images/red_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );
    this.load.spritesheet('greendiamond',
      '../images/green_diamond-sprites.png',
      { frameWidth: 48, frameHeight: 48 }
    );



      // this.load.audio('platformimpactsample', 'Games/BallGame/sounds/platform-impact.ogg');
      // this.load.audio('brickimpactsample', 'Games/BallGame/sounds/brick-impact.ogg');
      // this.load.audio('gameoversample', 'Games/BallGame/sounds/gameover.ogg');
      // this.load.audio('winsample', 'Games/BallGame/sounds/you_win.ogg');  
      // this.load.audio('startgamesample', 'Games/BallGame/sounds/start-game.ogg');
      // this.load.audio('livelostsample', 'Games/BallGame/sounds/live-lost.ogg');
      // this.load.audio('phasechange', 'Games/BallGame/sounds/phasechange.ogg');
      // this.load.audio('fixedbrickimpactsample', 'Games/BallGame/sounds/fixed-brick-impact.ogg');



    }

    create() {

      this.add.image(410, 250, 'background');
      
      this.physics.world.setBoundsCollision(true, true, true, false);


      this.liveCounter.create();

      this.platform.create();
      this.ball.create();

      this.physics.add.collider(this.ball.get(), this.platform.get(), this.platformImpact, null, this);
      //this.physics.add.collider(this.ball.get(), this.bricks, this.brickImpact, null, this);


      this.phaseConstructor.create();

      this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', { 
        fontSize: '20px',   
        fill: '#fff', 
        fontFamily: 'verdana, arial, sans-serif' 
      });
      
      // this.platformImpactSample = this.sound.add('platformimpactsample');
      // this.brickImpactSample = this.sound.add('brickimpactsample');
      // this.gameOverSample = this.sound.add('gameoversample');
      // this.winSample = this.sound.add('winsample');
      // this.startGameSample = this.sound.add('startgamesample');
      // this.liveLostSample = this.sound.add('livelostsample');
      // this.phaseChangeSample = this.sound.add('phasechange');
      // this.fixedBrickImpactSample = this.sound.add('fixedbrickimpactsample');

      // this.anims.create({
      //   key: 'greendiamondanimation',
      //   frames: this.anims.generateFrameNumbers('greendiamond', { start: 0, end: 7 }),
      //   frameRate: 10,
      //   repeat: -1,
      //   yoyo: true,
      // });


      this.createAnimations();

      
      // this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
      // this.platform.body.allowGravity = false;     
      // this.platform.setCollideWorldBounds(true);
      
      
      // this.ball = this.physics.add.image(385, 430, 'ball');
      // this.ball.setBounce(1);
      // this.ball.setCollideWorldBounds(true);
      // this.ball.setData('glue', true);
      
      
      
      
      this.cursors = this.input.keyboard.createCursorKeys();


      // this.miSprite = this.add.sprite(40, 40, 'greendiamond');
      // this.miSprite.anims.play('greendiamondanimation');
      // this.physics.add.collider(this.ball, this.miSprite);

      
 
      }
        
      update() {

        this.platform.updatePosition(this.ball, this.cursors);

        if (this.ball.isLost()) {
          let gameNotFinished = this.liveCounter.liveLost();
          if (!gameNotFinished) {
            // this.liveLostSample.play();
            this.platform.setInitialState(this.ball);
            this.platform.setInitialSize();
            this.platform.removeGlue();
            this.glueRecordVelocityX = initialSpeedX;
          }
        }

        if (this.cursors.up.isDown) {
          if (this.ball.isGlued) {
            // this.startGameSample.play();
            this.ball.throw(initialSpeedX);
          } else if(this.platform.isGluedBecausePower()) {
            this.ball.throw(this.glueRecordVelocityX);
            this.platform.hasBallGlued = false;
          }
        }

        //   if (this.cursors.left.isDown) {
        //     this.platform.setVelocityX(-500);
        //     if(this.ball.getData('glue')) {
        //       this.ball.setVelocityX(-500);
        //     }
        //   } 
        // else if (this.cursors.right.isDown) {
        //   this.platform.setVelocityX(500);
        //   if (this.ball.getData('glue')) {
        //     this.ball.setVelocityX(500);
        //   }
        // }
        // else {
        //   this.platform.setVelocityX(0);
        //   if (this.ball.getData('glue')) {
        //     this.ball.setVelocityX(0);
        //   }
        // }
    
        // if (this.ball.y > 500 && this.ball.active) {
        //   let gameNotFinished = this.liveCounter.liveLost();
        //   if (!gameNotFinished) {
        //     this.liveLostSample.play();
        //     this.setInitialPlatformState();
        //   }
        // }
  
        // if (this.cursors.up.isDown) {
        //   if (this.ball.getData('glue')) {
        //     this.startGameSample.play();

        //     this.ball.setVelocity(-60, -300);
        //     this.ball.setData('glue', false);
        //   }
        // }
    }


    platformImpact(ball, platform) {
      // this.platformImpactSample.play();
      this.increasePoints(-1);
      let relativeImpact = ball.x - platform.x;
      if(this.platform.hasGluePower()) {
        ball.setVelocityY(0);
        ball.setVelocityX(0);
        this.glueRecordVelocityX = this.calculateVelocity(relativeImpact);
        this.platform.hasBallGlued = true;
      } else {
        ball.setVelocityX(this.calculateVelocity(relativeImpact));
      }
    }

    calculateVelocity(relativeImpact) {
      if(relativeImpact > 50) {
        relativeImpact = 50;
      }
      if (relativeImpact > 0) {
        return (8 * relativeImpact);
      } else if (relativeImpact < 0) {
        return (8 * relativeImpact);
      } else {
        return (Phaser.Math.Between(-10, 10))
      }
    }

    brickImpact(ball, brick) {
      // this.brickImpactSample.play();
      brick.disableBody(true, true);  
      this.increasePoints(10);
      if (this.phaseConstructor.isPhaseFinished()) {
        // this.phaseChangeSample.play();
        this.phaseConstructor.nextLevel();
        this.platform.setInitialState(this.ball);
      }
    }

    fixedBrickImpact(ball, brick) {
      // this.fixedBrickImpactSample.play();
    }

    increasePoints(points) {
      this.score += points;
      this.scoreText.setText('PUNTOS: ' + this.score);
    }

    endGame(completed = false) {
      if(! completed) {
        // this.gameOverSample.play();
        this.scene.start('gameover');
      } else {
        // this.winSample.play();
        this.scene.start('congratulations');
      }
      //endGame(this.score);
    }

    createAnimations() {
      this.anims.create({
        key: 'bluediamondanimation',
        frames: this.anims.generateFrameNumbers('bluediamond', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
        yoyo: true,
      });
      this.anims.create({
        key: 'reddiamondanimation',
        frames: this.anims.generateFrameNumbers('reddiamond', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
        yoyo: true,
      });
      this.anims.create({
        key: 'greendiamondanimation',
        frames: this.anims.generateFrameNumbers('greendiamond', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1,
        yoyo: true,
      });
    }

  //   setInitialPlatformState() {
  //     this.liveLostSample.play();
  //     this.platform.x = 400;
  //     this.platform.y = 460;
  //     this.ball.setVelocity(0,0);
  //     this.ball.x = 385;
  //     this.ball.y = 430;
  //     this.ball.setData('glue', true);
  // }

  increaseLives() {
    this.liveCounter.increase();
  }

  setGluePower() {
    this.platform.setGluePower();
  }

  setPlatformBig() {
    this.platform.setBigSize();
  }

  removeGlueFromBall() {
    this.ball.removeGlue();
  }
  
} 