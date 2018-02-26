"use strict";
cc._RF.push(module, '0e5b9OAGKBLnrQoIoqZV+Kx', 'Helpers');
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