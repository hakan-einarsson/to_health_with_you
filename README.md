# To Health With You!
Entry for the js13kgames game jam

You play a 13th-century apothecary stranded on an island after a house call. A boat is coming in the morning; you just have to survive the night. 
However, this night is swarming with the undead. Using the logic that what's healthy for the living must harm the undead, you fight them off with your medicines.

## How To Play

At your disposal, you have:   
- Ginger Shot as your main attack. Ranged, single-target with a 0.5-second cooldown. Your basic immune booster. Harms the undead.
- Vitamin Bomb. Affects all targets in the area of the explosion. Loaded with all the goodness for a healthy life. Lethal to the undead.
- Turmeric Cloud. A cloud that slows down the undead within the area. Normally used to cure bad joints, increasing mobility.

Movement is done with W, S, A, D. Cooldowns are visible in the upper part of the screen, to the right of the health bar.
- Shoot Ginger Shot with your left mouse button.
- Target Vitamin-C Bomb with space. Left-click at the desired location.
- Target Turmeric Cloud with 'e' or 'q'. Left-click at the desired location.

You get a score multiplier for killing several zombies in one shot, and if you survive to the end, you get a bonus as well.

## Technologies

- I used [pixeldudesmaker](https://0x72.itch.io/pixeldudesmaker) to make the charcter sprites
- [zzfx](https://github.com/KilledByAPixel/ZzFX) for sounds
- [Kontra.js](https://github.com/straker/kontra) is also used.

## Installation

1. Clone the repo or download the game from the releases.
2. Run `npm install` to get all dependencies.
3. Run `npm run build` to bouild the game. Serve dist/index.html or run `npm run preview`






