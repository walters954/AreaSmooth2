System.register([], function(exports_1) {
    "use strict";
    var SceneManager;
    return {
        setters:[],
        execute: function() {
            SceneManager = (function () {
                function SceneManager() {
                    this.array = [];
                }
                SceneManager.prototype.add = function (scene) {
                    this.array.push(scene);
                };
                return SceneManager;
            }());
            exports_1("SceneManager", SceneManager);
        }
    }
});
