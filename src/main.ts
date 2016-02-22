// Game Engine
import {Renderer, SceneManager, Scene} from './lib/engine';

// Game Specific Stuff
import {Background} from './menu/background';
import {Menu} from './menu/menu';
import {Victory} from './menu/victory';
import {GUI} from './menu/gui';


import {Player} from './ships/player';
import {Enemy} from './ships/enemy';
import {Boss} from './ships/boss';
import {Healthpack} from './misc/healthpack';
import {Portal} from './misc/portal';

var renderer, sceneManager;

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

  // Add a Healthpack
  //scene.add(new Healthpack({
  //  x: Math.floor(Math.random() * scene.width),
  //  y: Math.floor(Math.random() * scene.height)
  //}));


  // Even levels are enemies, odd levels are bosses.
  //WW
  if (level % 2 == 0 && level < 4) {
    for (var i = 0; i < Math.floor((Math.random() * 7) + 3); i++)
      scene.add(new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }));
  }
  else if (level > 3 && level < 9)
  {
    for (var i = 0; i < level + 1; i++)
    {
      var enemyFreeze = new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      });
      enemyFreeze.moving = false;
      enemyFreeze.shooting = false;
      enemyFreeze.isFrozen = true;
      scene.add(enemyFreeze);
    }
  }
    else {
    scene.add(new Boss({
      x: Math.floor(Math.random() * scene.width),
      y: Math.floor(Math.random() * scene.height)
    }));
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
