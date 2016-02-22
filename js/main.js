System.register(['./lib/engine', './menu/background', './menu/menu', './menu/victory', './menu/gui', './ships/player', './ships/enemy', './ships/boss'], function(exports_1) {
    "use strict";
    var engine_1, background_1, menu_1, victory_1, gui_1, player_1, enemy_1, boss_1;
    var renderer, sceneManager;
    function start() {
        // Create Renderer
        renderer = new engine_1.Renderer();
        var canvas = renderer.canvas;
        document.getElementById('game').appendChild(canvas);
        canvas.focus();
        // Create SceneManager and Levels
        sceneManager = new engine_1.SceneManager();
        sceneManager.add(createMainMenu());
        for (var i = 0; i < 11; i++) {
            if (i == 10) {
                sceneManager.add(createVictory());
            }
            else {
                sceneManager.add(createScene(i));
            }
        }
    }
    // Edit this function to check which level you're in and make the game harder with it.
    function createScene(level) {
        var scene = new engine_1.Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
        scene.add(new background_1.Background());
        // You may want to DRY out this code.
        var player = new player_1.Player(0, {
            x: Math.floor(Math.random() * scene.width),
            y: Math.floor(Math.random() * scene.height)
        });
        scene.add(player);
        scene.add(new gui_1.GUI());
        // Add a Healthpack
        //scene.add(new Healthpack({
        //  x: Math.floor(Math.random() * scene.width),
        //  y: Math.floor(Math.random() * scene.height)
        //}));
        // Even levels are enemies, odd levels are bosses.
        //WW
        if (level % 2 == 0 && level < 4) {
            for (var i = 0; i < Math.floor((Math.random() * 7) + 3); i++)
                scene.add(new enemy_1.Enemy(1, {
                    x: Math.floor(Math.random() * scene.width),
                    y: Math.floor(Math.random() * scene.height)
                }));
        }
        else if (level > 3 && level < 9) {
            for (var i = 0; i < level + 1; i++) {
                var enemyFreeze = new enemy_1.Enemy(1, {
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
            scene.add(new boss_1.Boss({
                x: Math.floor(Math.random() * scene.width),
                y: Math.floor(Math.random() * scene.height)
            }));
        }
        return scene;
    }
    function createMainMenu() {
        var scene = new engine_1.Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
        scene.add(new background_1.Background());
        scene.add(new menu_1.Menu());
        return scene;
    }
    function createVictory() {
        var scene = new engine_1.Scene({ position: { x: 64, y: 64 }, width: 640, height: 360 }, 800, 800);
        scene.add(new background_1.Background());
        scene.add(new victory_1.Victory());
        return scene;
    }
    function animate() {
        renderer.update(sceneManager.current());
        renderer.render(sceneManager.current());
        requestAnimationFrame(animate);
    }
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            },
            function (background_1_1) {
                background_1 = background_1_1;
            },
            function (menu_1_1) {
                menu_1 = menu_1_1;
            },
            function (victory_1_1) {
                victory_1 = victory_1_1;
            },
            function (gui_1_1) {
                gui_1 = gui_1_1;
            },
            function (player_1_1) {
                player_1 = player_1_1;
            },
            function (enemy_1_1) {
                enemy_1 = enemy_1_1;
            },
            function (boss_1_1) {
                boss_1 = boss_1_1;
            }],
        execute: function() {
            start();
            animate();
        }
    }
});
