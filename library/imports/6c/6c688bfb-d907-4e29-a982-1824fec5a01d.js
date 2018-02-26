"use strict";
cc._RF.push(module, '6c688v72QdOKamCGCT+xaAd', 'Player');
// scripts/Player.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        speed: cc.v2(0, 0),
        maxSpeed: cc.v2(2000, 2000),
        gravity: -2000,
        drag: 1000,
        direction: 0,
        jumpSpeed: 700,
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.onKeyPressed.bind(this),
            onKeyReleased: this.onKeyReleased.bind(this)
        }, this.node);

        this.collisionX = 0;
        this.collisionY = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();

        this.touchingNumber = 0;

        var self = this;
    },

    onEnable: function onEnable() {
        cc.director.getCollisionManager().enabled = true;
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
    },

    onKeyPressed: function onKeyPressed(keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                if (this.direction != -1) {
                    this.direction = -1;
                    var sprite = this.getComponent(cc.Sprite);
                    sprite.spriteFrame = this.spriteList[0];
                }
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                if (this.direction != 1) {
                    this.direction = 1;
                    var sprite = this.getComponent(cc.Sprite);
                    sprite.spriteFrame = this.spriteList[1];
                }
                break;
            case cc.KEY.w:
            case cc.KEY.up:
                if (!this.jumping) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
                    cc.audioEngine.playEffect(this.jumpAudio, false);
                }
                break;
        }
    },

    onKeyReleased: function onKeyReleased(keyCode, event) {
        switch (keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
            case cc.KEY.d:
            case cc.KEY.right:
                this.direction = 0;
                break;
        }
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group === 'JIRA') {
            return;
        }
        this.touchingNumber++;

        // 1st step 
        // get pre aabb, go back before collision
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone();

        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();

        // 2nd step
        // forward x-axis, check whether collision on x-axis
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.x < 0 && selfPreAabb.xMax > otherPreAabb.xMax) {
                this.node.x = otherPreAabb.xMax - this.node.parent.x;
                this.collisionX = -1;
            } else if (this.speed.x > 0 && selfPreAabb.xMin < otherPreAabb.xMin) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width - this.node.parent.x;
                this.collisionX = 1;
            }

            this.speed.x = 0;
            other.touchingX = true;
            return;
        }

        // 3rd step
        // forward y-axis, check whether collision on y-axis
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            if (this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                this.node.y = otherPreAabb.yMax - this.node.parent.y;
                this.jumping = false;
                this.collisionY = -1;
            } else if (this.speed.y > 0 && selfPreAabb.yMin < otherPreAabb.yMin) {
                this.node.y = otherPreAabb.yMin - selfPreAabb.height - this.node.parent.y;
                this.collisionY = 1;
            }

            this.speed.y = 0;
            other.touchingY = true;
        }
    },

    onCollisionStay: function onCollisionStay(other, self) {
        if (other.node.group === 'JIRA') {
            return;
        }

        if (this.collisionY === -1) {
            if (other.node.group === 'Platform') {
                var motion = other.node.getComponent('Platform');
                if (motion) {
                    if (motion._moveAxis == 0) {
                        this.node.x += motion._movedDiff;
                    } else {
                        this.node.y += motion._movedDiff;
                    }
                }
            }
        }
    },

    onCollisionExit: function onCollisionExit(other) {
        if (other.node.group === 'JIRA') {
            return;
        }

        this.touchingNumber--;

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        } else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
            this.jumping = true;
        }
    },

    update: function update(dt) {
        if (this.collisionY === 0) {
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                this.speed.y = this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }
        }

        if (this.direction === 0) {
            if (this.speed.x > 0) {
                this.speed.x -= this.drag * dt;
                if (this.speed.x <= 0) this.speed.x = 0;
            } else if (this.speed.x < 0) {
                this.speed.x += this.drag * dt;
                if (this.speed.x >= 0) this.speed.x = 0;
            }
        } else {
            this.speed.x += (this.direction > 0 ? 1 : -1) * this.drag * dt;
            if (Math.abs(this.speed.x) > this.maxSpeed.x) {
                this.speed.x = this.speed.x > 0 ? this.maxSpeed.x : -this.maxSpeed.x;
            }
        }

        if (this.speed.x * this.collisionX > 0) {
            this.speed.x = 0;
        }

        this.prePosition.x = this.node.x;
        this.prePosition.y = this.node.y;

        this.preStep.x = this.speed.x * dt;
        this.preStep.y = this.speed.y * dt;

        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    }
});

cc._RF.pop();