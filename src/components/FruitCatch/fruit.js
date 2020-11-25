/* eslint-disable linebreak-style */
class Fruit {
    constructor(x, y = -20, radius = 20, color = 'red', dx = 0, dy = 4) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.dx = dx;
      this.dy = dy;
    }
  
    move() {
      this.x += this.dx;
      this.y += this.dy;
    }
  
    render(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }
  
  export default Fruit;
  