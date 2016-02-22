System.register(['../lib/engine'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1;
    var Portal;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            }],
        execute: function() {
            Portal = (function (_super) {
                __extends(Portal, _super);
                function Portal(position) {
                    if (position === void 0) { position = { x: 0, y: 0 }; }
                    _super.call(this);
                    this.type = 'Portal';
                    this.sprite = new Image();
                    this.position = position;
                    this.sprite.src = './sprites/portal.png';
                    // Adjust hitbox
                    this.hitbox.width = 128;
                    this.hitbox.height = 128;
                    this.hitbox.x = -64;
                    this.hitbox.y = -64;
                    this.rotation = Math.random() * 360;
                }
                Portal.prototype.update = function (scene, i, deltaTime) {
                    // Find a player in the scene.
                    var player = scene.findObjectOfType('Player')[0];
                    if (this.isColliding(player)) {
                        player.keepEnemySpawning = true;
                        player.spawnTimer = true;
                        player.goThere = true;
                        scene.next();
                    }
                    // Spin slowly
                    this.rotation += deltaTime * 5;
                    console.log(this.rotation);
                };
                Portal.prototype.render = function (context) {
                    context.save();
                    context.translate(this.position.x, this.position.y);
                    context.rotate(-this.rotation);
                    context.drawImage(this.sprite, 0, 0, this.hitbox.width, this.hitbox.height, this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
                    context.restore();
                };
                return Portal;
            }(engine_1.GameObject));
            exports_1("Portal", Portal);
        }
    }
});
