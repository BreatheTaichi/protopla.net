import { Howl } from "howler";
import sessionBestWAV from "./audio/sessionBest.wav";
import recordLapWAV from "./audio/recordLap.wav";
import lapWAV from "./audio/notification.wav";
var sessionBest = new Howl({
    src: [sessionBestWAV],
});
var recordLap = new Howl({
    src: [recordLapWAV],
});
var lap = new Howl({
    src: [lapWAV],
});

export function diagonalRight(x, y, len, type, arena) {
    for (let i = 0; i < len; i++) {
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: (y + i) * arena.size,
            type,
        });
    }
}

export function diagonalLeft(x, y, len, type, arena) {
    for (let i = 0; i < len; i++) {
        arena.blocks.push({
            x: (x - i) * arena.size,
            y: (y + i) * arena.size,
            type,
        });
    }
}

export function arc(cx, cy, angleFrom, angleTo, radius, type, arena) {
    var points = [];
    // angle is the number of degrees between each check to place a block
    // 55 / radius seems to stop there from being holes, but doesn't cause
    // too many extra to be placed.
    var angle = 55 / radius;
    for (let i = angleFrom; i < angleTo; i += angle) {
        var match = false;
        var radian = i * 0.0174532925;
        var x = Math.round(Math.cos(radian) * radius) + cx;
        var y = Math.round(Math.sin(radian) * radius) + cy;
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
        }
    }
}

export function circle(cx, cy, radius, type, arena) {
    var points = [];
    var angle = 55 / radius;
    for (let i = 0; i < 360; i += angle) {
        var match = false;
        var radian = i * 0.0174532925;
        var x = Math.round(Math.cos(radian) * radius) + cx;
        var y = Math.round(Math.sin(radian) * radius) + cy;
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
        }
    }
}

export function ellipse(cx, cy, a, b, type, arena) {
    var points = [];
    var angle = 0.3;
    for (let i = 0; i < 360; i += angle) {
        var match = false;
        var x =
            cx +
            Math.round(
                (a * b) / Math.sqrt(b * b + a * a * Math.tan(i) * Math.tan(i))
            );
        var y =
            cy +
            Math.round(
                (a * b * Math.tan(i)) /
                    Math.sqrt(b * b + a * a * Math.tan(i) * Math.tan(i))
            );
        var x2 =
            cx -
            Math.round(
                (a * b) / Math.sqrt(b * b + a * a * Math.tan(i) * Math.tan(i))
            );
        var y2 =
            cy -
            Math.round(
                (a * b * Math.tan(i)) /
                    Math.sqrt(b * b + a * a * Math.tan(i) * Math.tan(i))
            );
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
            arena.blocks.push({
                x: x2 * arena.size,
                y: y2 * arena.size,
                type: type,
            });
        }
    }
}

export function square(x, y, size, type, arena) {
    for (let i = 0; i < size; i++) {
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: y * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: x * arena.size,
            y: (y + i) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: (y + size) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (x + size) * arena.size,
            y: (y + i) * arena.size,
            type: type,
        });
    }
    arena.blocks.push({
        x: (x + size) * arena.size,
        y: (y + size) * arena.size,
        type: type,
    });
}

export function rectangle(xStart, yStart, xEnd, yEnd, type, arena) {
    const xLen = xEnd - xStart;
    const yLen = yEnd - yStart;
    for (let i = 0; i < xLen; i++) {
        arena.blocks.push({
            x: (xStart + i) * arena.size,
            y: yStart * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (xStart + i) * arena.size,
            y: yEnd * arena.size,
            type: type,
        });
    }
    for (let i = 0; i < yLen; i++) {
        arena.blocks.push({
            x: xStart * arena.size,
            y: (yStart + i) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: xEnd * arena.size,
            y: (yStart + i) * arena.size,
            type: type,
        });
    }
}

