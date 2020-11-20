import { Howl } from "howler";
import bumpMP3 from "../audio/bump.mp3";
import bumpOGG from "../audio/bump.ogg";
import bumpWAV from "../audio/bump.wav";
import mBrick from "./metalBrick.js";
var bump = new Howl({
    src: [bumpMP3, bumpOGG, bumpWAV],
});

let brickSize = 40;
let halfBrick = brickSize / 2;
var metalBrick = mBrick(brickSize);

export default function putBrick(x, y, type, arena) {
    let ship = arena.ship;
    x += arena.x;
    y += arena.y;
    // Bounding box for screen, skip bricks out of view
    if (
        x < -arena.halfSW - arena.size ||
        x > arena.halfSW + arena.size ||
        y < -arena.halfSH - arena.size ||
        y > arena.halfSH + arena.size
    ) {
        return;
    }

    if (type === "metal") {
        const x2 = x + arena.halfSW;
        const y2 = y + arena.halfSH;
        arena.context.translate(x2 - halfBrick, y2 - halfBrick);
        arena.context.drawImage(metalBrick, 0, 0);
        arena.context.translate(-x2 + halfBrick, -y2 + halfBrick);
    }

    // Bounding box for brick
    if (
        y - arena.halfSize - ship.radius < 0 &&
        y + arena.halfSize + ship.radius > 0 &&
        x - arena.halfSize - ship.radius < 0 &&
        x + arena.halfSize + ship.radius > 0
    ) {
        var bounceVolume =
            (Math.abs(ship.xMomentum) + Math.abs(ship.yMomentum)) / 25;
        bump.volume(bounceVolume * arena.effectsVolume);
        bump.play();
        ship.yMomentum *= ship.bounceFriction;
        ship.xMomentum *= ship.bounceFriction;
        ship.boost *= ship.bounceFriction;
        // Check distance to block
        const xVal = 0 > x ? -x : x;
        const yVal = 0 > y ? -y : y;
        // Bounce from closest distance
        if (xVal > yVal) {
            ship.xMomentum *= -1;
            0 < x
                ? (arena.x = arena.x - x + arena.halfSize + ship.radius)
                : (arena.x = arena.x - x - arena.halfSize - ship.radius);
        } else if (yVal > xVal) {
            ship.yMomentum *= -1;
            0 < y
                ? (arena.y = arena.y - y + arena.halfSize + ship.radius)
                : (arena.y = arena.y - y - arena.halfSize - ship.radius);
        }
        return;
    }
}
