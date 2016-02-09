System.register(['./input', './time/clock'], function(exports_1) {
    "use strict";
    var input_1, clock_1;
    var Renderer;
    return {
        setters:[
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (clock_1_1) {
                clock_1 = clock_1_1;
            }],
        execute: function() {
            /**
             * Manages rendering objects on canvas.
             */
            Renderer = (function () {
                // Initzalize Renderer
                function Renderer() {
                    this.canvas = document.createElement('canvas');
                    this.canvas.tabIndex = 1;
                    this.canvas.width = 640;
                    this.canvas.height = 360;
                    this.context = this.canvas.getContext('2d');
                    //Initialize Singletons
                    this.input = new input_1.Input(this.canvas);
                    this.clock = new clock_1.Clock();
                }
                //Updates all the objects in the scene.
                Renderer.prototype.update = function (scene) {
                    var _this = this;
                    var deltaTime = this.clock.deltaTime();
                    this.scene.array.map(function (o) {
                        if ('update' in o)
                            o.update(_this.scene, _this.input, deltaTime);
                    });
                };
                //Refreshes the screen with everything in the scene.
                Renderer.prototype.render = function (scene) {
                    var _this = this;
                    this.context.save();
                    //Viewport
                    this.context.translate(-this.scene.viewport.position.x, -this.scene.viewport.position.y);
                    this.context.clearRect(this.scene.viewport.position.x, this.scene.viewport.position.y, this.scene.viewport.width, this.scene.viewport.height);
                    //Render Scene
                    scene.array.map(function (o) {
                        if ('render' in o)
                            o.render(_this.context);
                    });
                    this.context.restore();
                };
                return Renderer;
            }());
            exports_1("Renderer", Renderer);
        }
    }
});
