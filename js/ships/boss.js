System.register(['./enemy', '../misc/portal'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var enemy_1, portal_1;
    var Boss;
    return {
        setters:[
            function (enemy_1_1) {
                enemy_1 = enemy_1_1;
            },
            function (portal_1_1) {
                portal_1 = portal_1_1;
            }],
        execute: function() {
            Boss = (function (_super) {
                __extends(Boss, _super);
                function Boss(position, increaseLevelDmg) {
                    _super.call(this, 1, position, increaseLevelDmg);
                    this.position = position;
                    this.sprite = new Image();
                    // Edit Stats
                    this.spdMax = this.spdMax * 0.5; //He moves at half the spd as other ships.
                    this.hpMax = this.hp = 1000; //ww deafult 1000
                    // Adjust hitbox
                    this.hitbox.width = 128;
                    this.hitbox.height = 128;
                    this.hitbox.x = -64;
                    this.hitbox.y = -64;
                    this.gunReloadTime = .5;
                    this.isBoss = true;
                    // Sprite
                    this.sprite.src = 'sprites/boss.png';
                }
                Boss.prototype.update = function (scene, i, deltaTime) {
                    _super.prototype.update.call(this, scene, i, deltaTime);
                    var player = scene.findObjectOfType('Player')[0];
                    if (this.isDestoryed) {
                        scene.add(new portal_1.Portal({
                            x: Math.floor(Math.random() * scene.width),
                            y: Math.floor(Math.random() * scene.height)
                        }));
                        this.spawnPortal = false;
                    }
                };
                Boss.prototype.render = function (context) {
                    context.save();
                    context.translate(this.position.x, this.position.y);
                    context.rotate(-this.rotation * (Math.PI / 180));
                    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
                    context.restore();
                };
                return Boss;
            }(enemy_1.Enemy));
            exports_1("Boss", Boss);
        }
    }
});
