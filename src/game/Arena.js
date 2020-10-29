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
        player: player,
        difficulty: difficulty,

        bounce: null,
        gameStart: false,

        effectsVolume: 1,
        musicVolume: 1,

        ship: new Ship(shipAngle, 20, player),

        mapName: nameOfMap,
        // finish line
        finishLine: false,
        checkLine: false,
        checkPoint: false,
        inGame: true,

        // brick size
        halfSize: size / 2,
        size: size,

        blocks: [],
        HUDImages: [],
        background: new Image(),
        images: [],
        border: {},
        finishImg: {},

        loading: true,
        loadingMessage: "",

        numberToLoad: 0,

        // Arena size
        width: width * size,
        height: height * size,

        // Starting point
        x: startX * size,
        y: startY * size,

        context: null,

        screenRatio: window.devicePixelRatio || 1,
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,

        halfSH: window.innerHeight / 2,
        halfSW: window.innerWidth / 2,

        onFirstLap: true,

        sessionBest: 599999,
        lastLap: 599999,
        lapStart: 0,
        lapEnd: 0,
        currentLap: 0,

        recordLapKey: recordLapKey,
        recordLap: parseInt(localStorage.getItem(recordLapKey)),

        // Player beat their record time by:
        beatTimeBy: 0,
        recordLapTimer: 0,
        sessionBestTimer: 0,
        times: [],

        hud: new fillHUD(this),

        medalTimes: times(difficulty, player),

        tier: tierReached,
        credits: playerCredits,

        draw() {
            arena.currentLap = arena.currentLap + 16 + 2 / 3;

            arena.x += arena.ship.xMomentum;
            arena.y += arena.ship.yMomentum;

            var x1 = ((arena.x / arena.width) * arena.screenWidth) / 3.5;
            var y1 = ((arena.y / arena.height) * arena.screenHeight) / 3.5;

            arena.context.fillStyle = "rgb(34, 34, 34)";
            arena.context.fillRect(0, 0, arena.screenWidth, arena.screenHeight);
            arena.context.drawImage(arena.background, x1, y1);

            arena.images.forEach((image) => {
                drawBody(image.xStart, image.yStart, image.img, arena);
            });

            finishLineCH(arena);

            arena.blocks.forEach(({ x, y, type }) => {
                putBrick(x, y, type, arena);
            });

            if (arena.ship.rotation >= 180) arena.ship.rotation -= 180;
            if (arena.ship.rotation < 0) arena.ship.rotation += 180;

            arena.context.save();
            arena.context.translate(arena.halfSW, arena.halfSH);
            var thrustColor =
                arena.ship.boost * 1500 + 40 > 255
                    ? 255
                    : arena.ship.boost * 1500 + 40;
            // Thruster trail
            arena.ship.thrustArray.forEach((item, index, object) => {
                arena.context.beginPath();
                item.x += arena.ship.xMomentum;
                item.y += arena.ship.yMomentum;
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
                // Remove after a time
                item.time += 0.1;
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

    arena.hud.record(arena);
    arena.hud.session(arena);
    arena.hud.last(arena);
    arena.hud.credits(arena);

    return arena;
}
