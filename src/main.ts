import { init, GameLoop, initKeys, Text, Sprite, initPointer } from 'kontra';
import loadImageAssets from './AssetLoader';
import Tileset from './Tileset';
import generatePermTable  from './Perlin/PermutationTable';
import Tilemap from './Tilemap';
import getPlayer from './Player';
import handleInput from './InputHandler';
import getFilteredObstacles from './ObastacleHandler';
import spawnZombie from './ZombieSpawner';
import { getHealthBar, getScoreCounter, getTopBar } from './UIElements';

async function main() {
  const groundTiles = await loadImageAssets();
  const backgroundCanvas = document.getElementById('background') as HTMLCanvasElement;
  const backgroundCtx = backgroundCanvas.getContext('2d') as CanvasRenderingContext2D;
  const textCanvas = document.getElementById('text') as HTMLCanvasElement;
  const textCtx = textCanvas.getContext('2d') as CanvasRenderingContext2D;
  const TILE_SIZE = 16;
  const tileset = new Tileset(TILE_SIZE, groundTiles, {
    'grass': { x: 0, y: 0 },
    'sand': { x: 1, y: 0 },
    'rock': { x: 2, y: 0 },
    'water': { x: 3, y: 0 }
  });
  //seed with a random number from 3 to 100
  const perm = generatePermTable(4);

  //generating game mape
  const tilemap = new Tilemap(Math.floor(backgroundCanvas.width * 8), Math.floor(backgroundCanvas.height * 12), tileset);
  const generatedMap = await tilemap.generateMap(perm);
  if(!generatedMap) throw new Error('Map generation failed.');

  //initializing kontra
  let { canvas } = init();

  //initializing player
  const centerOfMap = [tilemap.width / 2, tilemap.height / 2];
  console.log(centerOfMap)
  const player = getPlayer(tilemap.width/2, tilemap.height/2, canvas);
  console.log(player.gx, player.gy)
  const filteredObstacles = getFilteredObstacles(tilemap.obstacles, player.getExtendedBounds(TILE_SIZE), TILE_SIZE);
  player.setBoundingObstacles(filteredObstacles);

  //initializing zombies
  const zombies: Sprite[] = [];

  //initializing UI
  const uiItems: Sprite[] = [];
  uiItems.push(getHealthBar(player, textCtx));
  uiItems.push(getScoreCounter(player, textCtx, textCanvas.width));
  uiItems.push(getTopBar(canvas.width));
  


  //setting up background
  let mapSection = getMapSection(tilemap, player, backgroundCanvas);
  backgroundCtx.putImageData(mapSection, 0, 0);



  //d
  initKeys();
  initPointer();
  

  // for debugging fps counter
  const fpsCounter = Text({
    text: 'FPS: 0',
    font: '10px Arial',
    color: 'black',
    x: 20,
    y: 20,
    anchor: {x: 0.5, y: 0.5},
    textAlign: 'center'
  });

  let frameCount = 0;
  let startTime = Date.now();

  let zombieTimer = 0;
  
  let loop = GameLoop({  // create the main game loop
    update: function(dt) { // update the game state
      //FPS counter
      frameCount++;
      // Calculate elapsed time in seconds
      let elapsed = (Date.now() - startTime) / 1000;
    
      // Calculate FPS every second
      if (elapsed >= 1) {
        let fps = frameCount / elapsed;
        fpsCounter.text = `FPS: ${Math.round(fps)}`;
        // Reset counters
        frameCount = 0;
        startTime = Date.now();
      }

      zombieTimer += dt;
      if(zombieTimer >= 5){
        zombies.push(spawnZombie(player, canvas, TILE_SIZE * 2, getFilteredObstacles(tilemap.obstacles, player.getScreenBounds(), TILE_SIZE)));
        zombieTimer = 0;
      }

      //update map
      mapSection = getMapSection(tilemap, player, backgroundCanvas);
      
      handleInput(player);

      player.setBoundingObstacles(getFilteredObstacles(tilemap.obstacles, player.getExtendedBounds(TILE_SIZE), TILE_SIZE));
      player.update(dt);

      zombies.forEach((zombie, index) => {
        if(zombie.getDistanceToTarget() > canvas.width * 1.5) zombie.health = 0;
        if(zombie.getDistanceToTarget() < player.radius && !zombie.onCooldown) {
          player.takeDamage(zombie.damage);
          player.isTakingDamage = true;
          zombie.onCooldown = true;
          zombie.cooldownCounter = 0;
        } else if(zombie.onCooldown) {
          zombie.cooldownCounter += dt;
          if(zombie.cooldownCounter >= zombie.cooldownTime) {
            zombie.onCooldown = false;
          }
        }
        if(zombie.health <= 0) {
          zombies.splice(index, 1);
          return;
        }
        let zombieFilteredObstacles = getFilteredObstacles(tilemap.obstacles, zombie.getExtendedBounds(TILE_SIZE), TILE_SIZE);
        zombie.setBoundingObstacles(zombieFilteredObstacles);
        zombie.update(dt);
      });

      uiItems.forEach((item) => {
        item.update();
      });

    },
    render: function() { // render the game state
      textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      // fpsCounter.render();
      backgroundCtx.putImageData(mapSection, 0, 0);
      player.render();
      zombies.forEach((zombie) => {
        zombie.render();
      });
      uiItems.forEach((item) => {
        item.render();
      });

    }
  });

  loop.start();    // start the game
}

main();

function getMapSection(tilemap: Tilemap, player: Sprite, canvas: HTMLCanvasElement){
  return tilemap.getMapSection(
    player.gx - (canvas.width / 2),
    player.gy - (canvas.height / 2),
    canvas.width,
    canvas.height
  );
}
