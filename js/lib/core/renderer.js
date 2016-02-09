System.register(['../input', '../time/clock'], function(exports_1) {
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
                    this.canvas.width = 800;
                    this.canvas.height = 800;
                    this.context = this.canvas.getContext('2d');
                    //Initialize Singletons
                    this.input = new input_1.Input(this.canvas);
                    this.clock = new clock_1.Clock();
                }
                //Updates all the objects in the scene.
                Renderer.prototype.update = function (scene) {
                    var _this = this;
                    var deltaTime = this.clock.deltaTime();
                    scene.array.map(function (o) {
                        if ('update' in o)
                            if (scene)
                                o.update(scene, _this.input, deltaTime);
                    });
                };
                //Refreshes the screen with everything in the scene.
                Renderer.prototype.render = function (scene) {
                    var _this = this;
                    this.context.save();
                    //Viewport
                    //this.context.translate(-scene.viewport.position.x, -scene.viewport.position.y);
                    this.context.clearRect(0, 0, scene.width, scene.height);
                    //this.context.clearRect(scene.viewport.position.x, scene.viewport.position.y, scene.viewport.width, scene.viewport.height);
                    //Render Scene
                    scene.array.map(function (o) {
                        if ('render' in o)
                            if (scene)
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
