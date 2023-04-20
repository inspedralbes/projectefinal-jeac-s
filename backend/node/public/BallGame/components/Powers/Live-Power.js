import { Power } from './Power.js';

export class LivePower extends Power {
  constructor(scene, diamonds) {
    super(scene, diamonds, 'bluediamond');
  }

  givePower() {
    this.relatedScene.increaseLives();
  }
}