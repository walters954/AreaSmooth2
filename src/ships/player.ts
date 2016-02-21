import {GameObject, Scene, Input, MathEx, KeyCode} from '../lib/engine';

import {Ship} from './ship';
import {Enemy} from './enemy';
export class Player extends Ship {
  public type = 'Player';
  public shootSound = new Audio();

  public summonEnemyAtThree = true;
  public collided = 0;

  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.shootSound.src = 'sounds/laser.wav';
    this.gunDamage = 100;
    this.lives = 3
    this.gunReloadTime = 1;
  }
  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);

    //Keyboard
    var l = input.getKey(KeyCode.ArrowLeft);
    var r = input.getKey(KeyCode.ArrowRight);
    var u = input.getKey(KeyCode.ArrowUp);
    var d = input.getKey(KeyCode.ArrowDown);

    this.nextRotation = MathEx.keyboardAngle(u, l, d, r);

    this.moving = (u || l || d || r);
    this.shooting = input.getKey(KeyCode.Space);


    if ( this.killCount % 3 == 0 && this.summonEnemyAtThree && this.killCount != 0)
    {
      for (var i = 0; i < 3; i++)
        scene.add(new Enemy(1, {
          x: Math.floor(Math.random() * scene.width),
          y: Math.floor(Math.random() * scene.height)
        }));
        this.summonEnemyAtThree = false;
    };

    // Check collisions with enemies
    scene.findObjectOfType('Enemy').map(
      (enemy: Enemy) => {
        if (!this.collided && this.isColliding(enemy)) {
          this.hp -= 10;
          enemy.hp -= 5;
          this.collided = 150;
        }
        else if(this.collided)
        {
          this.collided--;
        }
      }
    );

    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
  }
}
