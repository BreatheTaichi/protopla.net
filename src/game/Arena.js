import putBrick from "./bricks/putBrick.js";
import { drawBody } from "./bricks/shapes.js";
import finishLineCH from "./bricks/finishBounding.js";
import Ship from "./Ship.js";
import times from "./MedalTimes.js";
import fillHUD from "./fillHUD.js";
import dateFormat from "./dateFormat.js";

export default function Arena(
    nameOfMap,
    width,
    height,
    startX,
    startY,
    size,
    shipAngle,
    player
) {
    if (localStorage.getItem(player.name + nameOfMap + "tier") === null)
        localStorage.setItem(player.name + nameOfMap + "tier", 0);
    var tierReached = parseInt(
        localStorage.getItem(player.name + nameOfMap + "tier")
    );
    var recordLapKey = player.name + nameOfMap + "bestlap";
    if (localStorage.getItem(recordLapKey) === null) {
        localStorage.setItem(recordLapKey, 599999);
    }
    var playerCredits = parseInt(localStorage.getItem(player.name + "credits"));
    var playerScore = parseInt(localStorage.getItem(player.name + "score"));

    var arena = {
        // Stop requestAnimationFrame when false
        inGame: true,
        // To stop the beat by time on the first lap
        onFirstLap: true,

        // Number of images not yet loaded, stop loading screen when this hits 0
        numberToLoad: 0,
        loadingMessage: [],

        player: player.name,
        difficulty: player.difficulty,
        showArrows: player.arrows,
        showBackground: player.background,
        showThrustTrail: player.thrustTrail,
        effectsVolume: player.effectsVolume,
        musicVolume: player.musicVolume,
        score: playerScore,
        credits: playerCredits,

        mapName: nameOfMap,

        ship: {},

        // Medal rank
        tier: tierReached,

        // When all three are true the lap is over
        finishLine: false,
        checkLine: false,
        checkPoint: false,

        // graphics
        blocks: [],
        HUDImages: [],
        images: [],
        ellipses: [],
        background: new Image(),
        finishImg: {},
        // Starting point for background
        width: width * size,
        height: height * size,
        // Starting point
        x: startX * size,
        y: startY * size,
        // Canvas context
        context: null,
        // Player window
        screenRatio: window.devicePixelRatio || 1,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        halfSH: window.innerHeight / 2,
        halfSW: window.innerWidth / 2,
        // Brick size
        halfSize: size / 2,
        size: size,

        // Start session and last lap at 9:59.999, currentLap at 0
        sessionBest: 599999,
        lastLap: 599999,
        currentLap: 0,

        recordLapKey: recordLapKey,
        recordLap: parseInt(localStorage.getItem(recordLapKey)),
        // Player beat their record time by:
        beatTimeBy: 0,
        // Timer for popups when players beats a time
        recordLapTimer: 0,
        sessionBestTimer: 0,

        // Makes canvas images for heads up display
        hud: new fillHUD(this),
        // Times to beat for each medal rank
        times: [],
        // Images of medals and time repository
        medalTimes: times(player.difficulty, player.name),

        draw() {
            // Add time, 1000ms/60s
            arena.currentLap = arena.currentLap + 16.666;

            // Move arena based on ship speed
            arena.x += arena.ship.xMomentum;
            arena.y += arena.ship.yMomentum;

            // Move background
            var x1 = (arena.x + arena.width) / 3.5;
            var y1 = (arena.y + arena.height) / 3.5;

            // Fill background, then add background image
            arena.context.fillStyle = "rgb(20, 21, 20)";
            arena.context.fillRect(0, 0, arena.screenWidth, arena.screenHeight);
            arena.context.drawImage(arena.background, x1, y1);

            // Add celestial bodies, finish line graphic, and arrows
            arena.images.forEach((image) => {
                drawBody(image.xStart, image.yStart, image.img, arena);
            });

            arena.ellipses.forEach((o) => {
                var h = o.h + arena.x;
                var k = o.k + arena.y;
                // bounding box: |x - h| > rx or |y - k| > ry

                // d is (x - h)^2/rx^2 + (y - k)^2/ry^2 <= 1
                // x,y is always 0,0
                const d = (h * h) / (o.rx * o.rx) + (k * k) / (o.ry * o.ry);
                // const d = h * h + k * k;
                // const m = o.rx * o.rx * (o.ry * o.ry);
                // TODO More efficient to put the r^2 on the other side of
                // the function.  Multiplication is faster than division.
                // d is huge, though when I do it as above with if (d <= m)
                if (d <= 1) {
                    var xM = this.ship.xMomentum;
                    var yM = this.ship.yMomentum;

                    // Following is arena movement reversed
                    // Angle from center of ellipse
                    var angleFromBody = vectorAngle(-h, -k);
                    // Angle of ship
                    var incomingAngle = vectorAngle(-xM, -yM);

                    // Dividing center point by radius gets the
                    var x = h / o.rx;
                    var y = k / o.ry;
                    arena.x += x;
                    arena.y += y;
                    var magnitude = Math.sqrt(xM * xM + yM * yM);
                    let v = reflectVector(incomingAngle, angleFromBody);
                    // Change arena's momentum
                    this.ship.xMomentum =
                        v.x * magnitude * this.ship.bounceFriction;
                    this.ship.yMomentum =
                        v.y * magnitude * this.ship.bounceFriction;
                    this.ship.boost *= this.ship.bounceFriction;
                }
                // Show the outline of the x value of ellipse making a circle
                // Could make two circles, one with x and one with y
                arena.context.arc(
                    h + arena.halfSW,
                    k + arena.halfSH,
                    o.rx - 40,
                    0,
                    2 * Math.PI
                );
                arena.context.arc(
                    h + arena.halfSW,
                    k + arena.halfSH,
                    o.ry - 40,
                    0,
                    2 * Math.PI
                );
                arena.context.stroke();
            });

            // Check finish line bounding boxes
            finishLineCH(arena);

            // Add bricks
            arena.blocks.forEach(({ x, y, type }) => {
                putBrick(x, y, type, arena);
            });

            // Keep ship between 0 and 180
            if (arena.ship.rotation >= 180) arena.ship.rotation -= 180;
            if (arena.ship.rotation < 0) arena.ship.rotation += 180;

            // Center arena on screen
            arena.context.save();
            arena.context.translate(arena.halfSW, arena.halfSH);

            if (arena.showThrustTrail) {
                // Color thrust depending on level of Alignment Matrix
                var thrustColor =
                    arena.ship.boost * 1500 + 40 > 255
                        ? 255
                        : arena.ship.boost * 1500 + 40;

                // Thruster trail
                arena.ship.thrustArray.forEach((item, index, object) => {
                    arena.context.beginPath();

                    // Give thrust item it's own momentum
                    item.x += item.xm;
                    item.y += item.ym;

                    // Slowly disappear over time
                    arena.context.globalAlpha = 1 - item.time;
                    arena.context.arc(
                        item.x,
                        item.y,
                        10 + 10 * item.time,
                        0,
                        6.28319
                    );
                    // Thruster gradient and color stops
                    var gradient = arena.context.createRadialGradient(
                        item.x,
                        item.y,
                        5,
                        item.x,
                        item.y,
                        15 + 10 * item.time
                    );
                    gradient.addColorStop(
                        0,
                        `rgba(100, ${thrustColor}, 130, .4`
                    );
                    gradient.addColorStop(
                        0.7,
                        `rgba(150, 200, ${thrustColor}, .05`
                    );
                    arena.context.fillStyle = gradient;
                    arena.context.globalAlpha = 1;
                    // Remove thruster item from array after a time
                    item.time += 0.05;
                    if (item.time > 1) {
                        object.splice(index, 1);
                    }
                    arena.context.closePath();
                    arena.context.fill();
                });
            }
            // Draw ship
            arena.context.rotate((arena.ship.rotation * Math.PI * 2) / 180);
            arena.context.drawImage(arena.ship.img, -25, -25);
            arena.context.rotate(-(arena.ship.rotation * Math.PI * 2) / 180);

            arena.context.restore();
            arena.context.beginPath();
            arena.context.fillStyle = "#eee";
            arena.context.font = "25px Verdana";
            arena.context.fillText(
                "Lap " + dateFormat(arena.currentLap),
                17,
                25
            );
            arena.HUDImages.forEach(({ x, y, image }) => {
                arena.context.drawImage(image, x, y);
            });
            arena.context.closePath();

            arena.hud.popups(arena);
        },
    };

    for (let i = 0; i < arena.medalTimes.length; i++) {
        if (arena.medalTimes[i].name === arena.mapName) {
            arena.times = arena.medalTimes[i];
        }
    }

    arena.ship = new Ship(shipAngle, 20, arena);

    arena.hud.record(arena);
    arena.hud.session(arena);
    arena.hud.last(arena);
    arena.hud.credits(arena);

    return arena;
}

function vectorAngle(xUnit, yUnit) {
    var angle = Math.atan(yUnit / xUnit) * (180 / Math.PI);
    if (xUnit < 0 && yUnit >= 0) {
        angle += 180;
    } else if (xUnit < 0 && yUnit < 0) {
        angle += 180;
    } else if (xUnit >= 0 && yUnit < 0) {
        angle += 360;
    }
    return angle;
}

function reflectVector(vector, normal) {
    let vectorRadians = (vector * (2 * Math.PI)) / 360;
    let normalRadians = (normal * (2 * Math.PI)) / 360;
    // r = d - 2(d * n)n  // d * n is dot product
    var r = {};
    r.dx = Math.round(100 * Math.cos(vectorRadians)) / 100;
    r.dy = Math.round(100 * Math.sin(vectorRadians)) / 100;
    r.nx = Math.round(100 * Math.cos(normalRadians)) / 100;
    r.ny = Math.round(100 * Math.sin(normalRadians)) / 100;

    var dDotn = 2 * (r.dx * r.nx + r.dy * r.ny);

    r.x = -Math.round(100 * (r.dx - r.nx * dDotn)) / 100;
    r.y = -Math.round(100 * (r.dy - r.ny * dDotn)) / 100;

    return r;
}
