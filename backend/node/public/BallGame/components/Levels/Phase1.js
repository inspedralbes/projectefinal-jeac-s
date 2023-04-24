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

//   var Diamonds = null;
//   import('../../../BallGame/components/Diamonds.js')
//     .then((module) => {
//       // use the imported module here
//       Diamonds = module;
//       console.log(Diamonds);
//     })
//     .catch((error) => {
//       console.log("Error en Game import", error);
//     });

// var LivePower = null;
// import('../../../BallGame/components/Powers/Live-Power.js')
//   .then((module) => {
//     // use the imported module here
//     LivePower = module;
//     console.log(LivePower);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });
// import { Diamonds } from "../Diamonds.js";
// import { LivePower } from '../Powers/Live-Power.js';
// import { LargePlatformPower } from '../Powers/LargePlatform-Power.js';
// import { GluePower } from '../Powers/GluePower.js';

let Phase = null;
let Diamonds = null;

let LivePower = null;

async function imports() {

  await Promise.all([
    import('../../../BallGame/components/Levels/Phase.js'),
    import('../../../BallGame/components/Diamonds.js'),
    import('../../../BallGame/components/Powers/Live-Power.js'),
  ])
    .then(([phase, diamonds, livePower]) => {
      // Save the imported modules to variables
      Phase = phase;
      Diamonds = diamonds;
      LivePower = livePower;
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

console.log(Phase);
export class Phase1 extends Phase.Phase {

  create() {
    //this.init();
    console.log("Phase1 created");

    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'blackbrick', 'yellowbrick', 'blackbrick', 'yellowbrick', 'bluebrick', 'orangebrick', 'greenbrick'],
      frameQuantity: 1,
      gridAlign: {
        width: 5,
        height: 4,
        cellWidth: 150,
        cellHeight: 100,
        x: 135,
        y: 150
      }
    });

    this.fixedBricks = this.relatedScene.physics.add.staticGroup();
    this.fixedBricks.create(316, 165, 'greybrick');
    this.fixedBricks.create(466, 165, 'greybrick');

    this.configureColisions();
    this.configureColisionsFixed();

    this.diamonds = new Diamonds.Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower.LivePower(this.relatedScene, this.diamonds);
  }
}