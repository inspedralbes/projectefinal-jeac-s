import { Phase1 } from './Phase1'
import { Phase2 } from './Phase2.js'
import { Phase3 } from './Phase3.js'
import { Phase4 } from './Phase4.js'
import { Phase5 } from './Phase5.js'
import { Phase6 } from './Phase6.js'

export class PhaseConstructor {
    constructor(scene) {
      this.relatedScene = scene;
      this.phases = [
        Phase6,
        Phase5,
        Phase4,
        Phase3,
        Phase2,
        Phase1,
      ];
    }
  
    create() {
      let CurrenPhaseClass = this.phases.pop();
      this.currentPhase = new CurrenPhaseClass(this.relatedScene);
      return this.currentPhase.create();
    }
  
    nextLevel() {
        this.currentPhase.deleteFixedBricks();

        if(this.phases.length == 0) {
            this.relatedScene.endGame(true);
        } else {
            return this.create();
        }
    }
  
    isPhaseFinished() {
      return this.currentPhase.isPhaseFinished();
    }
  }