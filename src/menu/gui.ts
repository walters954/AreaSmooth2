import {GameObject, Scene} from '../lib/engine';
import {SceneManager} from '../lib/core/scenemanager';

export class GUI extends GameObject {
  public myString;
  private player;
  private viewport;
  constructor() {
    super();
  }

  update(scene: Scene, input, deltaTime) {
    this.viewport = scene.viewport;
    this.player = scene.findObjectOfType('Player')[0];
    if (this.player)
      this.myString = "HP: " + this.player.hp + " Kill Count: "
      + this.player.killCount + " Score: " + this.player.killScore +" Level: " +scene.current()
      ;



  }
  render(context: CanvasRenderingContext2D) {
    context.fillStyle = "#ffffff";
    context.font = '16px PixelFont';
    if (this.viewport) {
      context.fillText(this.myString,  16, 16);
      //context.fillText(..)
    }
  }
}
