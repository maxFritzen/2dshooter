import { Obj } from './Object'
import { collision } from './helper-functions';
import { gameState } from './index';

export class Enemy extends Obj {
  constructor (x, y, color, width, height, speed, hp, target, id) {
    super(x, y, color, width, height, speed, hp) 
    this.target = target
    // this.y = Math.floor(Math.random() * this.context.canvas.height)
    this.id = id
    this.direction = ''
    this.originalSpeed = this.width
    this.limit = this.originalSpeed
    this.hp = this.width + this.height
  }

  move() {
    
    // this.dx = this.target.x - this.x;
    // this.dy = this.target.y - this.y;

    // this.rotation = Math.atan2(this.dy,this.dx);
  
    // thought: Maybe just be able to move up or down?
    // Maybe 4px at the time?
    let newX = this.x
    let newY = this.y
    
    // Check if collision
    // loop through every enemy? what? maybe just random?Dont need to do this on every update either
    if (this.limit < 0) {
      let direction = this.direction // up,down,right,left
      const targetX = Math.floor(this.target.x)
      const targetY = Math.floor(this.target.y)

      if (this.x <= targetX) {
        direction = 'right'
        newX += 1 
      }
      if (this.x >= targetX) {
        direction = 'left'
        newX -= 1 
      }
      if (this.y <= targetY) {
        direction = 'down'
        newY += 1
      }
      if (this.y >= targetY) {
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
              if (newX <= collidingEnemyX) {
                newX -= 1
              }
              break; 
            }
            case 'left': {
              if (newX >= collidingEnemyX) {
                newX += 1
              }
              break;
            }
            case 'up': {
             
              if (newY < collidingEnemyY) {
                newY -= 1
              } 
              break;
            }
            case 'down': {
              if (newY > collidingEnemyY) {
                newY += 1
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
      
      this.limit = this.originalSpeed + this.hp
    } 
    

    this.limit--
    
    
    
  }
}