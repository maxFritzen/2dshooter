
import kontra, { init, angleToTarget, Sprite, GameLoop } from 'kontra';
import { Player } from './player'
import { Enemy } from './enemy'
import { collision } from './helper-functions'
import '../styles.css'

kontra.initKeys();

const newPlayer = new Player(
  150,
  250,
  'blue',
  5,
  25,
  2,
  10
)
const createEnemy = () => new Enemy(
  50,
  50,
  'red',
  10,
  25,
  0.3,
  10,
  newPlayer
)

export let projectiles = []

export function createProjectile (x, y, angle) {
  const projectile = Sprite({
    id: x + y + angle, 
    x: x,
    y: y,
    width: 5,
    height: 2,
    rotation: angle,
    dx: Math.cos(angle) * 2.5,
    dy: Math.sin(angle) * 2.5,
    color: 'green',
    ttl: 100,
    update () {
      
      for (const enemy of gameState.getEnemies()) {
        if (collision(this, enemy)) {
            // collision detected!
            console.log('bang')
            enemy.hit(5);
            this.ttl = 0;
            projectiles = projectiles.filter((s) => s.id !== this.id)
            break
        }
      }

      this.advance()    
    }
  })
  return projectile
}

class GameState {
  constructor () {
    this.level = 0;
    this.enemies = [];
    this.projectiles = [];
    this.player = newPlayer
  }

  incProjectiles (x, y, angle) {
    const newProjectile = createProjectile(x, y, angle)
    this.projectiles.push(newProjectile)
  }

  removeProjectiles () {
    this.projectiles = this.projectiles.filter(sprite => sprite.isAlive())
  }

  incEnemies () {
    this.enemies.push(createEnemy())
  }

  removeEnemies () {
    this.enemies = this.enemies.filter(sprite => sprite.isAlive())
  }

  getLevel () {
    return this.level
  }

  getEnemies () {
    return this.enemies
  }

  getProjectiles () {
    return this.projectiles
  }

  getPlayer () {
    return this.player
  }

}
export const gameState = new GameState()
gameState.incEnemies()

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    gameState.getPlayer().update();
    gameState.getEnemies().map(sprite => sprite.update())
    gameState.getProjectiles().map(sprite => sprite.update())
    gameState.removeEnemies()
    gameState.removeProjectiles()
  },
  render: function() { // render the game state
    gameState.getPlayer().render();
    gameState.getEnemies().map(sprite => sprite.render())
    gameState.getProjectiles().map(sprite => sprite.render())
  }
});

loop.start();    // start the game