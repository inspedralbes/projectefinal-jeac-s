// import { Phase } from './Phase.js'
// import { Diamonds } from "../Diamonds.js";
// import { LivePower } from '../Powers/Live-Power.js';
// import { LargePlatformPower } from '../Powers/LargePlatform-Power.js';
// import { GluePower } from '../Powers/GluePower.js';

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

// var LargePlatformPower = null;
// import('../Powers/LargePlatform-Power.js')
//   .then((module) => {
//     // use the imported module here
//     LargePlatformPower = module;
//     console.log(LargePlatformPower);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var GluePower = null;
// import('../../../BallGame/components/Powers/GluePower.js')
//   .then((module) => {
//     // use the imported module here
//     GluePower = module;
//     console.log(GluePower);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });


let Phase = null;
let Diamonds = null;

let LivePower = null;
let GluePower = null;
let LargePlatformPower = null;

async function imports() {

  await Promise.all([
    import('../../../BallGame/components/Levels/Phase.js'),
    import('../../../BallGame/components/Diamonds.js'),
    import('../../../BallGame/components/Powers/Live-Power.js'),
    import('../../../BallGame/components/Powers/GluePower.js'),
    import('../../../BallGame/components/Powers/LargePlatform-Power.js')
  ])
    .then(([phase, diamonds, livePower, gluePower, largePlatformPower]) => {
      // Save the imported modules to variables
      Phase = phase;
      Diamonds = diamonds;
      LivePower = livePower;
      GluePower = gluePower;
      LargePlatformPower = largePlatformPower
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


export class Phase4 extends Phase.Phase {
  
  create() {
    console.log("LargePlatformPower", LargePlatformPower);
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['bluebrick', 'orangebrick', 'greenbrick', 'yellowbrick'],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 4,
        cellWidth: 67,
        cellHeight: 34,
        x: 95,
        y: 100
      }
    });

    this.configureColisions();
    
    this.diamonds = new Diamonds.Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower.LivePower(this.relatedScene, this.diamonds);
    this.powers[35] = new LivePower.LivePower(this.relatedScene, this.diamonds);
    this.powers[1] = new LargePlatformPower.LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[24] = new LargePlatformPower.LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[16] = new GluePower.GluePower(this.relatedScene, this.diamonds);
    this.powers[29] = new GluePower.GluePower(this.relatedScene, this.diamonds);


  }
}