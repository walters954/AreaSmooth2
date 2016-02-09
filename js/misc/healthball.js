System.register(['./healthpack'], function(exports_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var healthpack_1;
    var Healthball;
    return {
        setters:[
            function (healthpack_1_1) {
                healthpack_1 = healthpack_1_1;
            }],
        execute: function() {
            Healthball = (function (_super) {
                __extends(Healthball, _super);
                function Healthball() {
                    _super.apply(this, arguments);
                }
                return Healthball;
            }(healthpack_1.Healthpack));
        }
    }
});
