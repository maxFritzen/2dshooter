import { keyPressed, degToRad } from 'kontra'
import { Obj } from './Object'
import { gameState } from './index'

export class Player extends Obj {
  constructor (x, y, color, width, height, speed, hp) {
    super(x, y, color, width, height, speed, hp)
    this.shootingSpeedInterval = null
  }
  move() {
    if (keyPressed('left')) {
      this.rotation += degToRad(-4);
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      this.dx = cos * 0.5;
      this.dy = sin * 0.5;
    } else if (keyPressed('right')) {
      this.rotation += degToRad(4);
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      this.dx = cos * 0.5;
      this.dy = sin * 0.5;
    } 
      
    if (keyPressed('up')) {
      this.advance(this.speed);
    } else if (keyPressed('down')) {
      this.advance(-this.speed * 0.7);
    }

    if (keyPressed('space')) {
      console.log(this.shootingSpeedInterval)
      if (this.shootingSpeedInterval) return
      console.log('shoot')
      gameState.incProjectiles(this.x, this.y, this.rotation)
      this.shootingSpeedInterval = setTimeout(() => {
        this.shootingSpeedInterval = null
      }, 1000)
      
    }
  } 

}