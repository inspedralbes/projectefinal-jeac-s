// import { Phase1 } from './Phase1'
// import { Phase2 } from './Phase2.js'
// import { Phase3 } from './Phase3.js'
// import { Phase4 } from './Phase4.js'
// import { Phase5 } from './Phase5.js'
// import { Phase6 } from './Phase6.js'

let Phase1 = null;
let Phase2 = null;

let Phase3 = null;

let Phase4 = null;
let Phase5 = null;
let Phase6 = null;


async function imports() {

  await Promise.all([
    import('../../../BallGame/components/Levels/Phase1.js'),
    import('../../../BallGame/components/Levels/Phase2.js'),
    import('../../../BallGame/components/Levels/Phase3.js'),
    import('../../../BallGame/components/Levels/Phase4.js'),
    import('../../../BallGame/components/Levels/Phase5.js'),
    import('../../../BallGame/components/Levels/Phase6.js')
  ])
    .then(([phase1, phase2, phase3, phase4, phase5, phase6]) => {
      // Save the imported modules to variables
       Phase1 = phase1;
       Phase2 = phase2;
       Phase3 = phase3;
       Phase4 = phase4;
       Phase5 = phase5;
       Phase6 = phase6;
       console.log("Phase6", Phase6.Phase6);
  
    })
    .catch((error) => {
      console.log('Error importing modules:', error);
    });

}

// var Phase1 = null;
// import('../../../BallGame/components/Levels/Phase1.js')
//   .then((module) => {
//     // use the imported module here
//     Phase1 = module;
//     console.log(Phase1);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var Phase2 = null;
// import('../../../BallGame/components/Levels/Phase2.js')
//   .then((module) => {
//     // use the imported module here
//     Phase2 = module;
//     console.log(Phase2);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var Phase3 = null;
// import('../../../BallGame/components/Levels/Phase3.js')
//   .then((module) => {
//     // use the imported module here
//     Phase3 = module;
//     console.log(Phase3);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var Phase4 = null;
// import('../../../BallGame/components/Levels/Phase4.js')
//   .then((module) => {
//     // use the imported module here
//     Phase4 = module;
//     console.log(Phase4);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var Phase5 = null;
// import('../../../BallGame/components/Levels/Phase5.js')
//   .then((module) => {
//     // use the imported module here
//     Phase5 = module;
//     console.log(Phase5);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

// var Phase6 = null;
// import('../../../BallGame/components/Levels/Phase6.js')
//   .then((module) => {
//     // use the imported module here
//     Phase6 = module;
//     console.log(Phase6);
//   })
//   .catch((error) => {
//     console.log("Error en Game import", error);
//   });

export class PhaseConstructor {

  constructor(scene) {
    this.init(scene);
  }

  async init (scene) {
    await imports();

    this.relatedScene = scene;
    console.log( "this.relatedScene",  this.relatedScene);
    console.log( "Phase6",  Phase6);

    this.phases = [
      Phase6.Phase6,
      Phase5.Phase5,
      Phase4.Phase4,
      Phase3.Phase3,
      Phase2.Phase2,
      Phase1.Phase1,
    ];
  }


  create() {
    let CurrenPhaseClass = this.phases.pop();
    console.log(this.phases);
    console.log("CurrenPhaseClass", CurrenPhaseClass);
    this.currentPhase = new CurrenPhaseClass(this.relatedScene);
    return this.currentPhase.create();
  }

  nextLevel() {
    this.currentPhase.deleteFixedBricks();

    if (this.phases.length == 0) {
      this.relatedScene.endGame(true);
    } else {
      return this.create();
    }
  }

  isPhaseFinished() {
    return this.currentPhase.isPhaseFinished();
  }
}