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

  var adder = level;

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

  // Past level 5 you need to spawn mini healthpacks
  scene.add(new Healthpack({
    x: Math.floor(Math.random() * scene.width),
    y: Math.floor(Math.random() * scene.height)
  }, 5));


  // Even levels are enemies, odd levels are bosses.
  //WW
  if (level % 2 == 0) {
    for (var i = 0; i < Math.floor((Math.random() * 7) + 3); i++)
    {
      var aNewEnemy = new Enemy(1, {
        x: Math.floor(Math.random() * scene.width),
        y: Math.floor(Math.random() * scene.height)
      }, adder);

      scene.add(aNewEnemy);
    }

  }
  else {
    scene.add(new Boss({
      x: Math.floor(Math.random() * scene.width),
      y: Math.floor(Math.random() * scene.height)
    }, adder));
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
