// Exports everything from the core library.
System.register(['./core/gameobject', './core/renderer', './core/scene', './core/scenemanager'], function(exports_1) {
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
            function (gameobject_1_1) {
                exportStar_1(gameobject_1_1);
            },
            function (renderer_1_1) {
                exportStar_1(renderer_1_1);
            },
            function (scene_1_1) {
                exportStar_1(scene_1_1);
            },
            function (scenemanager_1_1) {
                exportStar_1(scenemanager_1_1);
            }],
        execute: function() {
        }
    }
});
