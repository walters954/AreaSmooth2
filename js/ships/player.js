System.register(['../lib/engine', './ship', './enemy', '../misc/portal', "../misc/healthpack"], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1, ship_1, enemy_1, portal_1, healthpack_1;
    var Player;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            },
            function (ship_1_1) {
                ship_1 = ship_1_1;
            },
            function (enemy_1_1) {
                enemy_1 = enemy_1_1;
            },
            function (portal_1_1) {
                portal_1 = portal_1_1;
            },
            function (healthpack_1_1) {
                healthpack_1 = healthpack_1_1;
            }],
        execute: function() {
            Player = (function (_super) {
                __extends(Player, _super);
                //public collisionTimer = new Timer();
                function Player(team, position) {
                    if (team === void 0) { team = 0; }
                    _super.call(this, team, position);
                    this.team = team;
                    this.position = position;
                    this.type = 'Player';
                    this.shootSound = new Audio();
                    this.summonEnemyAtThree = true;
                    // Extra timer variables
                    this.collisionGracePeriod = 2;
                    this.healthpackSpawnPeriod = 300;
                    this.healthpackDestroyPeriod = 30;
                    this.shootSound.src = 'sounds/laser.wav';
                    this.gunDamage = 10; //ww default needs to be 1
                    this.lives = 3;
                    this.gunReloadTime = 1;
                    this.killCount = 150; //ww for testing
                    // Starts collision timer at 0 for initial hit once ship is created
                    this.timer.addTimer('collide', this.collisionGracePeriod);
                    // Starts timer for healthpack for 5 minutes
                    this.timer.addTimer('spawnHealthpack', this.healthpackSpawnPeriod);
                    // Starts timer for destroying healthpack
                    this.timer.addTimer('destroyHealthPack', this.healthpackDestroyPeriod);
                }
                Player.prototype.update = function (scene, input, deltaTime) {
                    var _this = this;
                    _super.prototype.update.call(this, scene, input, deltaTime);
                    this.timer.update(deltaTime);
                    //Keyboard
                    var l = input.getKey(engine_1.KeyCode.ArrowLeft);
                    var r = input.getKey(engine_1.KeyCode.ArrowRight);
                    var u = input.getKey(engine_1.KeyCode.ArrowUp);
                    var d = input.getKey(engine_1.KeyCode.ArrowDown);
                    this.nextRotation = engine_1.MathEx.keyboardAngle(u, l, d, r);
                    this.moving = (u || l || d || r);
                    this.shooting = input.getKey(engine_1.KeyCode.Space);
                    //ww so you can summon 3 ships every time you kill 3
                    if (this.killCount % 3 == 0 && this.summonEnemyAtThree &&
                        this.killCount != 150 && this.killCount != 0 && scene.current() < 5) {
                        for (var i = 0; i < Math.floor((Math.random() * 4) + 2); i++)
                            scene.add(new enemy_1.Enemy(1, {
                                x: Math.floor(Math.random() * scene.width),
                                y: Math.floor(Math.random() * scene.height)
                            }));
                        this.summonEnemyAtThree = false;
                    }
                    ;
                    //ww Add a Portal
                    if (this.killCount == 150 && this.spawnPortal) {
                        scene.add(new portal_1.Portal({
                            x: Math.floor(Math.random() * scene.width),
                            y: Math.floor(Math.random() * scene.height)
                        }));
                        this.spawnPortal = false;
                    }
                    // Check collisions with enemies
                    scene.findObjectOfType('Enemy').map(function (enemy) {
                        if (_this.timer.done('collide') && _this.isColliding(enemy) && enemy.isFrozen == true) {
                            _this.hp -= 10;
                            enemy.hp -= 5;
                            _this.timer.reset('collide');
                        }
                        else if (_this.timer.done('collide') && _this.isColliding(enemy)) {
                            _this.hp -= 10;
                            enemy.hp -= 5;
                            _this.timer.reset('collide');
                        }
                    });
                    // Spawns a healthpack every 5 minutes and destroys it
                    // Add a Healthpack
                    if (this.timer.done('spawnHealthpack')) {
                        this.healthpack = new healthpack_1.Healthpack({
                            x: Math.floor(Math.random() * scene.width),
                            y: Math.floor(Math.random() * scene.height)
                        });
                        scene.add(this.healthpack);
                        this.timer.reset('spawnHealthpack');
                        this.timer.reset('destroyHealthPack');
                    }
                    // Destroys a healthpack once it spawns after about 30 seconds
                    if (this.timer.done('destroyHealthPack')) {
                        scene.destroy(this.healthpack);
                    }
                    //Sync Viewport with Screen
                    scene.viewport.position.x = this.position.x - (scene.viewport.width / 2);
                    scene.viewport.position.y = this.position.y - (scene.viewport.height / 2);
                };
                return Player;
            }(ship_1.Ship));
            exports_1("Player", Player);
        }
    }
});
