System.register(['../lib/engine'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1;
    var Healthpack;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            }],
        execute: function() {
            Healthpack = (function (_super) {
                __extends(Healthpack, _super);
                function Healthpack(position, heal) {
                    if (position === void 0) { position = { x: 0, y: 0 }; }
                    if (heal === void 0) { heal = 50; }
                    _super.call(this);
                    this.heal = heal;
                    this.type = 'Healthpack';
                    this.sprite = new Image();
                    this.timer = new engine_1.Timer();
                    this.position = position;
                    this.sprite.src = './sprites/healthball.png';
                    this.hitbox.width = this.hitbox.height = 16;
                    // Better Healthpack
                    if (this.heal >= 25) {
                        this.sprite.src = './sprites/healthpack.png';
                        this.hitbox.width = this.hitbox.height = 64;
                        this.timer.addTimer('destroy', 30);
                    }
                }
                Healthpack.prototype.update = function (scene, i, deltaTime) {
                    this.timer.update(deltaTime);
                    var player = scene.findObjectOfType('Player')[0];
                    if (this.isColliding(player)) {
                        player.hp += this.heal;
                    }
                    if (this.isColliding(player) || this.timer.done('destroy')) {
                        scene.destroy(this);
                    }
                };
                Healthpack.prototype.render = function (context) {
                    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.position.x, this.position.y, this.hitbox.width, this.hitbox.height);
                };
                return Healthpack;
            }(engine_1.GameObject));
            exports_1("Healthpack", Healthpack);
        }
    }
});
