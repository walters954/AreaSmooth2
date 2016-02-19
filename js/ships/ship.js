System.register(['../lib/engine', './bullet', '../lib/time/timer'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1, bullet_1, timer_1;
    var Ship;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            },
            function (bullet_1_1) {
                bullet_1 = bullet_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            }],
        execute: function() {
            /**
             * The player ship.
             */
            Ship = (function (_super) {
                __extends(Ship, _super);
                function Ship(team, position) {
                    if (team === void 0) { team = 0; }
                    _super.call(this);
                    this.team = team;
                    this.nextRotation = Math.random() * 360;
                    this.moving = false;
                    this.shooting = false;
                    //Ship Kinematics/Stats
                    this.hp = 100;
                    this.hpMax = this.hp;
                    this.spd = 0;
                    this.acc = 128;
                    this.deacc = 160;
                    this.spdMax = 256;
                    this.handling = 10;
                    this.prevDir = 1;
                    //Ship Guns
                    this.timer = new timer_1.Timer();
                    //ww
                    this.gunReloadTime = .3;
                    this.gunDamage = 1;
                    //WW
                    this.lives = 1;
                    this.isDestoryed = false;
                    this.killCount = 0;
                    this.team = team;
                    //Transform
                    this.position = position;
                    //Sprites
                    this.sprite = new Image();
                    this.sprite.src = 'sprites/ship.png';
                    this.timer.addTimer('shoot', this.gunReloadTime);
                }
                Ship.prototype.update = function (scene, input, deltaTime) {
                    // Update Timer
                    this.timer.update(deltaTime);
                    //Ship Controls
                    if (this.shooting) {
                        if (this.timer.done('shoot')) {
                            this.timer.reset('shoot');
                            var bullet = new bullet_1.Bullet(this.team, this.position.x, this.position.y, Math.cos(this.rotation * (Math.PI / 180)), -Math.sin(this.rotation * (Math.PI / 180)), this.gunDamage);
                            scene.add(bullet);
                        }
                    }
                    if (this.moving) {
                        this.spd = engine_1.MathEx.clamp(this.spd + (deltaTime * this.acc), 0, this.spdMax);
                        this.rotation += engine_1.MathEx.angleDifference(this.nextRotation, this.rotation) / (this.spd / this.handling);
                        this.prevDir = this.velocity.x > 0 ? 1 : -1;
                    }
                    else {
                        this.spd = engine_1.MathEx.clamp(this.spd - (deltaTime * this.deacc), 0, this.spdMax);
                    }
                    // Apply Kinematics
                    this.velocity.x = deltaTime * this.spd * Math.cos(this.rotation * (Math.PI / 180));
                    this.velocity.y = deltaTime * this.spd * -Math.sin(this.rotation * (Math.PI / 180));
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    //Keep in bounds
                    this.position.x = engine_1.MathEx.clamp(this.position.x, 0, scene.width);
                    this.position.y = engine_1.MathEx.clamp(this.position.y, 0, scene.height);
                    // Apply Death
                    this.hp = engine_1.MathEx.clamp(this.hp, 0, this.hpMax);
                    //ww
                    if (this.hp <= 0) {
                        this.lives -= 1;
                        if (this.lives <= 0) {
                            scene.destroy(this);
                            this.isDestoryed = true;
                        }
                        else {
                            this.position.x = Math.floor(Math.random() * scene.width);
                            this.position.y = Math.floor(Math.random() * scene.height);
                            this.hp = 100;
                        }
                    }
                };
                Ship.prototype.render = function (context) {
                    context.save();
                    context.translate(this.position.x, this.position.y);
                    context.rotate(-this.rotation * (Math.PI / 180));
                    context.drawImage(this.sprite, 64 * this.team, 0, 64, 64, -32, -32, 64, 64);
                    context.restore();
                };
                return Ship;
            }(engine_1.GameObject));
            exports_1("Ship", Ship);
        }
    }
});
