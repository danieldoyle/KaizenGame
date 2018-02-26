"use strict";
cc._RF.push(module, '24cfbU8JZ1GoJhmflhnflqz', 'Camera');
// scripts/Camera.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        target: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.active = !cc.sys.isMobile;

        if (!this.target) {
            return;
        }
        var follow = cc.follow(this.target, cc.rect(0, 0, 500, 500));
        this.node.runAction(follow);
    }
});

cc._RF.pop();