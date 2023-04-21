// import { Phase } from './Phase.js'
// import { Diamonds } from "../Diamonds.js";
// import { LivePower } from '../Powers/Live-Power.js';
// import { LargePlatformPower } from '../Powers/LargePlatform-Power.js';
// import { GluePower } from '../Powers/GluePower.js';

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

  var Diamonds = null;
  import('../../../BallGame/components/Diamonds.js')
    .then((module) => {
      // use the imported module here
      Diamonds = module;
      console.log(Diamonds);
    })
    .catch((error) => {
      console.log("Error en Game import", error);
    });

var LivePower = null;
import('../../../BallGame/components/Powers/Live-Power.js')
  .then((module) => {
    // use the imported module here
    LivePower = module;
    console.log(LivePower);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

var LargePlatformPower = null;
import('../Powers/LargePlatform-Power.js')
  .then((module) => {
    // use the imported module here
    LargePlatformPower = module;
    console.log(LargePlatformPower);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

var GluePower = null;
import('../../../BallGame/components/Powers/GluePower.js')
  .then((module) => {
    // use the imported module here
    GluePower = module;
    console.log(GluePower);
  })
  .catch((error) => {
    console.log("Error en Game import", error);
  });

export class Phase4 extends Phase {

  create() {
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

    this.diamonds = new Diamonds(this.relatedScene);
    this.setBrickCollider(this.diamonds.diamonds);

    this.powers[3] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[35] = new LivePower(this.relatedScene, this.diamonds);
    this.powers[1] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[24] = new LargePlatformPower(this.relatedScene, this.diamonds);
    this.powers[16] = new GluePower(this.relatedScene, this.diamonds);
    this.powers[29] = new GluePower(this.relatedScene, this.diamonds);


  }
}