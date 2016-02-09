System.register([], function(exports_1) {
    "use strict";
    var Touch;
    return {
        setters:[],
        execute: function() {
            Touch = (function () {
                function Touch(canvas) {
                    var _this = this;
                    this.canvas = canvas;
                    this.touches = [];
                    canvas.addEventListener("touchstart", function (e) { return _this.touchStartCallback(e); }, false);
                    canvas.addEventListener("touchend", function (e) { return _this.touchEndCallback(e); }, false);
                    canvas.addEventListener("touchcancel", function (e) { return _this.touchCancelCallback(e); }, false);
                    canvas.addEventListener("touchmove", function (e) { return _this.touchMoveCallback(e); }, false);
                }
                Touch.prototype.touchStartCallback = function (e) {
                    this.touches.push(this.copyTouch(e.changedTouches));
                };
                Touch.prototype.touchEndCallback = function (e) {
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var idx = this.ongoingTouchIndexById(touches[i].identifier);
                        if (idx >= 0) {
                            this.touches.splice(idx, 1); // remove it; we're done
                        }
                    }
                };
                Touch.prototype.touchCancelCallback = function (e) {
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        this.touches.splice(i, 1); // remove it; we're done
                    }
                };
                Touch.prototype.touchMoveCallback = function (e) {
                    var touches = e.changedTouches;
                    for (var i = 0; i < touches.length; i++) {
                        var idx = this.ongoingTouchIndexById(touches[i].identifier);
                        if (idx >= 0) {
                            this.touches.splice(idx, 1, this.copyTouch(touches[i])); // swap in the new touch record
                        }
                    }
                };
                Touch.prototype.copyTouch = function (touch) {
                    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
                };
                Touch.prototype.ongoingTouchIndexById = function (idToFind) {
                    for (var i = 0; i < this.touches.length; i++) {
                        var id = this.touches[i].identifier;
                        if (id == idToFind) {
                            return i;
                        }
                    }
                    return -1; // not found
                };
                return Touch;
            }());
            exports_1("Touch", Touch);
        }
    }
});
