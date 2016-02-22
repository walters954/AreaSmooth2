System.register(['../lib/engine'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1;
    var GUI;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            }],
        execute: function() {
            GUI = (function (_super) {
                __extends(GUI, _super);
                function GUI() {
                    _super.call(this);
                }
                GUI.prototype.update = function (scene, input, deltaTime) {
                    this.viewport = scene.viewport;
                    this.player = scene.findObjectOfType('Player')[0];
                    var enemyCount = 0;
                    scene.array.map(function (o) {
                        if (o.type == 'Enemy')
                            enemyCount++;
                    });
                    this.viewport = scene.viewport;
                    this.player = scene.findObjectOfType('Player')[0];
                    if (this.player)
                        this.myString = "HP: " + this.player.hp +
                            " Kill Count: " + this.player.killCount +
                            " Score: " + this.player.killScore +
                            " Lives: " + this.player.lives +
                            " Level: " + scene.current() +
                            " Enemies: " + enemyCount;
                    ;
                };
                GUI.prototype.render = function (context) {
                    context.fillStyle = "#ffffff";
                    context.font = '16px PixelFont';
                    if (this.viewport) {
                        context.fillText(this.myString, 16, 16);
                    }
                };
                return GUI;
            }(engine_1.GameObject));
            exports_1("GUI", GUI);
        }
    }
});
