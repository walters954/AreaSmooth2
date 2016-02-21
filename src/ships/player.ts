import {GameObject, Scene, Input, MathEx, KeyCode} from '../lib/engine';

import {Ship} from './ship';
import {Enemy} from './enemy';
import {Timer} from '../lib/time/timer';
export class Player extends Ship {
  public type = 'Player';
  public shootSound = new Audio();
  // Holds logic for collision timer
  public collisionGracePeriod = 2;
  public collisionTimer = new Timer();

  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.shootSound.src = 'sounds/laser.wav';
    this.gunDamage = 10;
    this.lives = 3
    this.gunReloadTime = 1;
    // Starts collision timer at 0 for initial hit once ship is created
    this.collisionTimer.addTimer('collide', this.collisionGracePeriod);
  }

  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);
    this.collisionTimer.update(deltaTime);

    //Keyboard
    var l = input.getKey(KeyCode.ArrowLeft);
    var r = input.getKey(KeyCode.ArrowRight);
    var u = input.getKey(KeyCode.ArrowUp);
    var d = input.getKey(KeyCode.ArrowDown);

    this.nextRotation = MathEx.keyboardAngle(u, l, d, r);

    this.moving = (u || l || d || r);
    this.shooting = input.getKey(KeyCode.Space);

    // Check collisions with enemies
    scene.findObjectOfType('Enemy').map(
      (enemy: Enemy) => {
        if (this.collisionTimer.done('collide') && this.isColliding(enemy)) {
          this.hp -= 10;
          enemy.hp -= 5;
          this.collisionTimer.reset('collide');
          //this.collided = 150;
        }
        //else if(this.collided)
        //{
        //  this.collided--;
        //}
      }
    );

    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
  }
}
