import { Sprite } from 'kontra';


export class Obj extends Sprite.class {
  constructor (x, y, color, width, height, speed, hp) {
    super();
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.anchor = {x: 0.5, y: 0.5}
    this.speed = speed;
    this.hp = hp;
  }
  stayInsideMap () {
    const { canvas } = this.context
    if (this.x <= 0) this.x = 1;
    if (this.x + this.width >= this.canvas.width) {
      this.x = this.canvas.width - this.width
    }
    if (this.y <= 0) this.y = 1;
    if (this.y + (this.height / 2) >= this.canvas.height) {
      this.y = this.canvas.height - this.height
    }
  }
  hit(dmg) {
    console.log('hit', dmg, this.hp)
    this.hp -= dmg
    if (this.hp <= 0) {
      this.ttl = 0;
    }
  }
  update () {
    this.move()
    this.stayInsideMap()
  }
} 