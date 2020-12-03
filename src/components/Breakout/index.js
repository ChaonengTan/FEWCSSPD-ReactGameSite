/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-alert */

// import classes
import Ball from './ball.js';
import Brick from './bricks.js';
import Paddle from './paddle.js';

class game{
  constructor(id){
    // canvas
    this.canvas = document.getElementById('myCanvas');
    // References
    this.ctx = this.canvas.getContext('2d');
    this.bricksColumnCount = 5;
    this.bricksRowCount = 3;
    this.bricks = [];
    this.lives = 3;
    this.score = 0;
    this.infoColor = 'red';
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 30, 10, 'red');
    this.paddle = new Paddle((this.canvas.width - 75) / 2, 75, 10, 'red', 7, this.canvas);
    this.isRunning = true
    // Initialize Bricks
    this.createBricks();
    // Event Handlers
    // document.addEventListener('mousemove', (e) => {this.mouseMoveHandler(e)}, false);
    // ^^ This would also work
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
    document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    this.draw=this.draw.bind(this)
    this.draw()
  }

  createBricks() {
    for (let c = 0; c < this.bricksColumnCount; c += 1) {
      this.bricks[c] = [];
      for (let r = 0; r < this.bricksRowCount; r += 1) {
        this.bricks[c][r] = new Brick(c, r);
      }
    }
  }

  createGradiant() {
    // skyGrad
    const grd = this.ctx.createLinearGradient(0, 0, 0, 320);
    grd.addColorStop(0, 'cornflowerblue');
    grd.addColorStop(1, 'white');
  
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, 480, 320);
  }

  drawCloud(xposition, yposition) {
    // cloud
    this.ctx.beginPath();
    this.ctx.arc(xposition, yposition, 30, 0, Math.PI * 2);
    this.ctx.arc(xposition + 30, yposition, 25, 0, Math.PI * 2);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }

  drawBG() {
    this.createGradiant();
    this.drawCloud(100, 60);
    this.drawCloud(300, 100);
  }

  drawBall() {
    this.ball.render(this.ctx);
  }
  drawPaddle() {
    this.paddle.render(this.ctx);
  }
  drawLives() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = this.infoColor;
    this.ctx.fillText(`Lives: ${this.lives}`, this.canvas.width - 65, 20);
  }
  drawScore() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = this.infoColor;
    this.ctx.fillText(`Score: ${this.score}`, 8, 20);
  }
  drawBricks() {
    for (let c = 0; c < this.bricksColumnCount; c += 1) {
      for (let r = 0; r < this.bricksRowCount; r += 1) {
        if (this.bricks[c][r].status === 1) {
          this.ctx.beginPath();
          this.ctx.rect(this.bricks[c][r].x, this.bricks[c][r].y, this.bricks[c][r].width, this.bricks[c][r].height);
          this.ctx.fillStyle = this.infoColor;
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
  drawElements() {
    this.drawBall();
    this.drawPaddle();
    this.drawLives();
    this.drawScore();
    this.drawBricks();
  }
  moveElements() {
    this.ball.move();
    this.paddle.move();
  }
  stop(){
    this.isRunning = false
    document.removeEventListener('mousemove', this.mouseMoveHandler, false);
    document.removeEventListener('keydown', this.keyDownHandler, false);
    document.removeEventListener('keyup', this.keyUpHandler, false);
  }
  // assisters
  wallsCollison() {
    // walls, misses, subtracts lives
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.lives -= 1;
        if (!this.lives) {
          alert('GAME OVER');
          document.location.reload();
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = (this.canvas.width - this.paddle.width) / 2;
        }
      }
    }
  }
  collisionDetection() {
    for (let c = 0; c < this.bricksColumnCount; c += 1) {
      for (let r = 0; r < this.bricksRowCount; r += 1) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (this.ball.x > b.x && this.ball.x < b.x + b.width && this.ball.y > b.y && this.ball.y < b.y + b.height) {
            this.ball.dy = -this.ball.dy;
            b.status = 0;
            this.score += 1;
            if (this.score === this.bricksRowCount * this.bricksColumnCount) {
              alert('YOU WIN, CONGRATULATIONS!');
              document.location.reload();
            }
          }
        }
      }
    }
  }
  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.x = relativeX - this.paddle.width / 2;
    }
  }
  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.paddle.keyPressed = 'right';
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.paddle.keyPressed = 'left';
    }
  }
  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.paddle.keyPressed = 'none';
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.paddle.keyPressed = 'none';
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.drawBG();
    this.drawElements();
    this.collisionDetection();
    this.wallsCollison();
    this.moveElements();
    console.log("gameIsRunning")
    if (this.isRunning){
      requestAnimationFrame(this.draw)
      console.log("RequestedAnimationFrame")
    }
    console.log("gameStillRunning")
    // requestAnimationFrame(this.draw)
  }
}

// export classes
export default game;
