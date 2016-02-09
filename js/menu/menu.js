System.register(['../lib/engine'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var engine_1;
    var Menu;
    return {
        setters:[
            function (engine_1_1) {
                engine_1 = engine_1_1;
            }],
        execute: function() {
            Menu = (function (_super) {
                __extends(Menu, _super);
                function Menu() {
                    _super.call(this);
                    this.alpha = 0;
                    this.startgame = false;
                    this.elapsedTime = 0;
                    this.logo = new Image();
                    this.logo.src = 'sprites/logo.png';
                }
                Menu.prototype.update = function (scene, input, deltaTime) {
                    this.scene = scene;
                    this.elapsedTime += deltaTime;
                    if (!this.startgame && input.mouseClick()) {
                        this.startgame = true;
                    }
                    // Fade in and Fade out
                    if (this.startgame) {
                        this.alpha = engine_1.Easing.easeOutExpo(1 - this.elapsedTime, 0, 1, 1);
                        if (this.alpha <= 0) {
                            this.alpha = 0;
                            scene.next();
                        }
                    }
                    else {
                        this.alpha = engine_1.Easing.easeOutExpo(this.elapsedTime, 0, 1, 1);
                    }
                };
                Menu.prototype.render = function (context) {
                    var vx = this.scene.viewport.position.x + (this.scene.viewport.width / 2);
                    var vy = this.scene.viewport.position.y + (this.scene.viewport.height / 2);
                    context.save();
                    context.globalAlpha = this.alpha;
                    context.drawImage(this.logo, vx - (this.logo.width / 2), vy - (this.logo.height / 2));
                    context.fillStyle = "#ffffff";
                    context.font = "12px 'PixelFont'";
                    context.textAlign = "center";
                    context.fillText("Click to Start", vx, vy + 64, 128);
                    // Background
                    var my_gradient = context.createLinearGradient(0, 0, 0, 360);
                    my_gradient.addColorStop(0, "rgba(0,0,0,0)");
                    my_gradient.addColorStop(1, "rgba(0,0,0,0.1)");
                    context.fillStyle = my_gradient;
                    context.fillRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.position.x + this.scene.viewport.width, this.scene.viewport.position.y + this.scene.viewport.height);
                    context.restore();
                };
                return Menu;
            }(engine_1.GameObject));
            exports_1("Menu", Menu);
        }
    }
});
