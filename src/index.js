
import kontra, { init, angleToTarget, Sprite, GameLoop } from 'kontra';
import '../styles.css'

let { canvas, context } = init();
kontra.initKeys();

class Obj extends Sprite.class {
  constructor (x, y, color, width, height, speed) {
    super();
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.anchor = {x: 0.5, y: 0.5}
    this.speed = speed;
  }
  stayInsideMap () {
    if (this.x <= 0) this.x = 1;
    if (this.x + this.width >= this.context.canvas.width) {
      this.x = this.context.canvas.width - this.width
    }
    if (this.y <= 0) this.y = 1;
    if (this.y + (this.height / 2) >= this.context.canvas.height) {
      this.y = this.context.canvas.height - this.height
    }
  }
  update () {
    this.move()
    this.stayInsideMap()
  }
} 


class Enemy extends Obj {
  constructor (x, y, color, width, height, speed, target) {
    super(x, y, color, width, height, speed)
    this.target = target
  }

  move() {
    
    this.dx = this.target.x - this.x;
    this.dy = this.target.y - this.y;

    this.rotation = Math.atan2(this.dy,this.dx);

    if (this.x <= this.target.x) this.x += 1 * this.speed;
    if (this.x >= this.target.x) this.x -= 1 * this.speed;
    if (this.y <= this.target.y) this.y += 1 * this.speed;
    if (this.y >= this.target.y) this.y -= 1 * this.speed;
    
  }
}

class Player extends Obj {
  constructor (x, y, color, width, height, speed) {
    super(x, y, color, width, height, speed)
  }
  move() {
    if (kontra.keyPressed('left')) {
      this.rotation += kontra.degToRad(-4);
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      this.dx = cos * 0.5;
      this.dy = sin * 0.5;
    } else if (kontra.keyPressed('right')) {
      this.rotation += kontra.degToRad(4);
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      this.dx = cos * 0.5;
      this.dy = sin * 0.5;
    } 
      
    if (kontra.keyPressed('up')) {
      this.advance(this.speed);
    } else if (kontra.keyPressed('down')) {
      this.advance(-this.speed * 0.7);
    }
  }
}

const newPlayer = new Player(
  150,
  250,
  'blue',
  5,
  25,
  2
)

const enemy = new Enemy(
  50,
  50,
  'red',
  10,
  25,
  0.3,
  newPlayer
)
let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    enemy.update();
    newPlayer.update();
  },
  render: function() { // render the game state
    newPlayer.render();
    enemy.render();
  }
});

loop.start();    // start the game