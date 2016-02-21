import {GameObject, Scene, Easing, Input} from '../lib/engine';

export class Victory extends GameObject {
  private scene: Scene;
  public backImage: HTMLImageElement;
  constructor() {
    super();
    this.backImage = new Image();
    this.backImage.src = 'sprites/gameover.png';
  }
  update(scene: Scene) {
    this.scene = scene;
  }
  render(ctx: CanvasRenderingContext2D) {


    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(0, 0, 800, 800);
    ctx.drawImage(this.backImage, 250, 250);
    ctx.fillStyle = "#ffffff";
    ctx.font = "50px 'PixelFont'";
    ctx.textAlign = "center";
    ctx.fillText("You Won", 350, 500 + 64, 128);

  }
}
