System.register(['../lib/engine', './ship'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1, ship_1;
    var Enemy;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            },
            function (ship_1_1) {
                ship_1 = ship_1_1;
            }],
        execute: function() {
            Enemy = (function (_super) {
                __extends(Enemy, _super);
                function Enemy(team, position) {
                    if (team === void 0) { team = 0; }
                    _super.call(this, team, position);
                    this.team = team;
                    this.position = position;
                    this.type = 'Enemy';
                    this.isFrozen = false;
                    // Adjust Stats
                    this.hp = 10;
                    this.spdMax = 128;
                    this.gunReloadTime = 0.5;
                    this.gunDamage = 0; //default 1
                    // Add AI Reaction timer
                    this.timer.addTimer('react');
                    // Controls
                    this.moving = true;
                    this.shooting = true;
                    //ww
                    this.tempContext = document.createElement('canvas').getContext('2d');
                    this.tempContext.canvas.width = 64;
                    this.tempContext.canvas.height = 64;
                }
                Enemy.prototype.update = function (scene, i, deltaTime) {
                    _super.prototype.update.call(this, scene, i, deltaTime);
                    var player = scene.findObjectOfType('Player')[0];
                    if (player && this.timer.done('react')) {
                        this.timer.set('react', Math.random());
                        //ww 0.1 is the reaction time of the enemy
                        this.nextRotation = (Math.random() > 0.1) ? this.nextRotation : engine_1.MathEx.getAngleTwoPoints(this.position.x, this.position.y, player.position.x, player.position.y);
                    }
                    if (this.isDestoryed == true) {
                        player.killCount++;
                    }
                };
                Enemy.prototype.render = function (context) {
                    this.time = (this.time + 1) % 360;
                    context.save();
                    context.translate(this.position.x, this.position.y);
                    context.rotate(-this.rotation * (Math.PI / 180));
                    this.tempContext.globalCompositeOperation = 'source-over';
                    this.tempContext.clearRect(0, 0, 64, 64);
                    this.tempContext.drawImage(this.sprite, 64, 0, 64, 64, 0, 0, 64, 64);
                    this.tempContext.globalCompositeOperation = 'source-in';
                    this.tempContext.fillStyle = "hsl(" + this.time + ",80%,50%)";
                    this.tempContext.fillRect(0, 0, 64, 64);
                    context.drawImage(this.tempContext.canvas, 0, 0, 64, 64, -32, -32, 64, 64); //another day figure out why context works at 0 instead of 64
                    context.restore();
                };
                return Enemy;
            }(ship_1.Ship));
            exports_1("Enemy", Enemy);
        }
    }
});
