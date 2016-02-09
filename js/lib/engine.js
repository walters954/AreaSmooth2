// Import this to get access to everything in the game engine.
System.register(['./core', './input', './time', './math'], function(exports_1) {
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
            function (core_1_1) {
                exportStar_1(core_1_1);
            },
            function (input_1_1) {
                exportStar_1(input_1_1);
            },
            function (time_1_1) {
                exportStar_1(time_1_1);
            },
            function (math_1_1) {
                exportStar_1(math_1_1);
            }],
        execute: function() {
        }
    }
});
