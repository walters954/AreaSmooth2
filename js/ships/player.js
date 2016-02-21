System.register(['../lib/engine', './ship', '../lib/time/timer'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1, ship_1, timer_1;
    var Player;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            },
            function (ship_1_1) {
                ship_1 = ship_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
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
                    // Holds logic for collision timer
                    this.collisionGracePeriod = 2;
                    this.collisionTimer = new timer_1.Timer();
                    this.shootSound.src = 'sounds/laser.wav';
                    this.gunDamage = 10;
                    this.lives = 3;
                    this.gunReloadTime = 1;
                    // Starts collision timer at 0 for initial hit once ship is created
                    this.collisionTimer.addTimer('collide', this.collisionGracePeriod);
                }
                Player.prototype.update = function (scene, input, deltaTime) {
                    var _this = this;
                    _super.prototype.update.call(this, scene, input, deltaTime);
                    this.collisionTimer.update(deltaTime);
                    //Keyboard
                    var l = input.getKey(engine_1.KeyCode.ArrowLeft);
                    var r = input.getKey(engine_1.KeyCode.ArrowRight);
                    var u = input.getKey(engine_1.KeyCode.ArrowUp);
                    var d = input.getKey(engine_1.KeyCode.ArrowDown);
                    this.nextRotation = engine_1.MathEx.keyboardAngle(u, l, d, r);
                    this.moving = (u || l || d || r);
                    this.shooting = input.getKey(engine_1.KeyCode.Space);
                    // Check collisions with enemies
                    scene.findObjectOfType('Enemy').map(function (enemy) {
                        if (_this.collisionTimer.done('collide') && _this.isColliding(enemy)) {
                            _this.hp -= 10;
                            enemy.hp -= 5;
                            _this.collisionTimer.reset('collide');
                        }
                        //else if(this.collided)
                        //{
                        //  this.collided--;
                        //}
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
