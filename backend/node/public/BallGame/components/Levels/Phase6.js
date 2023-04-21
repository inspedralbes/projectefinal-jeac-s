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

export class Phase6 extends Phase {

  create() {
    this.bricks = this.relatedScene.physics.add.staticGroup({
      key: ['whitebrick', 'blackbrick', 'whitebrick', 'blackbrick', 'whitebrick'],
      frameQuantity: 10,
      gridAlign: {
        width: 10,
        height: 5,
        cellWidth: 67,
        cellHeight: 34,
        x: 105,
        y: 70
      }
    });

    this.bricks.getChildren().forEach( (element, index) => {
      if ((index >= 10 && index < 20) || (index >= 30 && index < 40)) {
        index++;
      }
      if(((index+1) % 2) == 0) {
        element.disableBody(true, true);
      }
    });

    //this.configureColisions();

  }
}