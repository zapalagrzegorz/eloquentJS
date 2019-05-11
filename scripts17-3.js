"use strict";
// Use the requestAnimationFrame technique that we saw in Chapter 14 and Chapter 16
// to draw a box with a bouncing ball in it. The ball moves
// at a constant speed and bounces off the box’s sides when it hits them.
// <canvas width="400" height="400"></canvas>
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(other) {
        return new Vec(this.x + other.x, this.y + other.y);
    }
    times(factor) {
        return new Vec(this.x * factor, this.y * factor);
    }
}
class Ball {
    constructor(pos = new Vec(200, 40), speed = new Vec(6, 10)) {
        this.pos = pos;
        this.speed = speed;
    }
    update(time) {
        const newPos = this.pos.plus(this.speed.times(time));
        if (newPos.x > 360 || newPos.x < 40 || newPos.y < 40 || newPos.y > 360) {
            const newBall = new Ball(newPos, this.speed.times(-1));
            return newBall;
        }
        return new Ball(newPos, this.speed);
    }
}
const state = {
    ball: new Ball(),
};
// let ball = new Ball();
const cx = document.querySelector('canvas').getContext('2d');
let lastTime = 0;
const ballY = 40;
const isDirectionUp = false;
let x = 100;
let y = 300;
const radius = 10;
let speedX = 100;
let speedY = 60;
function frame(time) {
    if (lastTime != 0) {
        updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
function updateAnimation(step) {
    cx.clearRect(0, 0, 400, 400);
    cx.fillStyle = 'gray';
    cx.strokeStyle = 'blue';
    cx.lineWidth = 4;
    cx.strokeRect(25, 25, 350, 350);
    //   cx.fillStyle = 'green';
    //   cx.beginPath();
    //   // center=(50,50) radius=40 angle=0 to 7
    //   if (isDirectionUp) {
    //     if (ballY - 1 > 45) {
    //       ballY--;
    //     } else {
    //       isDirectionUp = !isDirectionUp;
    //     }
    //   }
    //   if (!isDirectionUp) {
    //     if (ballY + 1 < 360) {
    //       ballY++;
    //     } else {
    //       isDirectionUp = !isDirectionUp;
    //     }
    //   }
    state.ball = state.ball.update(step * 50);
    cx.beginPath();
    cx.arc(state.ball.pos.x, state.ball.pos.y, 40, 0, 7);
    //   cx.clearRect(0, 0, 400, 400);
    cx.fillStyle = 'green';
    cx.fill();
    //   x += step * speedX;
    //   y += step * speedY;
    //   if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
    //   if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
    //   cx.fillStyle = 'red';
    //   cx.beginPath();
    //   cx.arc(x, y, radius, 0, 7);
    //   cx.fill();
}
