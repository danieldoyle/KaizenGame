(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Wall.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a2b3f5uwVtHVIBc6yw9BGmd', 'Wall', __filename);
// scripts/Wall.js

"use strict";

var WallType = cc.Enum({
    Left: 0,
    Right: 1,
    Top: 2,
    Bottom: 3
});

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: WallType.Left,
            type: WallType
        },

        width: 5
    },

    // use this for initialization
    start: function start() {
        var collider = this.getComponent(cc.BoxCollider);
        if (!collider) {
            return;
        }

        var node = this.node;
        var type = this.type;

        var width = cc.winSize.width;
        var height = cc.winSize.height;

        var wallWidth = this.width;

        if (type === WallType.Left) {
            node.height = height;
            node.width = wallWidth;
            node.x = 0;
            node.y = height / 2;
        } else if (type === WallType.Right) {
            node.height = height;
            node.width = wallWidth;
            node.x = width;
            node.y = height / 2;
        } else if (type === WallType.Top) {
            node.width = width;
            node.height = wallWidth;
            node.x = width / 2;
            node.y = height;
        } else if (type === WallType.Bottom) {
            node.width = width;
            node.height = wallWidth;
            node.x = width / 2;
            node.y = 0;
        }

        collider.size = node.getContentSize();
    }
});

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
        //# sourceMappingURL=Wall.js.map
        