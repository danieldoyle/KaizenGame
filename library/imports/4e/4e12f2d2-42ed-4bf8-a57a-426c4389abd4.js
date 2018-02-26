"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

'use strict';

var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        jiraPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxJiraDuration: 0,
        minJiraDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        },
        onFireAudio: {
            default: null,
            url: cc.AudioClip
        },
        onFireNode: {
            default: null,
            type: cc.Node
        },
        gameOverDisplay: {
            default: null,
            type: cc.Node
        },
        gameOverAudio: {
            default: null,
            url: cc.AudioClip
        },
        backgroundMusic: {
            default: null,
            url: cc.AudioClip
        },
        sceneActionRoot: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.backgroundMusicId = cc.audioEngine.playMusic(this.backgroundMusic, true);
        this.groundY = this.ground.y + this.ground.height / 2;
        this.timer = 0;
        this.jiraDuration = 0;
        this.spawnNewJIRA();
        this.score = 0;
        this.gameOverDisplay.active = false;
        this.gameOverFlag = false;
    },

    spawnNewJIRA: function spawnNewJIRA() {
        var newJIRA = cc.instantiate(this.jiraPrefab);
        this.node.addChild(newJIRA);
        newJIRA.setPosition(this.getNewJIRAPosition());
        newJIRA.getComponent('JIRA').game = this;
        this.jiraDuration = this.minJiraDuration + cc.random0To1() * (this.maxJiraDuration - this.minJiraDuration);
        this.timer = 0;
    },

    getNewJIRAPosition: function getNewJIRAPosition() {
        var randX = 0;
        var randY = Helpers.getRandomInt(-100, 100);
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        return cc.p(randX, randY);
    },

    // called every frame
    update: function update(dt) {
        if (this.timer > this.jiraDuration) {
            if (!this.gameOverFlag) {
                this.gameOver();
            }
            return;
        }
        this.timer += dt;
    },

    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Sprint Capacity: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
        if (this.score % 5 === 0) {
            cc.audioEngine.playEffect(this.onFireAudio, false);
            this.onFireNode.active = true;
        }
    },

    restart: function restart() {
        cc.director.loadScene('game');
    },

    gameOver: function gameOver() {
        cc.audioEngine.stopMusic(this.backgroundMusicId);
        this.gameOverFlag = true;
        this.player.stopAllActions();
        cc.audioEngine.playEffect(this.gameOverAudio, false);
        this.gameOverDisplay.active = true;
        this.sceneActionRoot.active = false;
    }
});

cc._RF.pop();