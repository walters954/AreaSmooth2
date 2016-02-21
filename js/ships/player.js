System.register(['../lib/engine', './ship', './enemy', '../misc/portal'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1, ship_1, enemy_1, portal_1;
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
            }],
        execute: function() {
            Player = (function (_super) {
                __extends(Player, _super);
                function Player(team, position) {
                    if (team === void 0) { team = 0; }
                    _super.call(this, team, position);
                    this.team = team;
                    this.position = position;
                    this.type = 'Player';
                    this.shootSound = new Audio();
                    this.summonEnemyAtThree = true;
                    this.collided = 0;
                    this.shootSound.src = 'sounds/laser.wav';
                    this.gunDamage = 10; //ww default needs to be 1
                    this.lives = 3;
                    this.gunReloadTime = 1;
                    this.killCount = 150; //ww for testing
                }
                Player.prototype.update = function (scene, input, deltaTime) {
                    var _this = this;
                    _super.prototype.update.call(this, scene, input, deltaTime);
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
                        this.killCount != 150 && this.killCount != 0) {
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
                        if (!_this.collided && _this.isColliding(enemy)) {
                            _this.hp -= 10;
                            enemy.hp -= 5;
                            _this.collided = 150;
                        }
                        else if (_this.collided) {
                            _this.collided--;
                        }
                    });
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
