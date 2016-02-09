System.register(['../lib/gameobject', '../lib/time/timer'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var gameobject_1, timer_1;
    var Healthpack;
    return {
        setters:[
            function (gameobject_1_1) {
                gameobject_1 = gameobject_1_1;
            },
            function (timer_1_1) {
                timer_1 = timer_1_1;
            }],
        execute: function() {
            Healthpack = (function (_super) {
                __extends(Healthpack, _super);
                function Healthpack(position) {
                    if (position === void 0) { position = { x: 0, y: 0 }; }
                    _super.call(this);
                    this.type = 'Healthpack';
                    this.sprite = new Image();
                    this.timer = new timer_1.Timer();
                    this.sprite.src = 'sprites/healthpack.png';
                }
                Healthpack.prototype.update = function (scene, i, deltaTime) {
                };
                Healthpack.prototype.render = function (context) {
                    context.drawImage(this.sprite, 0, 0, 64, 64, this.position.x, this.position.y);
                };
                return Healthpack;
            }(gameobject_1.GameObject));
            exports_1("Healthpack", Healthpack);
        }
    }
});
