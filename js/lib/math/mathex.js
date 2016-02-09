System.register([], function(exports_1) {
    "use strict";
    var MathEx;
    return {
        setters:[],
        execute: function() {
            MathEx = (function () {
                function MathEx() {
                }
                MathEx.degToRad = function (angle) {
                    return 0.0174533 * angle;
                };
                MathEx.clamp = function (val, minVal, maxVal) {
                    return Math.max(minVal, Math.min(val, maxVal));
                };
                MathEx.random_range = function (min, max) {
                    return Math.random() * (max - min) + min;
                };
                MathEx.getAngleTwoPoints = function (x1, y1, x2, y2) {
                    return Math.atan2(-(y2 - y1), x2 - x1) * (180 / Math.PI);
                };
                MathEx.angleDifference = function (angle0, angle1) {
                    return ((((angle0 - angle1) % 360) + 540) % 360) - 180;
                };
                MathEx.keyboardAngle = function (up, left, down, right) {
                    //Diagonals
                    if (right && up)
                        return 45;
                    if (left && up)
                        return 135;
                    if (right && down)
                        return 315;
                    if (left && down)
                        return 225;
                    //Orthographics
                    if (right)
                        return 0;
                    if (up)
                        return 90;
                    if (left)
                        return 180;
                    if (down)
                        return 270;
                    return 0;
                };
                return MathEx;
            }());
            exports_1("MathEx", MathEx);
        }
    }
});
