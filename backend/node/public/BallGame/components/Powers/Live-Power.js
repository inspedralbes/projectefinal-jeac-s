// import { Power } from './Power.js';

var Power = null;
async function imports() {

  await Promise.all([
    import('../../../BallGame/components/pOWERS/Power.js'),
  ])
    .then(([power]) => {
      // Save the imported modules to variables
      Power = power;
      console.trace("Pahse", Power);
    
    })
    .catch((error) => {
      console.log('Error importing modules:', error);
    });

}

  async function init () {
    await imports();
  }
  
  await init();

export class LivePower extends Power.Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, 'bluediamond');
  }

  givePower() {
    this.relatedScene.increaseLives();
  }
}