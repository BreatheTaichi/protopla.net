import {
    arc,
    diagonalLeft,
    horizontalLine,
    verticalLine,
} from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import deimosPNG from "../images/mars/deimos.webp";
import phobosPNG from "../images/mars/phobos.webp";
import marsPNG from "../images/mars/mars.webp";
import backgroundPic from "../images/background/cygnusLoopNebula2.webp";
import alienShipPNG from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/mars.jpg";
import finish from "../bricks/finishBlock.js";

export default function mars(arena) {
    arena.finishImg = { x: 48.5, y: 224, len: 12 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });

    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);

    arena.ship.img = alienShip;
    var deimos = loadImageToCanvas(1030, 1030, deimosPNG, arena);
    var phobos = loadImageToCanvas(1400, 1400, phobosPNG, arena);
    var mars = loadImageToCanvas(2200, 2200, marsPNG, arena);
    if (arena.showBackground) {
        var background = loadImageToCanvas(4500, 4500, backgroundPic, arena);
        arena.background = background;
    }
    if (arena.showArrows) {
        var arrow0 = loadImageToCanvas(150, 150, arrowPNG, arena, 35);
        arena.images.push({ img: arrow0, xStart: 81, yStart: 206 });
        var arrow1 = loadImageToCanvas(150, 150, arrowPNG, arena, 45);
        arena.images.push({ img: arrow1, xStart: 125, yStart: 248 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 135);
        arena.images.push({ img: arrow2, xStart: 106, yStart: 234 });
        var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 270);
        arena.images.push({ img: arrow3, xStart: 20, yStart: 283 });
        var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, 180);
        arena.images.push({ img: arrow4, xStart: 98, yStart: 224 });
    }
    arena.images.push({
        img: deimos,
        xStart: 59,
        yStart: 205.5,
    });
    arena.images.push({
        img: deimos,
        xStart: 59,
        yStart: 205.5,
    });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "You will start by flying around the two moons of Mars. First " +
            "you will see the Deimos then follow the track to to the right and " +
            "down you will find Phobos. These two moons are named after the " +
            "son's of Ares - the Greek counterpart to the Roman god Mars. ",
        "Phobos means fear, and Deimos means Dread. ",
        "The moons are not to scale, they are much smaller compared to Mars.",
        "The ultraviolet radion of the Cygnus Loop Nebula is the " +
            "background pictured here.",
    ];
    arena.links = [
        {
            text: "To learn more about Mars, check out NASA's page at: ",
            link: "https://solarsystem.nasa.gov/planets/mars/overview/",
        },
        {
            text: "The moons of Mars: ",
            link: "https://solarsystem.nasa.gov/moons/mars-moons/overview/",
        },
        {
            text: "For information on the Cygnus Loop Nebula: ",
            link: "https://www.nasa.gov/mission_pages/galex/pia15415.html",
        },
    ];
    // Circle around Deimos
    arc(72, 218, 25, 345, 25, "metal", arena);
    // Arrow
    horizontalLine(84, 219, 36, "metal", arena);
    diagonalLeft(118, 220, 48, "metal", arena);
    verticalLine(119, 220, 35, "metal", arena);
    // Outside of arrow
    horizontalLine(97, 211, 31, "metal", arena);
    verticalLine(128, 212, 35, "metal", arena);
    // Circle around Phobos
    arc(121, 270, 289, 605, 25, "metal", arena);
    // Up from end of circle (on the left)
    verticalLine(110, 239, 9, "metal", arena);

    arena.images.push({
        img: phobos,
        xStart: 101.8,
        yStart: 253,
    });

    // Circle on Mars
    // circle(52.3, 287.5, 26, "invisible", arena);
    arena.ellipses.push({
        h: 52.5 * 40,
        k: 287.5 * 40,
        rx: 28 * 40,
        ry: 28 * 40,
    });
    // Circle around Mars
    arc(52, 287, -30, 300, 36, "metal", arena);
    // Lower diagonal to the circle around mars
    diagonalLeft(100, 251, 18, "metal", arena);
    // Upper diagonal to the circle around mars
    diagonalLeft(84, 242, 15, "metal", arena);

    arena.images.push({
        img: mars,
        xStart: 25,
        yStart: 260,
    });

    var moonBlocks = [
        // Phobos{ x: 119, y: 255 },
        { x: 118, y: 255 },
        { x: 117, y: 256 },
        { x: 116, y: 256 },
        { x: 115, y: 256 },
        { x: 114, y: 257 },
        { x: 113, y: 257 },
        { x: 112, y: 257 },
        { x: 111, y: 258 },
        { x: 110, y: 258 },
        { x: 109, y: 259 },
        { x: 108, y: 259 },
        { x: 107, y: 260 },
        { x: 107, y: 261 },
        { x: 106, y: 262 },
        { x: 105, y: 263 },
        { x: 105, y: 264 },
        { x: 105, y: 265 },
        { x: 105, y: 266 },
        { x: 105, y: 267 },
        { x: 105, y: 268 },
        { x: 105, y: 269 },
        { x: 106, y: 270 },
        { x: 106, y: 271 },
        { x: 106, y: 272 },
        { x: 106, y: 273 },
        { x: 107, y: 275 },
        { x: 108, y: 276 },
        { x: 108, y: 277 },
        { x: 109, y: 278 },
        { x: 109, y: 279 },
        { x: 110, y: 280 },
        { x: 111, y: 281 },
        { x: 112, y: 281 },
        { x: 113, y: 282 },
        { x: 114, y: 283 },
        { x: 115, y: 284 },
        { x: 116, y: 284 },
        { x: 117, y: 285 },
        { x: 118, y: 285 },
        { x: 119, y: 285 },
        { x: 120, y: 285 },
        { x: 121, y: 285 },
        { x: 122, y: 285 },
        { x: 123, y: 285 },
        { x: 124, y: 285 },
        { x: 125, y: 285 },
        { x: 126, y: 285 },
        { x: 127, y: 285 },
        { x: 128, y: 284 },
        { x: 129, y: 284 },
        { x: 130, y: 284 },
        { x: 131, y: 283 },
        { x: 132, y: 282 },
        { x: 133, y: 281 },
        { x: 133, y: 280 },
        { x: 134, y: 279 },
        { x: 134, y: 278 },
        { x: 134, y: 277 },
        { x: 135, y: 276 },
        { x: 135, y: 275 },
        { x: 135, y: 274 },
        { x: 135, y: 273 },
        { x: 135, y: 272 },
        { x: 135, y: 271 },
        { x: 135, y: 270 },
        { x: 135, y: 269 },
        { x: 135, y: 268 },
        { x: 135, y: 267 },
        { x: 135, y: 266 },
        { x: 134, y: 265 },
        { x: 134, y: 264 },
        { x: 133, y: 263 },
        { x: 132, y: 262 },
        { x: 132, y: 261 },
        { x: 131, y: 260 },
        { x: 130, y: 259 },
        { x: 129, y: 258 },
        { x: 128, y: 258 },
        { x: 127, y: 257 },
        { x: 126, y: 257 },
        { x: 125, y: 256 },
        { x: 124, y: 256 },
        { x: 123, y: 255 },
        { x: 122, y: 255 },
        { x: 121, y: 255 },
        { x: 120, y: 255 },
        // Deimos
        { x: 61, y: 225 },
        { x: 61, y: 226 },
        { x: 62, y: 227 },
        { x: 62, y: 228 },
        { x: 63, y: 228 },
        { x: 64, y: 229 },
        { x: 65, y: 229 },
        { x: 66, y: 229 },
        { x: 67, y: 230 },
        { x: 68, y: 230 },
        { x: 69, y: 230 },
        { x: 70, y: 230 },
        { x: 71, y: 229 },
        { x: 72, y: 229 },
        { x: 73, y: 229 },
        { x: 74, y: 229 },
        { x: 75, y: 229 },
        { x: 76, y: 228 },
        { x: 77, y: 228 },
        { x: 78, y: 228 },
        { x: 79, y: 227 },
        { x: 81, y: 226 },
        { x: 82, y: 225 },
        { x: 83, y: 224 },
        { x: 83, y: 223 },
        { x: 83, y: 222 },
        { x: 83, y: 221 },
        { x: 83, y: 220 },
        { x: 83, y: 219 },
        { x: 82, y: 218 },
        { x: 82, y: 217 },
        { x: 81, y: 216 },
        { x: 81, y: 215 },
        { x: 80, y: 214 },
        { x: 79, y: 214 },
        { x: 78, y: 213 },
        { x: 77, y: 212 },
        { x: 76, y: 211 },
        { x: 75, y: 211 },
        { x: 74, y: 210 },
        { x: 73, y: 209 },
        { x: 72, y: 209 },
        { x: 71, y: 208 },
        { x: 70, y: 208 },
        { x: 69, y: 208 },
        { x: 68, y: 208 },
        { x: 67, y: 208 },
        { x: 66, y: 208 },
        { x: 66, y: 209 },
        { x: 65, y: 210 },
        { x: 64, y: 211 },
        { x: 63, y: 212 },
        { x: 63, y: 213 },
        { x: 63, y: 214 },
        { x: 63, y: 215 },
        { x: 63, y: 216 },
        { x: 63, y: 217 },
        { x: 63, y: 218 },
        { x: 63, y: 219 },
        { x: 63, y: 220 },
        { x: 63, y: 221 },
        { x: 62, y: 222 },
        { x: 62, y: 223 },
        { x: 61, y: 224 },
    ];

    moonBlocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "invisible",
        });
    });

    var extraBlocks = [
        // filling in to the upper left of phobos
        { x: 101, y: 252 },
    ];

    extraBlocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "metal",
        });
    });
}
