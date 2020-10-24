import putBrick from "./putBrick.js";
import { drawBody, finishLineCH } from "./shapes.js";
import Ship from "./Ship.js";

function rads(x) {
    return (Math.PI * x) / 180;
}

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
    var playerCredits = parseInt(localStorage.getItem(player + "credits"));
    var arena = {
        player: player,
        difficulty: difficulty,

        bounce: null,
        gameStart: false,

        effectsVolume: 1,
        musicVolume: 1,

        // ship: new Ship(shipAngle, 20, 3, 0.71, 0.001, 0.19, 0.97, 0.5),
        ship: new Ship(shipAngle, 20, player),

        mapName: nameOfMap,
        // finish line
        finishLine: false,
        checkLine: false,
        checkPoint: false,
        inGame: false,

        // brick size
        halfSize: size / 2,
        size: size,

        blocks: [],
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

        lastLap: 0,
        lapStart: 0,
        lapEnd: 0,
        currentLap: 0,
        recordLap: 0,
        sessionBest: 0,
        // lastLap: new Date(),
        // lapStart: new Date(Date.now()),
        // lapEnd: new Date(),
        // currentLap: new Date(0),
        // recordLap: new Date(),
        // sessionBest: new Date(),

        // Player beat their record time by:
        beatTimeBy: 0,
        recordLapTimer: 0,
        sessionBestTimer: 0,

        recordLapKey: player + nameOfMap + "bestlap",

        tier: tierReached,
        credits: playerCredits,

        draw() {
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
                    rads(360)
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
                arena.context.fillStyle = gradient; //"#fff";
                arena.context.globalAlpha = 1;
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
            // arena.context.fillStyle = `rgba(100, 200, 255, ${shieldOpacity})`;
            // arena.context.beginPath();
            // arena.context.arc(0, 0, arena.ship.radius + 20, 0, 2 * Math.PI);
            // arena.context.closePath();
            // arena.context.fill();

            arena.context.restore();
        },
    };

    if (localStorage.getItem(arena.recordLapKey) === null) {
        localStorage.setItem(arena.recordLapKey, 599999);
    }
    if (localStorage.getItem(arena.recordLapKey) === null) {
        arena.recordLap = 599999;
        // arena.recordLap.setTime(599999);
    } else {
        arena.recordLap = localStorage.getItem(arena.recordLapKey);
    }
    arena.lastLap = 599999;
    arena.sessionBest = 599999;
    // arena.lastLap.setTime(599999);
    // arena.sessionBest.setTime(599999);

    if (localStorage.getItem(player + "effectsVolume") !== null) {
        arena.effectsVolume = localStorage.getItem(player + "effectsVolume");
    }
    if (localStorage.getItem(player + "musicVolume") !== null) {
        arena.musicVolume = localStorage.getItem(player + "musicVolume");
    }

    return arena;
}
