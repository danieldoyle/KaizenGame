"use strict";
cc._RF.push(module, '34cbcoH2ipIqZonoHNuHi+B', 'Platform');
// scripts/Platform.js

"use strict";

var MoveAxis = cc.Enum({
    X: 0,
    Y: 1
});

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 10,
        distance: 200,
        axis: {
            default: MoveAxis.X,
            type: MoveAxis
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this._movedDistance = this.distance / 2;
        this._direction = 1;
        this._movedDiff = 0;
        if (this.axis === MoveAxis.X) {
            this._moveAxis = 0;
        } else {
            this._moveAxis = 1;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        var d = this.speed * this._direction * dt;

        var movedDistance = this._movedDistance + Math.abs(d);
        this._movedDistance += Math.abs(d);

        if (movedDistance > this.distance) {
            d = this.distance - this._movedDistance;
            this._movedDistance = 0;
            this._direction *= -1;
        } else {
            this._movedDistance = movedDistance;
        }

        if (this.axis === MoveAxis.X) {
            this.node.x += d;
        } else {
            this.node.y += d;
        }
        this._movedDiff = d;
    }
});

cc._RF.pop();