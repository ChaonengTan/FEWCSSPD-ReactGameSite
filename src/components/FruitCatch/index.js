import Fruit from './fruit'
import Paddle from './paddle'

class game{
    constructor(id){
        // canvas
        this.canvas = document.getElementById('fruitCatchCanvas');
        this.ctx = this.canvas.getContext('2d');
        // solids
        this.score = 0
        this.misses = -1
        this.speed = 50
        this.color = 'red'
        // dynamics
        this.fruits = [];
        this.paddle = new Paddle((this.canvas.width - 75) / 2, 75, 10, this.color, 7, this.canvas);
        // event handlers
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        // draw
        this.draw=this.draw.bind(this)
        this.draw()
    }
    // FUNCTIONALS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    collisionDetection() {
        // for every fruit in this.fruit: run this code
        for (let c = 0; c < this.fruits.length; c += 1){
            // if next pos is out of frame:
            if (this.fruits[c].y + this.fruits[c].dy > this.canvas.height - this.fruits[c].radius) {
                // check if it collides with paddle
                if (this.fruits[c].x > this.paddle.x && this.fruits[c].x < this.paddle.x + this.paddle.width) {
                    this.score += 1;
                    this.fruits.splice(c, 1)
                } else { /* if not: add a miss */
                    this.misses += 1;
                    // remove fruit
                    if (this.misses>this.score) {
                        alert('GAME OVER');
                        document.location.reload();
                    }
                }
            }
        }
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    createFruit() {
        this.fruits.push(new Fruit(this.getRandomInt(0, this.canvas.width)))
    }
    fruitLimit(limit) {
        if (this.fruits.length<limit){
            this.createFruit()
        }
    }
    variableFruits() {
        if (this.score>50) {
            this.fruitLimit(1+Math.round(this.score/50))
        } else {
            this.fruitLimit(1)
        }
    }
    // CREATE DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    createGradiant() {
        // skyGrad
        const grd = this.ctx.createLinearGradient(0, 0, 0, 320);
        grd.addColorStop(0, 'cornflowerblue');
        grd.addColorStop(1, 'white');
      
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, 480, 320);
    }
    drawElements() {
        for (let c = 0; c < this.fruits.length; c += 1){
            this.fruits[c].render(this.ctx);
        }
        this.paddle.render(this.ctx)
    }
    moveElements() {
        // moves all fruit
        for (let c = 0; c < this.fruits.length; c += 1){
            this.fruits[c].move()
        }
        this.paddle.move()
    }
    // KEY HANDLERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
    // DRAW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.createGradiant();
        this.drawElements();
        this.collisionDetection();
        this.variableFruits();
        this.moveElements();
        requestAnimationFrame(this.draw)
      }
}

export default game