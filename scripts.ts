// Use the requestAnimationFrame technique that we saw in Chapter 14 and Chapter 16
// to draw a box with a bouncing ball in it. The ball moves
// at a constant speed and bounces off the box’s sides when it hits them.

// <canvas width="400" height="400"></canvas>

class Vec {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  plus(other: Vec) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  times(factorX: number = 1, factorY: number = 1) {
    return new Vec(this.x * factorX, this.y * factorY);
  }
}

class Ball {
  pos: Vec;

  speed: Vec;

  radius: number = 20;

  speedX = 5;

  speedY = 3;

  constructor(pos: Vec = new Vec(200, 50), speed: Vec = new Vec(5, 3)) {
    this.pos = pos;
    this.speed = speed;
  }

  update(time: number) {
    // let newBall;
    const newPos = this.pos.plus(this.speed.times(time, time));
    // const speed = {x: 5, y: 3};
    if (newPos.x > 335) {
      this.speed.x = -5;
    } else if (newPos.x < 50) {
      this.speed.x = 5;
    }
    if (newPos.y <= 50) {
      this.speed.y = 3;
    } else if (newPos.y >= 320) {
      this.speed.y = -3;
    }
    return new Ball(newPos, new Vec(this.speed.x, this.speed.y));
  }
}

const state = {
  ball: new Ball(),
};

// let ball = new Ball();
const cx = document.querySelector('canvas')!.getContext('2d')!;

let lastTime = 0;

function frame(time: number) {
  if (lastTime != 0) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step: number) {
  cx.clearRect(0, 0, 400, 400);
  cx.fillStyle = 'gray';

  cx.strokeStyle = 'blue';
  cx.lineWidth = 4;
  cx.strokeRect(10, 10, 350, 350);
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
  state.ball = state.ball.update(step * 20);
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
