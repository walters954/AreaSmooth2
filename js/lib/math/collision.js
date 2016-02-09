System.register([], function(exports_1) {
    "use strict";
    var Collision;
    return {
        setters:[],
        execute: function() {
            Collision = (function () {
                function Collision() {
                }
                //checks a region for a collision, returns a collection of collided objects.
                Collision.prototype.box = function (scene, x1, y1, x2, y2) {
                    return scene.array.filter(function (o) {
                        return x1 < o.position.x + o.hitbox.x
                            && x2 > o.position.x + o.hitbox.x + o.hitbox.width
                            && y1 < o.position.y + o.hitbox.y
                            && y2 > o.position.y + o.hitbox.y + o.hitbox.height;
                    });
                };
                return Collision;
            }());
            exports_1("Collision", Collision);
        }
    }
});
