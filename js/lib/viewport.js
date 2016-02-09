System.register([], function(exports_1) {
    "use strict";
    var Viewport;
    return {
        setters:[],
        execute: function() {
            Viewport = (function () {
                function Viewport(position, width, height) {
                    if (position === void 0) { position = { x: 0, y: 0 }; }
                    if (width === void 0) { width = 640; }
                    if (height === void 0) { height = 360; }
                    this.position = position;
                    this.width = width;
                    this.height = height;
                }
                Viewport.prototype.inViewport = function (x, y) {
                };
                return Viewport;
            }());
            exports_1("Viewport", Viewport);
        }
    }
});
