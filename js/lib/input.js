System.register(['./input/keyboard', './input/mouse', './input/touch'], function(exports_1) {
    "use strict";
    var keyboard_1, mouse_1, touch_1;
    var Input;
    return {
        setters:[
            function (keyboard_1_1) {
                keyboard_1 = keyboard_1_1;
                exports_1({
                    "KeyCode": keyboard_1_1["KeyCode"]
                });
            },
            function (mouse_1_1) {
                mouse_1 = mouse_1_1;
            },
            function (touch_1_1) {
                touch_1 = touch_1_1;
            }],
        execute: function() {
            /**
             * Manages all input events.
             */
            Input = (function () {
                function Input(canvas) {
                    this.canvas = canvas;
                    this.keyboard = new keyboard_1.Keyboard(canvas);
                    this.mouse = new mouse_1.Mouse(canvas);
                    this.touch = new touch_1.Touch(canvas);
                }
                //Keyboard
                Input.prototype.getKey = function (key) {
                    return this.keyboard.getKey(key);
                };
                //Mouse
                Input.prototype.mousePosition = function () {
                    return this.mouse.mousePosition;
                };
                Input.prototype.mouseClick = function () {
                    return this.mouse.mouseClick;
                };
                //Touch
                Input.prototype.touches = function () {
                    return this.touch.touches;
                };
                return Input;
            }());
            exports_1("Input", Input);
        }
    }
});
