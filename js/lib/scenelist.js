System.register([], function(exports_1) {
    "use strict";
    var SceneList;
    return {
        setters:[],
        execute: function() {
            SceneList = (function () {
                function SceneList() {
                    this.array = [];
                }
                SceneList.prototype.add = function (scene) {
                    array.push(scene);
                };
                return SceneList;
            }());
            exports_1("SceneList", SceneList);
        }
    }
});
