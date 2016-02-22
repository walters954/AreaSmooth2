// Game Engine
import {Renderer, SceneManager, Scene} from './lib/engine';

// Game Specific Stuff
import {Background} from './menu/background';
import {Menu} from './menu/menu';
import {Victory} from './menu/victory';
import {GUI} from './menu/gui';
import {Keyboard, KeyCode} from './lib/input/keyboard';


import {Player} from './ships/player';
import {Enemy} from './ships/enemy';
import {Boss} from './ships/boss';
import {Healthpack} from './misc/healthpack';
import {Portal} from './misc/portal';
import {Timer} from './lib/time/timer';
import {Input} from './lib/input';

var renderer, sceneManager;
var pause = false;
//var input = new Input()

function start() {
  // Create Renderer
  renderer = new Renderer();
  var canvas: HTMLCanvasElement = renderer.canvas;
  document.getElementById('game').appendChild(canvas);
  canvas.focus();

  // Create SceneManager and Levels
  sceneManager = new SceneManager();

  sceneManager.add(createMainMenu());

  for (var i = 0; i < 11; i++){
    if (i == 10)
    {
      sceneManager.add(createVictory())
    }
    else
    {
      sceneManager.add(createScene(i));
    }
  }
}

// Edit this function to check which level you're in and make the game harder with it.
function createScene(level: number): Scene {
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
  scene.add(new Background());


  // You may want to DRY out this code.
  var player = new Player(0, {
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  });
  scene.add(player);

  scene.add(new GUI());

  // Even levels are enemies, odd levels are bosses.
  //WW

  if (level % 2 == 0 && level < 4) {


    for (var i = 0; i < Math.floor((Math.random() * 7) + 3); i++)
    {
      var regEnemy = new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }, level)
      regEnemy.rndColor = scene.randomColor

      scene.add(regEnemy);
    }

  }
  else if (level > 3 && level < 9)
  {
    for (var i = 0; i < level + 1; i++)
    {
      var enemyFreeze = new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }, level);
      enemyFreeze.moving = false;
      enemyFreeze.shooting = false;
      enemyFreeze.isFrozen = true;
      enemyFreeze.rndColor = scene.randomColor;

      scene.add(enemyFreeze);
    }
  }
    else {
      var boss = new Boss({
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }, level)
    scene.add(boss);
  }
  return scene;
}

function createMainMenu() {
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
    scene.add(new Background());
    scene.add(new Menu());
  return scene;
}

function createVictory()
{
  var scene = new Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
    scene.add(new Background());
    scene.add(new Victory());
  return scene;
}

function animate() {
  renderer.update(sceneManager.current());
  renderer.render(sceneManager.current());


requestAnimationFrame(animate);




}

start();
animate();
