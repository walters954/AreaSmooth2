System.register([], function(exports_1) {
    "use strict";
    var Timer;
    return {
        setters:[],
        execute: function() {
            /**
             * Handles the management of timers.
             * Usage:
             * timer = new Timer();
             * timer.addTimer('shoot');
             * if (timer.done('shoot'))
             */
            Timer = (function () {
                function Timer() {
                }
                // Adds a timer with a given start time.
                Timer.prototype.addTimer = function (key, time) {
                    if (time === void 0) { time = 1; }
                    Object.defineProperty(this, key, {
                        enumerable: true,
                        configurable: false,
                        writable: true,
                        value: { cur: time, start: time }
                    });
                };
                // Updates all the timers in this instance.
                Timer.prototype.update = function (deltaTime) {
                    for (var key in this) {
                        if (!isNaN(parseFloat(this[key].cur)) && isFinite(this[key].cur))
                            this[key].cur -= deltaTime;
                    }
                };
                // Checks if a given timer is done.
                Timer.prototype.done = function (key) {
                    if (this[key])
                        return this[key].cur <= 0;
                    return false;
                };
                // Resets a timer to it's last set value.
                Timer.prototype.reset = function (key) {
                    this[key].cur = this[key].start;
                };
                // Sets a timer to a given value.
                Timer.prototype.set = function (key, value) {
                    this[key] = { cur: value, start: value };
                };
                // Gets the current value of a timer.
                Timer.prototype.get = function (key) {
                    return this[key].cur;
                };
                Timer.prototype.remove = function (key) {
                    delete this[key];
                };
                return Timer;
            }());
            exports_1("Timer", Timer);
        }
    }
});
