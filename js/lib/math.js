// Exports everything from the math portion of the libary.
System.register(['./math/easing', './math/mathex'], function(exports_1) {
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
            function (easing_1_1) {
                exportStar_1(easing_1_1);
            },
            function (mathex_1_1) {
                exportStar_1(mathex_1_1);
            }],
        execute: function() {
        }
    }
});
