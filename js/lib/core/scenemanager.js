System.register([], function(exports_1) {
    "use strict";
    var SceneManager;
    return {
        setters:[],
        execute: function() {
            SceneManager = (function () {
                function SceneManager() {
                    this.array = [];
                    this.index = 0;
                }
                SceneManager.prototype.add = function (scene) {
                    scene.scenemanager = this;
                    this.array.push(scene);
                };
                SceneManager.prototype.current = function () {
                    return this.array[this.index];
                };
                SceneManager.prototype.next = function () {
                    this.index = Math.max(0, Math.min(this.index + 1, this.array.length));
                    ;
                };
                SceneManager.prototype.previous = function () {
                    this.index = Math.max(0, Math.min(this.index - 1, this.array.length));
                    ;
                };
                SceneManager.prototype.goto = function (level) {
                    this.index = Math.max(0, Math.min(level, this.array.length));
                    ;
                };
                return SceneManager;
            }());
            exports_1("SceneManager", SceneManager);
        }
    }
});
