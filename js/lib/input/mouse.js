System.register([], function(exports_1) {
    "use strict";
    var Mouse;
    return {
        setters:[],
        execute: function() {
            Mouse = (function () {
                function Mouse(canvas) {
                    var _this = this;
                    this.canvas = canvas;
                    this.mouseClick = false;
                    //Mouse
                    this.canvas.addEventListener('mousemove', function (e) { return _this.mousePositionCallback(e); });
                    this.canvas.addEventListener('mousedown', function (e) { return _this.mouseDownCallback(e); });
                    this.canvas.addEventListener('mouseup', function (e) { return _this.mouseUpCallback(e); });
                }
                Mouse.prototype.mousePositionCallback = function (event) {
                    var canvasRect = this.canvas.getBoundingClientRect();
                    var root = document.documentElement;
                    var mouseX = event.clientX - canvasRect.left - root.scrollLeft;
                    var mouseY = event.clientY - canvasRect.top - root.scrollTop;
                    var scale = 1;
                    //Canvas Scale
                    var st = window.getComputedStyle(this.canvas, null);
                    var tr = st.getPropertyValue('transform');
                    if (tr !== 'none') {
                        var values = tr.split('(')[1].split(')')[0].split(',');
                        var a = values[0];
                        var b = values[1];
                        var c = values[2];
                        var d = values[3];
                        scale = Math.sqrt(a * a + b * b);
                    }
                    this.mousePosition = { x: (mouseX / scale), y: (mouseY / scale) };
                };
                Mouse.prototype.mouseDownCallback = function (event) {
                    this.mouseClick = true;
                };
                Mouse.prototype.mouseUpCallback = function (event) {
                    this.mouseClick = false;
                };
                return Mouse;
            }());
            exports_1("Mouse", Mouse);
        }
    }
});
