import putBrick from "./bricks/putBrick.js";
import { drawBody, finishLineCH } from "./shapes.js";
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
    player,
    difficulty
) {
    if (localStorage.getItem(player + nameOfMap + "tier") === null)
        localStorage.setItem(player + nameOfMap + "tier", 0);
    var tierReached = parseInt(
        localStorage.getItem(player + nameOfMap + "tier")
    );
    var recordLapKey = player + nameOfMap + "bestlap";
    if (localStorage.getItem(recordLapKey) === null) {
        localStorage.setItem(recordLapKey, 599999);
    }
    var playerCredits = parseInt(localStorage.getItem(player + "credits"));

    var arena = {
        // players name and difficulty
        player: player,
        difficulty: difficulty,

        effectsVolume: 1,
        musicVolume: 1,

        ship: {},

        mapName: nameOfMap,
        // When all three are true the lap is over
        finishLine: false,
        checkLine: false,
        checkPoint: false,

        // Stop requestAnimationFrame when false
        inGame: true,

        // brick size
        halfSize: size / 2,
        size: size,

        // graphics
        blocks: [],
        HUDImages: [],
        images: [],
        background: new Image(),
        finishImg: {},

        // Number of images not yet loaded, stop loading screen when this hits 0
        numberToLoad: 0,
        loadingMessage: [],

        // Arena size and starting point for background
        width: width * size,
        height: height * size,

        // Starting point
        x: startX * size,
        y: startY * size,

        // canvas context
        context: null,

        screenRatio: window.devicePixelRatio || 1,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        halfSH: window.innerHeight / 2,
        halfSW: window.innerWidth / 2,

        // To stop the beat by time on the first lap
        onFirstLap: true,

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

        // Times to beat for each medal rank
        times: [],
        // Images of medals and time repository
        medalTimes: times(difficulty, player),

        // Makes canvas images for heads up display
        hud: new fillHUD(this),

        // Medal rank
        tier: tierReached,
        credits: playerCredits,

        draw() {
            // Add time, 1000ms/60s
            arena.currentLap = arena.currentLap + 16 + 2 / 3;
            // Move arena based on ship speed
            arena.x += arena.ship.xMomentum;
            arena.y += arena.ship.yMomentum;
            // Move background
            var x1 = (arena.x - arena.halfSW + arena.width) / 3.5;
            var y1 = (arena.y - arena.halfSH + arena.height) / 3.5;

            // arena.context.fillStyle = "rgb(34, 34, 34)";
            // arena.context.fillRect(0, 0, arena.screenWidth, arena.screenHeight);
            arena.context.drawImage(arena.background, x1, y1);
            // Add celestial bodies, finish line, and arrows
            arena.images.forEach((image) => {
                drawBody(image.xStart, image.yStart, image.img, arena);
            });
            // Check finish line
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
            // Color thrust depending on Alignment Matrix level
            var thrustColor =
                arena.ship.boost * 1500 + 40 > 255
                    ? 255
                    : arena.ship.boost * 1500 + 40;
            // Thruster trail
            arena.ship.thrustArray.forEach((item, index, object) => {
                arena.context.beginPath();
                item.xm += this.ship.xMomentum / 22;
                item.x += item.xm;
                item.ym += this.ship.yMomentum / 22;
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
                var gradient = arena.context.createRadialGradient(
                    item.x,
                    item.y,
                    5,
                    item.x,
                    item.y,
                    15 + 10 * item.time
                );
                gradient.addColorStop(0, `rgba(100, ${thrustColor}, 130, .4`);
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

    if (localStorage.getItem(player + "effectsVolume") !== null) {
        arena.effectsVolume = localStorage.getItem(player + "effectsVolume");
    }

    if (localStorage.getItem(player + "musicVolume") !== null) {
        arena.musicVolume = localStorage.getItem(player + "musicVolume");
    }

    for (let i = 0; i < arena.medalTimes.length; i++) {
        if (arena.medalTimes[i].name === arena.mapName) {
            arena.times = arena.medalTimes[i];
        }
    }

    arena.ship = new Ship(shipAngle, 20, player, arena);

    arena.hud.record(arena);
    arena.hud.session(arena);
    arena.hud.last(arena);
    arena.hud.credits(arena);

    return arena;
}