export function verticalLine(x, y, length, type, arena) {
    const l = length >= 0 ? 1 : -1;
    for (let i = 0; i < length; i++) {
        arena.blocks.push({
            x: x * arena.size,
            y: (y + i * l) * arena.size,
            type: type,
        });
    }
}

export function horizontalLine(x, y, length, type, arena) {
    const l = length >= 0 ? 1 : -1;
    for (let i = 0; i < Math.abs(length); i++) {
        arena.blocks.push({
            x: (x + i * l) * arena.size,
            y: y * arena.size,
            type: type,
        });
    }
}

export function borderBox(arena) {
    arena.context.lineWidth = 4;
    for (let i = 0; i < arena.size; i += 2) {
        let h = Math.round(i / 4.2);
        arena.context.strokeStyle = "#" + h + h + h;

        arena.context.beginPath();
        // Top Left
        arena.context.moveTo(
            arena.x + i + arena.halfSW - arena.halfSize * arena.border.addX,
            arena.y + i + arena.halfSH - arena.halfSize * arena.border.addY
        );
        // Top Right
        arena.context.lineTo(
            arena.x -
                i +
                arena.width +
                arena.halfSW +
                arena.halfSize +
                arena.size,
            arena.y +
                i +
                arena.halfSH -
                arena.halfSize +
                arena.size * arena.border.addY -
                arena.size
        );
        // Bottom Right
        arena.context.lineTo(
            arena.x -
                i +
                arena.width +
                arena.halfSW +
                arena.halfSize +
                arena.size,
            arena.y -
                i +
                arena.height +
                arena.halfSH +
                arena.halfSize +
                arena.size
        );
        // Bottom Left
        arena.context.lineTo(
            arena.x +
                i +
                arena.halfSW +
                arena.size * arena.border.addX -
                arena.halfSize -
                arena.size,
            arena.y -
                i +
                arena.height +
                arena.halfSH +
                arena.halfSize +
                arena.size
        );
        // Top Left
        arena.context.lineTo(
            arena.x +
                i +
                arena.halfSW -
                arena.halfSize +
                arena.size * arena.border.addX -
                arena.size,
            arena.y +
                i +
                arena.halfSH -
                arena.halfSize +
                arena.size * arena.border.addY -
                arena.size
        );
        // arena.context.closePath();
        arena.context.stroke();
    }
    // Starting point is (addX, addY)
    if (arena.x > -arena.size * arena.border.addX) {
        arena.ship.xMomentum *= -1;
        arena.x = -arena.size * arena.border.addX;
        arena.ship.yMomentum *= arena.ship.bounceFriction;
        arena.ship.xMomentum *= arena.ship.bounceFriction;
        arena.ship.extraAccel = 0;
    }
    if (arena.y > -arena.size * arena.border.addY) {
        arena.ship.yMomentum *= -1;
        arena.y = -arena.size * arena.border.addY;
        arena.ship.yMomentum *= arena.ship.bounceFriction;
        arena.ship.xMomentum *= arena.ship.bounceFriction;
        arena.ship.extraAccel = 0;
    }
    if (arena.x < -arena.width) {
        arena.ship.xMomentum *= -1;
        arena.x = -arena.width;
        arena.ship.yMomentum *= arena.ship.bounceFriction;
        arena.ship.xMomentum *= arena.ship.bounceFriction;
        arena.ship.extraAccel = 0;
    }
    if (arena.y < -arena.height) {
        arena.ship.yMomentum *= -1;
        arena.y = -arena.height;
        arena.ship.yMomentum *= arena.ship.bounceFriction;
        arena.ship.xMomentum *= arena.ship.bounceFriction;
        arena.ship.extraAccel = 0;
    }
}

export function drawBody(x, y, image, arena) {
    // var width = image.width / arena.size / 1.6;
    // var height = image.height / arena.size / 1.6;
    var width = image.width;
    var height = image.height;
    x = x * arena.size + arena.x;
    y = y * arena.size + arena.y;
    // Bounding box for screen, skip images out of view
    if (
        x < -arena.halfSW - width ||
        x > arena.halfSW + width ||
        y < -arena.halfSH - height ||
        y > arena.halfSH + height
    ) {
        return;
    }
    arena.context.drawImage(
        image,
        arena.halfSW + x,
        arena.halfSH + y
        // width,
        // height
    );
}

