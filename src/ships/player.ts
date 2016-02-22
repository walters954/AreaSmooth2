import {GameObject, Scene, Input, MathEx, KeyCode} from '../lib/engine';

import {Ship} from './ship';
import {Enemy} from './enemy';
import {Portal} from '../misc/portal';
import {Timer} from '../lib/time/timer';
import {Healthpack} from "../misc/healthpack";

export class Player extends Ship {
  public type = 'Player';
  public shootSound = new Audio();

  public summonEnemyAtThree = true;

  // Extra timer variables
  public collisionGracePeriod = 2;
  public healthpackSpawnPeriod = 300;
  public healthpackDestroyPeriod = 30;
  public freezeEnemyRespond = 60;
  public spawnPortalTic = 30;
  public goThere = true;



  public keepEnemySpawning = true;

  // Healthpack to be used by player
  public healthpack;

  //public collisionTimer = new Timer();
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    this.shootSound.src = 'sounds/laser.wav';
    this.gunDamage = 1; //ww default needs to be 1
    this.lives = 3
    this.gunReloadTime = 1;
    this.killCount = 150; //ww for testing



    // Starts collision timer at 0 for initial hit once ship is created
    this.timer.addTimer('collide', this.collisionGracePeriod);

    // Starts timer for healthpack for 5 minutes
    this.timer.addTimer('spawnHealthpack', this.healthpackSpawnPeriod);

    // Starts timer for destroying healthpack
    this.timer.addTimer('destroyHealthPack', this.healthpackDestroyPeriod);


  }



  update(scene: Scene, input: Input, deltaTime:number) {
    super.update(scene, input, deltaTime);
    this.timer.update(deltaTime);

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
      this.killCount != 150 && this.killCount != 0  && scene.current() < 5)
    {
      for (var i = 0; i < Math.floor((Math.random() * 4) + 3); i++)
      {
        var regEnemy = new Enemy(1, {
          x: Math.floor(Math.random() * scene.width),
          y: Math.floor(Math.random() * scene.height)
        }, scene.current())
        regEnemy.rndColor = scene.randomColor
        scene.add(regEnemy);
          this.summonEnemyAtThree = false;
      }

    }
    var enemyCount = 0;

 scene.array.map((o) =>
 {
   if(o.type == 'Enemy')
     enemyCount++;
 })
if (this.keepEnemySpawning && scene.current() > 4)
{


  if(scene.current()  == 5)
  {
    this.timer.addTimer('createPortalTimer', 60);
    this.timer.addTimer('spawnPortalTimer', 30);
    this.keepEnemySpawning = false;
  }
  else if(scene.current()  == 6)
  {
    this.timer.addTimer('createPortalTimer', 50);
    this.timer.addTimer('spawnPortalTimer', 20);
    this.keepEnemySpawning = false;
  }
  else if(scene.current()  == 7)
  {
    this.timer.addTimer('createPortalTimer', 50);
    this.timer.addTimer('spawnPortalTimer', 20);
    this.keepEnemySpawning = false;
  }
  else if(scene.current()  == 8)
  {
    this.timer.addTimer('createPortalTimer', 40);
    this.timer.addTimer('spawnPortalTimer', 10);
    this.keepEnemySpawning = false;
  }
  else if(scene.current()  == 9)
  {
    this.timer.addTimer('createPortalTimer', 40);
    this.timer.addTimer('spawnPortalTimer', 10);
    this.keepEnemySpawning = false;
  }
}


    if (scene.current() > 4 && enemyCount < scene.current())
    {
      //fix protal next to keepEnemySpawning = true instead of the time

      if(scene.current()  == 5)
      {
        this.checkTimeDone(scene)
      }
      else if(scene.current()  == 6)
      {
        this.checkTimeDone(scene)
      }
      else if(scene.current()  == 7)
      {
        this.checkTimeDone(scene)
      }
      else if(scene.current()  == 8)
      {
        this.checkTimeDone(scene)
      }
      else if(scene.current()  == 9)
      {
        this.checkTimeDone(scene)
      }
    }

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
        if (this.timer.done('collide') && this.isColliding(enemy) && enemy.isFrozen == true) {
          this.hp -= 10;
          enemy.hp -= 5;
          this.timer.reset('collide');
        }
        else if (this.timer.done('collide') && this.isColliding(enemy) ){
          this.hp -= 10;
          enemy.hp -= 5;
          this.timer.reset('collide');
        }
      }
    );



    // Spawns a healthpack every 5 minutes and destroys it
    // Add a Healthpack
    if(this.timer.done('spawnHealthpack'))
    {
      this.healthpack = new Healthpack({
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
        })
      scene.add(this.healthpack);
      this.timer.reset('spawnHealthpack');
      this.timer.reset('destroyHealthPack');
    }

    // Destroys a healthpack once it spawns after about 30 seconds
    if(this.timer.done('destroyHealthPack'))
    {
      scene.destroy(this.healthpack);
    }



    //Sync Viewport with Screen
    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
  }

  summonFrozenEnemy(scene : Scene)
  {
      var enemyFreeze = new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }, scene.current());
      enemyFreeze.moving = false;
      enemyFreeze.shooting = false;
      enemyFreeze.isFrozen = true;
      enemyFreeze.rndColor = scene.randomColor
      scene.add(enemyFreeze);
    }
  createPortal(scene : Scene)
  {
    scene.add(new Portal({
      x: Math.floor(Math.random() * scene.width),
      y: Math.floor(Math.random() * scene.height)
    }));
  }

  checkTimeDone(scene : Scene)
  {
    if(!this.timer.done('spawnPortalTimer') && this.goThere)
    {
      this.summonFrozenEnemy(scene);
      this.goThere = false
    }

    if(this.timer.done('createPortalTimer') && !this.keepEnemySpawning)
    {
      this.createPortal(scene);
      this.keepEnemySpawning = true;
    }
  }


}
