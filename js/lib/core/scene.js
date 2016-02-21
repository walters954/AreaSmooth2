System.register([], function(exports_1) {
    "use strict";
    var Scene;
    return {
        setters:[],
        execute: function() {
            Scene = (function () {
                function Scene(viewport, width, height) {
                    this.viewport = viewport;
                    this.width = width;
                    this.height = height;
                    this.array = [];
                }
                //Destroys a given instance in the scene.
                Scene.prototype.destroy = function (gameObject) {
                    this.array = this.array.filter(function (g) { return g !== gameObject; });
                };
                // Adds a given object the the scene.
                Scene.prototype.add = function (gameObject) {
                    this.array.push(gameObject);
                };
                // returns an array of all objects of a given type.
                Scene.prototype.findObjectOfType = function (type) {
                    return this.array.filter(function (o) { return 'type' in o && o.type === type; });
                };
                // Delegating the Scene manager to control the current scene.
                Scene.prototype.next = function () {
                    this.scenemanager.next();
                };
                Scene.prototype.previous = function () {
                    this.scenemanager.previous();
                };
                Scene.prototype.goto = function (level) {
                    this.scenemanager.goto(level);
                };
                Scene.prototype.current = function () {
                    this.scenemanager.current;
                };
                return Scene;
            }());
            exports_1("Scene", Scene);
        }
    }
});
