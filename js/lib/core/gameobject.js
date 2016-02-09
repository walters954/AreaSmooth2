System.register([], function(exports_1) {
    "use strict";
    var GameObject;
    return {
        setters:[],
        execute: function() {
            /**
             * Holds core parameters needed to render/manage a game object.
             */
            GameObject = (function () {
                function GameObject() {
                    this.type = 'GameObject';
                    this.hitbox = { width: 64, height: 64, x: -32, y: -32 };
                    //Position of GameObject.
                    this.position = { x: 0, y: 0 };
                    this.velocity = { x: 0, y: 0 };
                    //An angle in degrees.
                    this.rotation = 0;
                    this.depth = 0;
                }
                GameObject.prototype.isColliding = function (target) {
                    if (target)
                        return !(((this.position.y + this.hitbox.y + this.hitbox.height) < (target.position.y + target.hitbox.y)) ||
                            (this.position.y + this.hitbox.y > (target.position.y + target.hitbox.height + target.hitbox.y)) ||
                            ((this.position.x + this.hitbox.x + this.hitbox.width) < target.position.x + target.hitbox.x) ||
                            (this.position.x + this.hitbox.x > (target.position.x + target.hitbox.width + target.hitbox.y)));
                    return false;
                };
                return GameObject;
            }());
            exports_1("GameObject", GameObject);
        }
    }
});
