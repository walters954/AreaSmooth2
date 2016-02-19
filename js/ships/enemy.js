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
                    // Adjust Stats
                    this.spdMax = 128;
                    this.gunReloadTime = 0.5;
                    // Add AI Reaction timer
                    this.timer.addTimer('react');
                    // Controls
                    this.moving = true;
                    this.shooting = true;
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
                return Enemy;
            }(ship_1.Ship));
            exports_1("Enemy", Enemy);
        }
    }
});
