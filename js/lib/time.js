// Exports everything time related from library.
System.register(['./time/clock', './time/timer'], function(exports_1) {
    "use strict";
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (clock_1_1) {
                exportStar_1(clock_1_1);
            },
            function (timer_1_1) {
                exportStar_1(timer_1_1);
            }],
        execute: function() {
        }
    }
});
