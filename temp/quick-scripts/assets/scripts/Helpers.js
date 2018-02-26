(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Helpers.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0e5b9OAGKBLnrQoIoqZV+Kx', 'Helpers', __filename);
// scripts/Helpers.js

"use strict";

if (CC_JSB && cc.runtime) {
    // fix cocos-creator/fireball#3578
    cc.LoaderLayer.setUseDefaultSource(false);
    cc.Dialog.setUseDefaultSource(false);
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getRandomInt: getRandomInt
};

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Helpers.js.map
        