import { arc, diagonalLeft, horizontalLine } from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import uranusPNG from "../images/uranus/uranus.webp";
import arielPNG from "../images/uranus/ariel.webp";
import oberonPNG from "../images/uranus/oberon.webp";
import puckPNG from "../images/uranus/puck.webp";
import titaniaPNG from "../images/uranus/titania.webp";
import umbrielPNG from "../images/uranus/umbriel.webp";
import backgroundPic from "../images/background/m106_colombari_3568.webp";
import alienShip from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/uranus.jpg";
import finish from "../bricks/finishBlock.js";

export default function Sun(arena) {
    arena.finishImg = { x: 69, y: 37, len: 11 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });
    var ship = loadImageToCanvas(50, 50, alienShip, arena);
    arena.ship.img = ship;
    var uranus = loadImageToCanvas(2600, 2600, uranusPNG, arena);
    var titania = loadImageToCanvas(489, 489, titaniaPNG, arena);
    var ariel = loadImageToCanvas(359, 359, arielPNG, arena);
    var oberon = loadImageToCanvas(473, 473, oberonPNG, arena);
    var umbriel = loadImageToCanvas(363, 363, umbrielPNG, arena);
    var puck = loadImageToCanvas(50, 50, puckPNG, arena);
    if (arena.showBackground) {
        var background = loadImageToCanvas(3568, 2785, backgroundPic, arena);
        arena.background = background;
    }
    if (arena.showArrows) {
        var arrow = loadImageToCanvas(150, 150, arrowPNG, arena, -60);
        arena.images.push({ img: arrow, xStart: 77, yStart: 30 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 95);
        arena.images.push({ img: arrow2, xStart: 85, yStart: 51 });
        var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 170);
        arena.images.push({ img: arrow3, xStart: 80, yStart: 72 });
        var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, -30);
        arena.images.push({ img: arrow4, xStart: 29, yStart: 78 });
    }

    arena.images.push({ img: uranus, xStart: 5, yStart: 5 });
    // arc(37, 37, -15, 98, 31.8, "invisible", arena);
    arena.ellipses.push({
        h: 37 * 40,
        k: 37.2 * 40,
        rx: 33.5 * 40,
        ry: 33.5 * 40,
    });
    arena.images.push({ img: titania, xStart: 80, yStart: 28 });
    // circle(86, 34, 5, "invisible", arena);
    arena.ellipses.push({
        h: 86 * 40,
        k: 34 * 40,
        rx: 6.5 * 40,
        ry: 6.5 * 40,
    });
    arena.images.push({ img: ariel, xStart: 88, yStart: 48 });
    // circle(92.3, 52.5, 3.5, "invisible", arena);
    arena.ellipses.push({
        h: 92.4 * 40,
        k: 52.5 * 40,
        rx: 5 * 40,
        ry: 5 * 40,
    });
    arena.images.push({ img: oberon, xStart: 72, yStart: 60 });
    // circle(77.8, 66, 4.6, "invisible", arena);
    arena.ellipses.push({
        h: 77.9 * 40,
        k: 65.9 * 40,
        rx: 6.4 * 40,
        ry: 6.4 * 40,
    });
    arena.images.push({ img: umbriel, xStart: 60, yStart: 80 });
    // circle(64.4, 84.4, 3.5, "invisible", arena);
    arena.ellipses.push({
        h: 64.5 * 40,
        k: 84.5 * 40,
        rx: 5 * 40,
        ry: 5 * 40,
    });
    arena.images.push({ img: puck, xStart: 34, yStart: 85 });
    arena.ellipses.push({
        h: 34.5 * 40,
        k: 85.5 * 40,
        rx: 1 * 40,
        ry: 1 * 40,
    });

    // outside uranus
    arc(37, 37, 0, 85, 43, "metal", arena);
    // down to puck
    diagonalLeft(40, 80, 5, "metal", arena);
    // outside of puck
    arc(35, 85, 25, 258, 15, "metal", arena);
    // to umbriel
    horizontalLine(50, 90, 3, "metal", arena);
    horizontalLine(53, 89, 4, "metal", arena);
    horizontalLine(57, 88, 4, "metal", arena);
    // umbriel past oberon, to ariel
    arc(73, 61, -10, 100, 23, "metal", arena);
    // outside titania
    arc(86, 34, 200, 415, 18, "metal", arena);

    // var uranusBlocks = [
    //     // over puck
    //     { x: 34.6, y: 85.6 },
    //     // connecting circle outside of puck to uranus
    //     { x: 32, y: 69 },
    // ];

    // uranusBlocks.forEach(({ x, y }) => {
    //     arena.blocks.push({
    //         x: x * arena.size,
    //         y: y * arena.size,
    //         type: "invisible",
    //     });
    // });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Uranus, the seventh planet from the sun. One of the " +
            "interesting things about this planet is that it spins " +
            "on it's side like a ball rolling around in it's orbit.",
        "It is the third largest planet. Like Saturn, Uranus is " +
            "considered an ice giant. However, near the core it " +
            "heats up to an amazing 9,000 degrees Fahrenheit.",
        "In the background you will see the distant galaxy M106 which " +
            "has a supermassive black hole at the center. ",
    ];
    arena.links = [
        {
            text: "For more information check out NASA's page at: ",
            link: "https://solarsystem.nasa.gov/solar-system/uranus/overview/",
        },
        {
            text: "Find interesting facts about Uranus's moons: ",
            link: "https://solarsystem.nasa.gov/moons/uranus-moons/overview/",
        },
        {
            text: "See the Astronomy Picture of the Day and read about M106: ",
            link: "https://apod.nasa.gov/apod/ap190317.html",
        },
    ];
}
