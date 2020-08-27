import { Obj } from './Object'
import { collision } from './helper-functions';
import { gameState } from './index';

export class Enemy extends Obj {
  constructor (x, y, color, width, height, speed, hp, target, id) {
    super(x, y, color, width, height, speed, hp)
    this.target = target
    this.y = Math.floor(Math.random() * this.context.canvas.height)
    this.limit = 30
    this.id = id
    this.direction = ''
  }

  move() {
    
    // this.dx = this.target.x - this.x;
    // this.dy = this.target.y - this.y;

    // this.rotation = Math.atan2(this.dy,this.dx);
  
    // thought: Maybe just be able to move up or down?
    // Maybe 4px at the time?
    let newX = this.x
    let newY = this.y
    let direction = this.direction // up,down,right,left
    const targetX = Math.floor(this.target.x)
    const targetY = Math.floor(this.target.y)
    
    // Check if collision
    // loop through every enemy? what? maybe just random?Dont need to do this on every update either
    if (this.limit < 0) {
      console.log(this.rotation * 180/Math.PI)
      let direction = this.direction // up,down,right,left
      const targetX = Math.floor(this.target.x)
      const targetY = Math.floor(this.target.y)

      if (this.x < targetX) {
        direction = 'right'
        newX += 1 
      }
      if (this.x > targetX) {
        direction = 'left'
        newX -= 1 
      }
      if (this.y < targetY) {
        direction = 'down'
        newY += 1
      }
      if (this.y > targetY) {
        direction = 'up'
        newY -= 1
      }
      this.direction = direction

      // check collision
      const enemies = gameState.getEnemies()
      for (let i = 0; i <= enemies.length - 1; i++) {
        const newValues = {
          height: this.height * 2,
          width: this.width * 2,
          x: newX,
          y: newY
        }
        if (enemies[i].id !== this.id && collision(newValues, enemies[i])) {
          const collidingEnemyX = enemies[i].x
          const collidingEnemyY = enemies[i].y
          switch (direction) {
            case 'right': {
              if (newX < collidingEnemyX) {
                newX = newX - 10
              }
              break;
            }
            case 'left': {
              if (newX > collidingEnemyX) {
                newX = newX + 10
              }
              break;
            }
            case 'up': {
             
              if (newY < collidingEnemyY) {
                newY = newY - 10
              } 
              break;
            }
            case 'down': {
              if (newY > collidingEnemyY) {
                newY = newY + 10
              } 
              break;
            }
            default: {
              break;
            }
          }
          
        } 
       
      }

      this.x = newX
      this.y = newY
      this.rotation = Math.atan2(this.dy,this.dx);
      
      this.limit = 30
    } 
    

    this.limit--
    
    
    
  }
}