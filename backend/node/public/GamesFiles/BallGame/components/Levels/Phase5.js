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

var Phase = null;
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

export class Phase5 extends Phase.Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['bluebrick'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 290,
        y: 150
      }
    });

    this.fixedBricks = this.relatedScene.physics.add.staticGroup({
      key: ['greybrick'],
      frameQuantity: 4,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 290,
        y: 190
      }
    });

    this.configureColisions();
    this.configureColisionsFixed();


  }
}