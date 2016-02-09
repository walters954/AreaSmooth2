System.register([], function(exports_1) {
    "use strict";
    var Clock;
    return {
        setters:[],
        execute: function() {
            /**
             * Clock for managing Game Loop
             */
            Clock = (function () {
                function Clock(autoStart) {
                    if (autoStart === void 0) { autoStart = true; }
                    this.autoStart = autoStart;
                    this.running = false;
                    this.startTime = 0;
                    this.oldTime = 0;
                    this.elapsedTime = 0;
                    if (this.autoStart)
                        this.start();
                }
                Clock.prototype.start = function () {
                    this.startTime = self.performance.now();
                    this.oldTime = this.startTime;
                    this.running = true;
                };
                Clock.prototype.stop = function () {
                    this.getElapsedTime();
                    this.running = false;
                };
                Clock.prototype.getElapsedTime = function () {
                    this.deltaTime();
                    return this.elapsedTime;
                };
                Clock.prototype.deltaTime = function () {
                    var diff = 0;
                    if (this.autoStart && !this.running)
                        this.start();
                    if (this.running) {
                        var newTime = self.performance.now();
                        diff = 0.001 * (newTime - this.oldTime);
                        this.oldTime = newTime;
                        this.elapsedTime += diff;
                    }
                    return diff;
                };
                return Clock;
            }());
            exports_1("Clock", Clock);
        }
    }
});
