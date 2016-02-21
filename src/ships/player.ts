import {GameObject, Scene, Input, MathEx, KeyCode} from '../lib/engine';

import {Ship} from './ship';
import {Enemy} from './enemy';
import {Portal} from '../misc/portal';
import {Timer} from '../lib/time/timer';

export class Player extends Ship {
  public type = 'Player';
  public shootSound = new Audio();

  public summonEnemyAtThree = true;

  // Holds logic for collision timer
  public collisionGracePeriod = 2;
  public collisionTimer = new Timer();
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.shootSound.src = 'sounds/laser.wav';
    this.gunDamage = 10; //ww default needs to be 1
    this.lives = 3
    this.gunReloadTime = 1;
    //this.killCount = 150; //ww for testing
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

//ww so you can summon 3 ships every time you kill 3
    if ( this.killCount % 3 == 0 && this.summonEnemyAtThree &&
      this.killCount != 150 && this.killCount != 0 )
    {
      for (var i = 0; i < Math.floor((Math.random() * 4) + 2); i++)
        scene.add(new Enemy(1, {
          x: Math.floor(Math.random() * scene.width),
          y: Math.floor(Math.random() * scene.height)
        }));
        this.summonEnemyAtThree = false;
    };

    //ww Add a Portal
    if (this.killCount == 150 && this.spawnPortal)
    {
      scene.add(new Portal({
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }));
      this.spawnPortal = false;
    }


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
