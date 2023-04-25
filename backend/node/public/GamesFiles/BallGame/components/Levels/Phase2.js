// import { Phase } from './Phase.js'

// var Phase = null;
// import('../../../BallGame/components/Levels/Phase.js')
//   .then((module) => {
//     // use the imported module here
//     Phase = module;
//     console.log(Phase);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

let Phase = null;

async function imports() {

  await Promise.all([
    import('../../../BallGame/components/Levels/Phase.js'),
  ])
    .then(([phase]) => {
      // Save the imported modules to variables
      Phase = phase;
      console.trace("Pahse", Phase);
    
    })
    .catch((error) => {
      console.log('Error importing modules:', error);
    });

}

  async function init () {
    await imports();
  }
  
  await init();

export class Phase2 extends Phase.Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup();

    this.bricks.create(400, 270, 'orangebrick');
    this.bricks.create(360, 225, 'orangebrick');
    this.bricks.create(440, 225, 'orangebrick');
    this.bricks.create(480, 180, 'orangebrick');
    this.bricks.create(400, 180, 'orangebrick');
    this.bricks.create(320, 180, 'orangebrick');
    this.bricks.create(280, 135, 'orangebrick');
    this.bricks.create(360, 135, 'orangebrick');
    this.bricks.create(440, 135, 'orangebrick');
    this.bricks.create(520, 135, 'orangebrick');
    this.bricks.create(330, 90, 'orangebrick');
    this.bricks.create(470, 90, 'orangebrick');

    this.configureColisions();
  }
}