## Instructions

Race through the solar system getting credits when you beat a medal time. Use the credits to upgrade your ship.

Choose Test as difficulty on a new player to open the game with all planets available and extra credits.

Use arrow keys to play, or press a button on your gamepad when you are on the course menu to use a gamepad.

All menus can be controlled by arrow keys.

## Influences

Subspace (Continuum)

Pod Racer

Stunt Race FX trial mode

Dirt 3

## Known Issues

Gamepad must be activated on the course screen or it won't work.

When a gamepad is connected and player hits escape, the window comes up, but is invisible. Probably has to do with the way I disallowed simultaneus keyboard and gamepad use so that the player can't double movements. Maybe a fix would be to check for the movement and add the change in after instead of changing in either.
Just saw that the timer is still firing when in game, should shut it off as I enter. Also game engine still runs..???

Course menu doesn't reset on screen resize.

Webps needed in fallbacks in canvas.

Safari gets stuck on image.onLoad.

Firefox doesn't open level when it's icon is focused and player clicks again.

Please let me know if you find any more!

## TODOs and upgrades

Ellipse bounding box for celestial bodies that has more realistic bounce.

Load modules with React.lazy

Performance options:

• Option to turn off thrust / make a simpler thrust trail.

• Option to turn off background image, possibly make a simple generated background with some stars that would take less processor than moving a huge image.

Gamepad usable on menus for more seamless experience.

Max screen size so player doesn't see past background image if they are on a large screen. Then I could get rid of the background fill and save some processing.

Option to turn on names of bodies in race for better learning experience.

Add random loading messages with different facts about each level.

Bonus level with Pluto, protoplanets and asteroids. Unlocked after beating a level, or getting a certain amount of points.

Set of easy levels and set of hard levels.

New ship / block graphics.

Type of block for long lines that don't jank when moving fast.

Create shape.js function for line of blocks that isn't straight.

Add player name to some screens.

Rotate screen around central axis so ship stays facing up... without it being a nauseating experience. Rotation is easy, but haven't found out how to do it in a good way that doesn't turn the stomach. May not be necessary, play test showed that people get used to it pretty quickly, and static screen _seems_ to be a better experience for viewing the graphics.