export function finishLineCH(arena) {
    let start = arena.finishImg.x * arena.size + arena.x + arena.halfSize;
    let end = arena.finishImg.len * arena.size - arena.size;
    let yVal = arena.finishImg.y * arena.size + arena.y + arena.halfSize;

    // Context for arena finishline checkpoint testing.
    // Open all blocks with context to use this.
    // arena.context.save();
    // arena.context.translate(start + arena.halfSW, yVal + arena.halfSH);

    if (
        0 > yVal - arena.halfSize &&
        0 < yVal &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        arena.finishLine = true;
        if (arena.finishLine && arena.checkPoint && arena.checkLine) {
            arena.lastLap = arena.currentLap;
            arena.currentLap = 0;
            // If last lap is faster than the session best, set new
            // session best.  If last lap is faster than record lap
            // set new record lap and play recordLap.wav, if new play
            // session best sessionBest.wav else play notification.wav
            if (arena.lastLap < arena.sessionBest) {
                if (arena.lastLap < arena.recordLap) {
                    recordLap.volume(arena.effectsVolume);
                    recordLap.play();
                    arena.recordLapTimer = 1;
                    arena.beatTimeBy = arena.recordLap - arena.lastLap;
                    arena.recordLap = arena.lastLap;
                    arena.sessionBest = arena.lastLap;
                    localStorage.setItem(arena.recordLapKey, arena.recordLap);
                } else {
                    sessionBest.volume(arena.effectsVolume);
                    sessionBest.play();
                    arena.sessionBestTimer = 1;
                    arena.beatTimeBy = arena.sessionBest - arena.lastLap;
                    arena.sessionBest = arena.lastLap;
                }
            } else {
                lap.volume(arena.effectsVolume);
                lap.play();
            }
            arena.checkPoint = false;
        }
        arena.checkLine = false;
    }

    // Checkline
    if (
        0 > yVal &&
        0 < yVal + arena.halfSize &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.checkPoint) arena.checkLine = true;
        arena.finishLine = false;
    }
    // arena.checkLine
    //     ? (arena.context.fillStyle = "#222")
    //     : (arena.context.fillStyle = "#ddd");
    // arena.context.beginPath();
    // arena.context.rect(-arena.halfSize, 0, arena.size + end, arena.halfSize);
    // arena.context.fill();
    // arena.context.closePath();

    // Checkpoint Top
    if (
        0 > yVal - arena.halfSize + arena.size &&
        0 < yVal + arena.size &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.finishLine) arena.checkPoint = true;
    }

    // arena.checkPoint
    //     ? (arena.context.fillStyle = "#ddd")
    //     : (arena.context.fillStyle = "#222");
    // arena.context.beginPath();
    // arena.context.rect(
    //     -arena.halfSize,
    //     -arena.halfSize + arena.size,
    //     arena.size + end,
    //     arena.halfSize
    // );
    // arena.context.fill();
    // arena.context.closePath();

    // Checkpoint Bottom
    if (
        0 > yVal + arena.size &&
        0 < yVal + arena.halfSize &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.finishLine) arena.checkPoint = false;
    }

    // arena.checkPoint
    //     ? (arena.context.fillStyle = "#222")
    //     : (arena.context.fillStyle = "#ddd");
    // arena.context.beginPath();
    // arena.context.rect(
    //     -arena.halfSize,
    //     arena.size,
    //     arena.size + end,
    //     arena.halfSize
    // );
    // arena.context.fill();
    // arena.context.closePath();

    // arena.context.translate(-(start + arena.halfSW), -(yVal + arena.halfSH));
    // arena.context.restore();
}
