import { verticalLine, horizontalLine } from "../shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import lunaPNG from "../images/earth/luna.png";
import earthPNG from "../images/earth/earth.png";
import backgroundPic from "../images/background/dragons.jpg";
import alienShipPNG from "../images/ships/alienShip.png";
import arrowPNG from "../images/icons/courseArrow.png";
import loadingImage from "../images/loading/earth.jpg";

export default function earth(arena) {
    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);
    var luna = loadImageToCanvas(1520, 1520, lunaPNG, arena);
    var earth = loadImageToCanvas(1800, 1800, earthPNG, arena);
    var background = loadImageToCanvas(4508, 3430, backgroundPic, arena);
    var arrow0 = loadImageToCanvas(150, 150, arrowPNG, arena, 45);
    arena.images.push({ img: arrow0, xStart: 86, yStart: 10 });
    var arrow1 = loadImageToCanvas(150, 150, arrowPNG, arena, -15);
    arena.images.push({ img: arrow1, xStart: 56, yStart: 9 });
    var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 90);
    arena.images.push({ img: arrow2, xStart: 59, yStart: 57 });
    var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 195);
    arena.images.push({ img: arrow3, xStart: 53, yStart: 75 });
    var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, 225);
    arena.images.push({ img: arrow4, xStart: 10, yStart: 74 });
    var arrow5 = loadImageToCanvas(150, 150, arrowPNG, arena, 0);
    arena.images.push({ img: arrow5, xStart: 12, yStart: 50 });
    var arrow6 = loadImageToCanvas(150, 150, arrowPNG, arena, 290);
    arena.images.push({ img: arrow6, xStart: 40, yStart: 43 });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Earth, the third planet in the solar system, and home to " +
            "the only known life in the universe. ",
        "Earth's moon also makes an appearance here, though " +
            "it would be much smaller in comparison to Earth if " +
            "it was scaled properly.",
        "In the background you will see the Dragon Nebula, NGC 6188 ",
    ];
    arena.links = [
        {
            text: "Mor info on Earth: ",
            link: "https://solarsystem.nasa.gov/planets/earth/overview/",
        },
        {
            text: "More info Earth's Moon from NASA: ",
            link: "https://solarsystem.nasa.gov/moons/earths-moon/overview/",
        },
        {
            text:
                "To see more about the Dragon Nebula NGC 6188, and more " +
                "work from the artist Tian Lee, go to: ",
            link: "https://apod.nasa.gov/apod/ap181107.html",
        },
    ];
    arena.ship.img = alienShip;
    arena.background = background;
    arena.images.push({
        img: earth,
        xStart: 1,
        yStart: 1,
        width: earth.width,
        height: earth.height,
    });
    arena.images.push({
        img: luna,
        xStart: 52.9,
        yStart: 11,
        width: luna.width,
        height: luna.height,
    });

    arena.finishImg = { x: 46, y: 22, len: 9 };

    // Outer Box
    var lunaBlocks = [
        // luna starting at left wall, counterclockwise to top wall
        { x: 2, y: 28 },
        { x: 2, y: 29 },
        { x: 3, y: 30 },
        { x: 3, y: 31 },
        { x: 3, y: 32 },
        { x: 4, y: 33 },
        { x: 4, y: 34 },
        { x: 5, y: 35 },
        { x: 6, y: 36 },
        { x: 6, y: 37 },
        { x: 7, y: 38 },
        { x: 8, y: 39 },
        { x: 9, y: 40 },
        { x: 10, y: 41 },
        { x: 11, y: 41 },
        { x: 12, y: 42 },
        { x: 13, y: 42 },
        { x: 14, y: 43 },
        { x: 15, y: 43 },
        { x: 16, y: 44 },
        { x: 17, y: 44 },
        { x: 18, y: 44 },
        { x: 19, y: 45 },
        { x: 20, y: 45 },
        { x: 21, y: 45 },
        { x: 22, y: 45 },
        { x: 23, y: 45 },
        { x: 24, y: 45 },
        { x: 25, y: 45 },
        { x: 26, y: 45 },
        { x: 27, y: 45 },
        { x: 28, y: 45 },
        { x: 29, y: 44 },
        { x: 30, y: 44 },
        { x: 31, y: 44 },
        { x: 32, y: 43 },
        { x: 33, y: 43 },
        { x: 34, y: 42 },
        { x: 34, y: 42 },
        { x: 35, y: 42 },
        { x: 36, y: 41 },
        { x: 37, y: 40 },
        { x: 38, y: 39 },
        { x: 39, y: 38 },
        { x: 40, y: 37 },
        { x: 41, y: 36 },
        { x: 41, y: 35 },
        { x: 42, y: 34 },
        { x: 42, y: 33 },
        { x: 43, y: 32 },
        { x: 43, y: 31 },
        { x: 44, y: 30 },
        { x: 44, y: 29 },
        { x: 44, y: 28 },
        { x: 44, y: 27 },
        { x: 44, y: 26 },
        { x: 45, y: 25 },
        { x: 45, y: 24 },
        { x: 45, y: 23 },
        { x: 45, y: 22 },
        { x: 44, y: 21 },
        { x: 44, y: 20 },
        { x: 44, y: 19 },
        { x: 44, y: 18 },
        { x: 44, y: 17 },
        { x: 43, y: 16 },
        { x: 43, y: 15 },
        { x: 42, y: 14 },
        { x: 42, y: 13 },
        { x: 42, y: 12 },
        { x: 41, y: 11 },
        { x: 40, y: 10 },
        { x: 39, y: 9 },
        { x: 38, y: 8 },
        { x: 37, y: 7 },
        // { x: 36, y: 6 }, // good brick to comment out for shortcut upper right
        { x: 35, y: 5 },
        { x: 34, y: 5 },
        { x: 33, y: 4 },
        { x: 32, y: 4 },
        { x: 31, y: 3 },
        { x: 30, y: 3 },
        { x: 29, y: 3 },
        { x: 28, y: 2 },
        { x: 27, y: 2 },
        { x: 26, y: 2 },
        { x: 25, y: 2 },
        { x: 24, y: 1 },

        // earth

        // Right wall at start, going down
        { x: 55, y: 24 },
        { x: 55, y: 25 },
        { x: 55, y: 26 },
        { x: 54, y: 27 },
        { x: 54, y: 28 },
        { x: 54, y: 29 },
        { x: 54, y: 30 },
        { x: 54, y: 31 },
        { x: 54, y: 32 },
        { x: 54, y: 33 },
        { x: 55, y: 34 },
        { x: 55, y: 35 },
        { x: 55, y: 36 },
        { x: 55, y: 37 },
        { x: 55, y: 38 },
        { x: 55, y: 39 },
        // Right wall at start, going up
        { x: 55, y: 23 },
        { x: 56, y: 22 },
        { x: 56, y: 21 },
        { x: 57, y: 20 },
        { x: 58, y: 19 },
        { x: 59, y: 18 },
        { x: 60, y: 17 },
        { x: 61, y: 16 },
        { x: 62, y: 15 },
        { x: 63, y: 15 },
        { x: 64, y: 14 },
        { x: 65, y: 14 },
        { x: 66, y: 13 },
        { x: 67, y: 13 },
        { x: 67, y: 13 },
        { x: 68, y: 13 },
        { x: 69, y: 12 },
        { x: 70, y: 12 },
        { x: 71, y: 12 },
        { x: 72, y: 12 },
        // continues off right wall -reversed
        { x: 88, y: 24 },
        { x: 88, y: 23 },
        { x: 88, y: 22 },
        { x: 87, y: 21 },
        { x: 86, y: 20 },
        { x: 86, y: 19 },
        { x: 85, y: 18 },
        { x: 84, y: 17 },
        { x: 83, y: 16 },
        { x: 82, y: 15 },
        { x: 81, y: 15 },
        { x: 80, y: 14 },
        { x: 79, y: 14 },
        { x: 78, y: 13 },
        { x: 77, y: 13 },
        { x: 76, y: 13 },
        { x: 75, y: 12 },
        { x: 74, y: 12 },
        { x: 73, y: 12 },
        // after 1V
        { x: 88, y: 36 },
        { x: 88, y: 37 },
        { x: 87, y: 38 },
        { x: 87, y: 39 },
        { x: 86, y: 40 },
        { x: 86, y: 41 },
        { x: 85, y: 42 },
        { x: 84, y: 43 },
        { x: 83, y: 44 },
        { x: 82, y: 45 },
        { x: 81, y: 45 },
        { x: 80, y: 46 },
        { x: 79, y: 46 },
        { x: 78, y: 47 },
        { x: 77, y: 47 },
        { x: 76, y: 47 },
        { x: 75, y: 48 },
        { x: 74, y: 48 },
        { x: 73, y: 48 },
        { x: 72, y: 48 },
        { x: 71, y: 48 },
        { x: 70, y: 48 },
        { x: 69, y: 48 },
        { x: 68, y: 48 },
        { x: 67, y: 47 },
        { x: 66, y: 47 },
        { x: 65, y: 47 },
        { x: 64, y: 46 },
        { x: 63, y: 46 },
        { x: 62, y: 45 },
        { x: 61, y: 45 },
        { x: 60, y: 44 },
        { x: 59, y: 43 },
        { x: 58, y: 42 },
        { x: 57, y: 41 },
        { x: 56, y: 40 },
    ];
    // Track
    var track = [
        // Left wall at start
        { x: 45, y: 13 },
        { x: 45, y: 12 },
        { x: 46, y: 11 },
        { x: 47, y: 10 },
        { x: 48, y: 9 },
        { x: 49, y: 8 },
        { x: 50, y: 7 },
        { x: 51, y: 6 },
        { x: 52, y: 5 },
        { x: 53, y: 5 },
        { x: 54, y: 4 },
        { x: 55, y: 4 },
        { x: 56, y: 3 },
        { x: 57, y: 3 },
        { x: 58, y: 3 },
        { x: 59, y: 2 },
        { x: 60, y: 2 },
        { x: 61, y: 2 },
        { x: 62, y: 2 },
        { x: 63, y: 1 },

        // After 2V
        { x: 99, y: 56 },
        { x: 99, y: 57 },
        { x: 99, y: 58 },
        { x: 98, y: 59 },
        { x: 98, y: 60 },
        { x: 97, y: 61 },
        { x: 96, y: 62 },
        { x: 95, y: 62 },

        // After 3H
        // { x: 60, y: 53 },
        // { x: 59, y: 53 },
        // { x: 58, y: 54 },
        // { x: 57, y: 55 },
        // { x: 56, y: 56 },
        { x: 55, y: 57 },
        { x: 55, y: 58 },
        { x: 54, y: 59 },
        { x: 54, y: 60 },
        { x: 54, y: 61 },
        { x: 53, y: 62 },
        { x: 53, y: 63 },
        { x: 52, y: 64 },
        { x: 52, y: 65 },
        { x: 52, y: 66 },
        { x: 52, y: 67 },
        { x: 52, y: 68 },
        { x: 52, y: 69 },
        { x: 53, y: 70 },
        { x: 53, y: 71 },
        { x: 54, y: 72 },
        { x: 55, y: 73 },
        { x: 56, y: 74 },
        { x: 57, y: 75 },
        { x: 58, y: 75 },
        { x: 59, y: 76 },
        { x: 60, y: 76 },
        { x: 61, y: 75 },
        { x: 62, y: 75 },
        { x: 63, y: 75 },
        { x: 64, y: 75 },
        { x: 65, y: 75 },
        { x: 66, y: 74 },
        { x: 67, y: 74 },
        { x: 68, y: 73 },
        { x: 69, y: 72 },
        { x: 70, y: 72 },
        { x: 71, y: 72 },
        { x: 76, y: 64 },
        { x: 77, y: 65 },
        { x: 78, y: 65 },
        { x: 79, y: 66 },
        { x: 80, y: 67 },
        { x: 80, y: 68 },
        { x: 81, y: 69 },
        { x: 81, y: 70 },
        { x: 82, y: 71 },
        { x: 82, y: 72 },
        { x: 82, y: 73 },
        { x: 82, y: 74 },
        { x: 82, y: 75 },
        { x: 81, y: 76 },
        { x: 81, y: 77 },
        { x: 80, y: 78 },
        { x: 79, y: 79 },
        { x: 78, y: 79 },
        { x: 77, y: 80 },
        { x: 76, y: 80 },
        { x: 75, y: 81 },
        { x: 74, y: 81 },
        { x: 73, y: 82 },
        { x: 72, y: 82 },
        { x: 71, y: 83 },
        { x: 70, y: 83 },
        { x: 69, y: 84 },
        { x: 68, y: 84 },
        { x: 55, y: 84 },
        { x: 54, y: 84 },
        { x: 54, y: 83 },
        { x: 53, y: 82 },
        { x: 52, y: 82 },
        { x: 51, y: 81 },
        { x: 51, y: 80 },
        { x: 50, y: 79 },
        { x: 49, y: 79 },
        { x: 48, y: 78 },
        { x: 47, y: 78 },
        { x: 46, y: 78 },
        { x: 45, y: 78 },
        { x: 44, y: 78 },
        { x: 43, y: 78 },
        { x: 42, y: 79 },
        { x: 41, y: 79 },
        { x: 40, y: 79 },
        { x: 39, y: 79 },
        { x: 38, y: 80 },
        { x: 37, y: 80 },
        { x: 36, y: 80 },
        { x: 35, y: 80 },
        { x: 34, y: 81 },
        { x: 33, y: 81 },
        { x: 32, y: 82 },
        { x: 31, y: 83 },
        { x: 30, y: 84 },
    ];
    // 2H After the 2V curve
    horizontalLine(94, 63, -30, "metal", arena);

    horizontalLine(51, 69, -15, "metal", arena);
    horizontalLine(36, 70, -23, "metal", arena);

    verticalLine(13, 56, 15, "metal", arena);

    verticalLine(55, 40, 19, "metal", arena);

    //outside
    horizontalLine(0, 0, 100, "metal", arena);
    horizontalLine(1, 84, 29, "metal", arena);
    horizontalLine(56, 85, 12, "metal", arena);
    verticalLine(0, 0, 85, "metal", arena);
    verticalLine(100, 0, 56, "metal", arena);

    // earth, right side
    verticalLine(89, 25, 11, "invisible", arena);

    lunaBlocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "invisible",
        });
    });
    track.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "metal",
        });
    });
}
