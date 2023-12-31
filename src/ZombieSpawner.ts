import { Sprite, SpriteSheet } from "kontra";
import { getZombie } from "./SpriteFactory";
import { Position } from "./Interfaces";

export default function spawnZombie(player: Sprite, canvas: HTMLCanvasElement, tileSize: number, obstacles: Position[], animations: SpriteSheet['animations']): Sprite {
    const safeDistance = tileSize * 2; // 32 pixels away
    const viewportBounds = {
      left: player.gx - (canvas.width / 2) + safeDistance,
      right: player.gx + (canvas.width / 2) - safeDistance,
      top: player.gy - (canvas.height / 2) + safeDistance,
      bottom: player.gy + (canvas.height / 2) - safeDistance,
    };

    let speed = Math.random() * (70 - 30) + 30;
  
    
    let x = Math.random() * (viewportBounds.right - viewportBounds.left) + viewportBounds.left;
    let y = Math.random() * (viewportBounds.bottom - viewportBounds.top) + viewportBounds.top;

    do {
        x = Math.random() * (viewportBounds.right - viewportBounds.left) + viewportBounds.left;
        y = Math.random() * (viewportBounds.bottom - viewportBounds.top) + viewportBounds.top;
      } while (isTooCloseToPlayer(x, y, player, safeDistance) || isInsideObstacle(x, y, obstacles, tileSize));

    return getZombie(x, y, player, canvas, speed, animations)
  }

  function isTooCloseToPlayer(x: number, y: number, player: Sprite, safeDistance: number) {
    return Math.abs(x - player.gx) < safeDistance && Math.abs(y - player.gy) < safeDistance;
  }
  
  function isInsideObstacle(x: number, y: number, obstacles: Position[], tileSize: number) {
    const radius = 7;
    for (let obstacle of obstacles) {
      if (x + radius > obstacle.x && x < obstacle.x + tileSize && y + radius > obstacle.y && y < obstacle.y + tileSize) {
        return true;
      }
    }
    return false;
  }