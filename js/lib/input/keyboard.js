System.register([], function(exports_1) {
    "use strict";
    var KeyCode, Keyboard;
    return {
        setters:[],
        execute: function() {
            // Depending on the browser or keyboard layout,
            // some KeyCodes can be different.
            // This implentation doesn't include keys that can have multiple meanings.
            // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
            (function (KeyCode) {
                KeyCode[KeyCode["Tab"] = 9] = "Tab";
                KeyCode[KeyCode["Enter"] = 13] = "Enter";
                KeyCode[KeyCode["ShiftLeft"] = 16] = "ShiftLeft";
                KeyCode[KeyCode["ShiftRight"] = 16] = "ShiftRight";
                KeyCode[KeyCode["ControlLeft"] = 17] = "ControlLeft";
                KeyCode[KeyCode["ControlRight"] = 17] = "ControlRight";
                KeyCode[KeyCode["AltLeft"] = 18] = "AltLeft";
                KeyCode[KeyCode["AltRight"] = 18] = "AltRight";
                KeyCode[KeyCode["Escape"] = 27] = "Escape";
                KeyCode[KeyCode["Space"] = 32] = "Space";
                KeyCode[KeyCode["End"] = 35] = "End";
                KeyCode[KeyCode["Home"] = 36] = "Home";
                KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
                KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
                KeyCode[KeyCode["ArrowLeft"] = 37] = "ArrowLeft";
                KeyCode[KeyCode["ArrowUp"] = 38] = "ArrowUp";
                KeyCode[KeyCode["ArrowRight"] = 39] = "ArrowRight";
                KeyCode[KeyCode["ArrowDown"] = 40] = "ArrowDown";
                KeyCode[KeyCode["Insert"] = 45] = "Insert";
                KeyCode[KeyCode["Delete"] = 46] = "Delete";
                KeyCode[KeyCode["Digit0"] = 48] = "Digit0";
                KeyCode[KeyCode["Digit1"] = 49] = "Digit1";
                KeyCode[KeyCode["Digit2"] = 50] = "Digit2";
                KeyCode[KeyCode["Digit3"] = 51] = "Digit3";
                KeyCode[KeyCode["Digit4"] = 52] = "Digit4";
                KeyCode[KeyCode["Digit5"] = 53] = "Digit5";
                KeyCode[KeyCode["Digit6"] = 54] = "Digit6";
                KeyCode[KeyCode["Digit7"] = 55] = "Digit7";
                KeyCode[KeyCode["Digit8"] = 56] = "Digit8";
                KeyCode[KeyCode["Digit9"] = 57] = "Digit9";
                KeyCode[KeyCode["KeyA"] = 65] = "KeyA";
                KeyCode[KeyCode["KeyB"] = 66] = "KeyB";
                KeyCode[KeyCode["KeyC"] = 67] = "KeyC";
                KeyCode[KeyCode["KeyD"] = 68] = "KeyD";
                KeyCode[KeyCode["KeyE"] = 69] = "KeyE";
                KeyCode[KeyCode["KeyF"] = 70] = "KeyF";
                KeyCode[KeyCode["KeyG"] = 71] = "KeyG";
                KeyCode[KeyCode["KeyH"] = 72] = "KeyH";
                KeyCode[KeyCode["KeyI"] = 73] = "KeyI";
                KeyCode[KeyCode["KeyJ"] = 74] = "KeyJ";
                KeyCode[KeyCode["KeyK"] = 75] = "KeyK";
                KeyCode[KeyCode["KeyL"] = 76] = "KeyL";
                KeyCode[KeyCode["KeyM"] = 77] = "KeyM";
                KeyCode[KeyCode["KeyN"] = 78] = "KeyN";
                KeyCode[KeyCode["KeyO"] = 79] = "KeyO";
                KeyCode[KeyCode["KeyP"] = 80] = "KeyP";
                KeyCode[KeyCode["KeyQ"] = 81] = "KeyQ";
                KeyCode[KeyCode["KeyR"] = 82] = "KeyR";
                KeyCode[KeyCode["KeyS"] = 83] = "KeyS";
                KeyCode[KeyCode["KeyT"] = 84] = "KeyT";
                KeyCode[KeyCode["KeyU"] = 85] = "KeyU";
                KeyCode[KeyCode["KeyV"] = 86] = "KeyV";
                KeyCode[KeyCode["KeyW"] = 87] = "KeyW";
                KeyCode[KeyCode["KeyX"] = 88] = "KeyX";
                KeyCode[KeyCode["KeyY"] = 89] = "KeyY";
                KeyCode[KeyCode["KeyZ"] = 90] = "KeyZ";
                KeyCode[KeyCode["Numpad0"] = 96] = "Numpad0";
                KeyCode[KeyCode["Numpad1"] = 97] = "Numpad1";
                KeyCode[KeyCode["Numpad2"] = 98] = "Numpad2";
                KeyCode[KeyCode["Numpad3"] = 99] = "Numpad3";
                KeyCode[KeyCode["Numpad4"] = 100] = "Numpad4";
                KeyCode[KeyCode["Numpad5"] = 101] = "Numpad5";
                KeyCode[KeyCode["Numpad6"] = 102] = "Numpad6";
                KeyCode[KeyCode["Numpad7"] = 103] = "Numpad7";
                KeyCode[KeyCode["Numpad8"] = 104] = "Numpad8";
                KeyCode[KeyCode["Numpad9"] = 105] = "Numpad9";
                KeyCode[KeyCode["NumpadAdd"] = 107] = "NumpadAdd";
                KeyCode[KeyCode["NumpadEnter"] = 13] = "NumpadEnter";
                KeyCode[KeyCode["NumpadMultiply"] = 106] = "NumpadMultiply";
                KeyCode[KeyCode["NumpadSubtract"] = 109] = "NumpadSubtract";
                KeyCode[KeyCode["F1"] = 112] = "F1";
                KeyCode[KeyCode["F2"] = 113] = "F2";
                KeyCode[KeyCode["F3"] = 114] = "F3";
                KeyCode[KeyCode["F4"] = 115] = "F4";
                KeyCode[KeyCode["F5"] = 116] = "F5";
                KeyCode[KeyCode["F6"] = 117] = "F6";
                KeyCode[KeyCode["F7"] = 118] = "F7";
                KeyCode[KeyCode["F8"] = 119] = "F8";
                KeyCode[KeyCode["F9"] = 120] = "F9";
                KeyCode[KeyCode["F10"] = 121] = "F10";
                KeyCode[KeyCode["F11"] = 122] = "F11";
                KeyCode[KeyCode["F12"] = 113] = "F12";
                KeyCode[KeyCode["Comma"] = 188] = "Comma";
                KeyCode[KeyCode["Period"] = 190] = "Period";
            })(KeyCode || (KeyCode = {}));
            exports_1("KeyCode", KeyCode);
            Keyboard = (function () {
                function Keyboard(canvas) {
                    var _this = this;
                    this.canvas = canvas;
                    this.keys = {};
                    this.canvas.addEventListener('keydown', function (e) { return _this.keyDownCallback(e); });
                    this.canvas.addEventListener('keyup', function (e) { return _this.keyUpCallback(e); });
                }
                Keyboard.prototype.keyDownCallback = function (event) {
                    this.keys[event.keyCode] = true;
                };
                Keyboard.prototype.keyUpCallback = function (event) {
                    this.keys[event.keyCode] = false;
                };
                Keyboard.prototype.getKey = function (key) {
                    return (this.keys[key] === undefined || !this.keys[key]) ? false : true;
                };
                return Keyboard;
            }());
            exports_1("Keyboard", Keyboard);
        }
    }
});
