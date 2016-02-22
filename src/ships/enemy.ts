import {GameObject, Scene, Input, MathEx} from '../lib/engine';

import {Ship} from './ship';
import {Player} from './player';



export class Enemy extends Ship {
  public type = 'Enemy';
  public isFrozen = false;
  public tempContext;
  public rndColor;
  constructor(public team = 0, public position: { x: number, y: number }, increaseLevelDmg) {
    super(team, position);
    // Adjust Stats
    this.hp = 10 + increaseLevelDmg;
    this.spdMax = 128;
    this.gunReloadTime = 0.5;
    this.gunDamage = 1 + increaseLevelDmg; //default 1

    // Add AI Reaction timer
    this.timer.addTimer('react');

    // Controls
    this.moving = true;
    this.shooting = true;
    //ww
    this.tempContext = document.createElement('canvas').getContext('2d');
    this.tempContext.canvas.width = 64;
    this.tempContext.canvas.height = 64;
  }
  update(scene: Scene, i, deltaTime: number) {
    super.update(scene, i, deltaTime);
    var player: Player = scene.findObjectOfType('Player')[0];

    if (player && this.timer.done('react')) {
      this.timer.set('react', Math.random());
      //ww 0.1 is the reaction time of the enemy
      this.nextRotation = (Math.random() > 0.1) ? this.nextRotation : MathEx.getAngleTwoPoints(this.position.x, this.position.y, player.position.x, player.position.y);
    }
    if (this.isDestoryed == true)
    {
      player.killCount ++;
    }
  }

  render(context: CanvasRenderingContext2D) {
    this.time = (this.time + 1) % 360;
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(-this.rotation * (Math.PI / 180));
    this.tempContext.globalCompositeOperation = 'source-over';
    this.tempContext.clearRect(0,0,64,64);
    this.tempContext.drawImage(this.sprite, 64, 0, 64, 64, 0, 0, 64, 64);
    this.tempContext.globalCompositeOperation = 'source-in';
    this.tempContext.fillStyle = this.rndColor;
    this.tempContext.fillRect(0,0, 64, 64);
    context.drawImage(this.tempContext.canvas, 0,0, 64, 64, -32, -32, 64, 64); //another day figure out why context works at 0 instead of 64
    context.restore();
  }


}
