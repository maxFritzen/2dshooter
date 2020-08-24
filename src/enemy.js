import { Obj } from './Object'

export class Enemy extends Obj {
  constructor (x, y, color, width, height, speed, hp, target) {
    super(x, y, color, width, height, speed, hp)
    this.target = target
  }

  move() {
    // return
    this.dx = this.target.x - this.x;
    this.dy = this.target.y - this.y;

    this.rotation = Math.atan2(this.dy,this.dx);

    if (this.x <= this.target.x) this.x += 1 * this.speed;
    if (this.x >= this.target.x) this.x -= 1 * this.speed;
    if (this.y <= this.target.y) this.y += 1 * this.speed;
    if (this.y >= this.target.y) this.y -= 1 * this.speed;
  }
}