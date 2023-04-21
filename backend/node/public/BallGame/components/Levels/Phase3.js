// import { Phase } from './Phase.js'

var Phase = null;
import('../../../BallGame/components/Levels/Phase.js')
  .then((module) => {
    // use the imported module here
    Phase = module;
    console.log(Phase);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

export class Phase3 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(110, 270, 'orangebrick');
    this.bricks.create(170, 225, 'bluebrick');
    this.bricks.create(230, 180, 'yellowbrick');
    this.bricks.create(290, 135, 'blackbrick');
    this.bricks.create(350, 90, 'greenbrick');

    this.bricks.create(680, 270, 'orangebrick');
    this.bricks.create(620, 225, 'bluebrick');
    this.bricks.create(560, 180, 'yellowbrick');
    this.bricks.create(500, 135, 'blackbrick');
    this.bricks.create(440, 90, 'greenbrick');

    this.configureColisions();

  }
}