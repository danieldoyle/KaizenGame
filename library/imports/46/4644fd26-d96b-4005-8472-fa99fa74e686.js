"use strict";
cc._RF.push(module, '4644f0m2WtABYRy+pn6dOaG', 'JIRA');
// scripts/JIRA.js

'use strict';

var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 0,
        game: {
            default: null,
            serializable: false
        },
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
    },

    getPlayerDistance: function getPlayerDistance() {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    },

    onPicked: function onPicked() {
        this.game.spawnNewJIRA();
        this.game.gainScore();
        this.node.destroy();
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        this.onPicked();
    },

    // called every frame
    update: function update(dt) {
        if (this.game.gameOverFlag) {
            this.node.destroy();
        }
        var opacityRatio = 1 - this.game.timer / this.game.jiraDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
        this.node.rotation += 5;
    }
});

cc._RF.pop();