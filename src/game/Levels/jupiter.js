import {
    arc,
    diagonalLeft,
    diagonalRight,
    horizontalLine,
    verticalLine,
} from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import jupiterPNG from "../images/jupiter/jupiterAurora.webp";
import callistoPNG from "../images/jupiter/callisto.webp";
import ioPNG from "../images/jupiter/io.webp";
import ganymedePNG from "../images/jupiter/ganymede.webp";
import europaPNG from "../images/jupiter/europa.webp";
import backgroundPic from "../images/background/NGC7331.webp";
import alienShipPNG from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/jupiter.jpg";
import finish from "../bricks/finishBlock.js";

export default function jupiter(arena) {
    arena.finishImg = { x: 113, y: 118, len: 20 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });

    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);
    arena.ship.img = alienShip;
    var jupiter = loadImageToCanvas(2960, 3000, jupiterPNG, arena);
    var callisto = loadImageToCanvas(800, 800, callistoPNG, arena);
    var io = loadImageToCanvas(1000, 1000, ioPNG, arena);
    var ganymede = loadImageToCanvas(1400, 1400, ganymedePNG, arena);
    var europa = loadImageToCanvas(1200, 1200, europaPNG, arena);
    if (arena.showBackground) {
        var background = loadImageToCanvas(4600, 4000, backgroundPic, arena);
        arena.background = background;
    }
    if (arena.showArrows) {
        var arrow0 = loadImageToCanvas(150, 150, arrowPNG, arena, 245);
        arena.images.push({ img: arrow0, xStart: 75, yStart: 70 });
        var arrow1 = loadImageToCanvas(150, 150, arrowPNG, arena, 40);
        arena.images.push({ img: arrow1, xStart: 113, yStart: 53 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 200);
        arena.images.push({ img: arrow2, xStart: 115, yStart: 27 });
        var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 135);
        arena.images.push({ img: arrow3, xStart: 64, yStart: 40 });
        var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, 220);
        arena.images.push({ img: arrow4, xStart: 45, yStart: 84 });
        var arrow5 = loadImageToCanvas(150, 150, arrowPNG, arena, 75);
        arena.images.push({ img: arrow5, xStart: 26, yStart: 109 });
        var arrow6 = loadImageToCanvas(150, 150, arrowPNG, arena, -35);
        arena.images.push({ img: arrow6, xStart: 98, yStart: 155 });
    }

    arena.images.push({ img: io, xStart: 120, yStart: 40 });
    // circle(132.4, 52.5, 11, "invisible", arena);
    arena.ellipses.push({
        h: 132.4 * 40,
        k: 52.5 * 40,
        rx: 13 * 40,
        ry: 13 * 40,
    });

    arena.images.push({ img: europa, xStart: 70, yStart: 20 });
    // circle(85, 35, 13.7, "invisible", arena);
    arena.ellipses.push({
        h: 85 * 40,
        k: 35 * 40,
        rx: 15.5 * 40,
        ry: 15.5 * 40,
    });

    arena.images.push({ img: callisto, xStart: 50, yStart: 50 });
    // circle(60, 60, 8.7, "invisible", arena);
    arena.ellipses.push({
        h: 60 * 40,
        k: 60 * 40,
        rx: 10.6 * 40,
        ry: 10.6 * 40,
    });

    arena.images.push({ img: ganymede, xStart: -5, yStart: 70 });
    // circle(12.5, 87.5, 16.2, "invisible", arena);
    arena.ellipses.push({
        h: 12.5 * 40,
        k: 87.5 * 40,
        rx: 18 * 40,
        ry: 18 * 40,
    });

    arena.images.push({ img: jupiter, xStart: 40, yStart: 80 });
    // ellipse(77, 118.5, 35.3, 35, "invisible", arena);
    arena.ellipses.push({
        h: 77.1 * 40,
        k: 118.6 * 40,
        rx: 37.3 * 40,
        ry: 36.7 * 40,
    });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Pictured here are Jupiter and the four Galilean moons. These " +
            "were the first moons of Jupiter to be discovered, but " +
            "since then we have found that Jupiter has at least 79 moons!",
        "Jupiter is the fifth, and largest planet in the solar system. " +
            "It is a gas giant with twice the mass of all the other " +
            "planets combined, mostly formed of mostly hydrogen and " +
            "helium, like the sun.",
        "Messier",
    ];
    arena.links = [
        {
            text: "More on Jupiter: ",
            link: "https://solarsystem.nasa.gov/planets/jupiter/in-depth/",
        },
        {
            text: "Jupiter's Moons: ",
            link: "https://solarsystem.nasa.gov/moons/jupiter-moons/overview/",
        },
    ];

    // Around Jupiter
    arc(77, 118, -90, 183, 56, "metal", arena);

    // Callisto to Jupiter
    verticalLine(60, 70.5, 16, "metal", arena);
    // Europa to Callisto
    diagonalLeft(75.5, 48.5, 7, "metal", arena);
    // between Europa and Io
    diagonalLeft(110, 49, 16, "metal", arena);
    // Europa to Io
    arc(105.7, 52, 255, 337, 18, "metal", arena);
    horizontalLine(116, 76, 18, "metal", arena);
    // Around Io
    arc(132, 52, -90, 90, 24, "metal", arena);
    arc(106, 52, 265, 317, 34, "metal", arena);
    // Around Europa
    arc(84, 35, 165, 316, 26, "metal", arena);
    // Around Callisto
    arc(59, 60, 115, 270, 22, "metal", arena);
    // Around Ganymede
    arc(12, 87, 75, 327, 30, "metal", arena);
    // Ganymede to Jupiter
    diagonalRight(29.5, 94.5, 13, "metal", arena);

    // var inviBlocks = [
    //     // { x: 77, y: 47 },
    //     // { x: 60, y: 86 },
    //     // { x: 123, y: 45 },
    //     // { x: 28, y: 94 },
    // ];
    // inviBlocks.forEach(({ x, y }) => {
    //     arena.blocks.push({
    //         x: x * arena.size,
    //         y: y * arena.size,
    //         type: "invisible",
    //     });
    // });
    var blocks = [{ x: 38, y: 71 }];

    blocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "metal",
        });
    });
}
