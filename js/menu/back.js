System.register(['../lib/gameobject'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var gameobject_1;
    var Back;
    return {
        setters:[
            function (gameobject_1_1) {
                gameobject_1 = gameobject_1_1;
            }],
        execute: function() {
            Back = (function (_super) {
                __extends(Back, _super);
                function Back() {
                    _super.call(this);
                    this.backImage = new Image();
                    this.backImage.src = 'sprites/stars.png';
                }
                Back.prototype.update = function (scene) {
                    this.scene = scene;
                };
                Back.prototype.render = function (ctx) {
                    ctx.strokeStyle = "#ffffff";
                    ctx.strokeRect(0, 0, this.scene.width, this.scene.height);
                    ctx.drawImage(this.backImage, 0, 0);
                };
                return Back;
            }(gameobject_1.GameObject));
            exports_1("Back", Back);
        }
    }
});
