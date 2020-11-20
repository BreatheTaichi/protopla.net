import { circle } from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import sunPNG from "../images/sun/sun.webp";
import backgroundPic from "../images/background/M81-82.webp";
import alienShip from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/sol.jpg";
import finish from "../bricks/finishBlock.js";

export default function Sun(arena) {
    arena.finishImg = { x: 1, y: 37, len: 12 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });

    var ship = loadImageToCanvas(50, 50, alienShip, arena);
    var sun = loadImageToCanvas(2600, 2600, sunPNG, arena);

    if (arena.showBackground) {
        var background = loadImageToCanvas(3945, 2630, backgroundPic, arena);
        arena.background = background;
    }
    if (arena.showArrows) {
        var arrow = loadImageToCanvas(150, 150, arrowPNG, arena, 90);
        arena.images.push({ img: arrow, xStart: 67, yStart: 36 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 300);
        arena.images.push({ img: arrow2, xStart: 5, yStart: 30 });
    }

    arena.images.push({ img: sun, xStart: 5, yStart: 5 });
    arena.ship.img = ship;

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "In this course make your way around the star at the center of our " +
            "solar system. It is going through an active period with intense " +
            "solar flares.",
        "The sun contains 99.8% of the mass in our part of space.  That means " +
            "that all of the other planets, asteroids, protoplanets and gases " +
            "in the solar system make up just .2%!",
        "In the background you will see galaxies M81 and M82. They have recently collided " +
            "and will come together again and again in the next few billion years " +
            "causing massive outbursts " +
            "of energy and a destructive reconfiguration on a galactic scale.",
    ];
    arena.links = [
        {
            text: "For more information check out NASA's page at ",
            link: "https://solarsystem.nasa.gov/solar-system/sun/overview/",
        },
    ];

    circle(37.5, 37.5, 37, "metal", arena);
    // x: 13 - 62 h = 38 rx = 25
    // y: 13 - 62 k = 38 ry = 25
    arena.ellipses.push({
        h: 37.5 * 40,
        k: 37.5 * 40,
        rx: 26.5 * 40,
        ry: 26.5 * 40,
    });

    // var sunBlocks = [
    //     { x: 13, y: 36 },
    //     { x: 13, y: 37 },
    //     { x: 13, y: 38 },
    //     { x: 13, y: 39 },
    //     { x: 13, y: 40 },
    //     { x: 13, y: 41 },
    //     { x: 13, y: 42 },
    //     { x: 14, y: 43 },
    //     { x: 14, y: 44 },
    //     { x: 14, y: 45 },
    //     { x: 14, y: 46 },
    //     { x: 15, y: 47 },
    //     { x: 15, y: 48 },
    //     { x: 16, y: 49 },
    //     { x: 16, y: 50 },
    //     { x: 17, y: 51 },
    //     { x: 17, y: 52 },
    //     { x: 18, y: 53 },
    //     { x: 19, y: 54 },
    //     { x: 20, y: 55 },
    //     { x: 21, y: 56 },
    //     { x: 22, y: 57 },
    //     { x: 23, y: 58 },
    //     { x: 24, y: 58 },
    //     { x: 25, y: 59 },
    //     { x: 26, y: 59 },
    //     { x: 27, y: 60 },
    //     { x: 28, y: 60 },
    //     { x: 29, y: 61 },
    //     { x: 30, y: 61 },
    //     { x: 31, y: 61 },
    //     { x: 32, y: 62 },
    //     { x: 33, y: 62 },
    //     { x: 34, y: 62 },
    //     { x: 35, y: 62 },
    //     { x: 36, y: 62 },
    //     { x: 37, y: 62 },
    //     { x: 38, y: 62 },
    //     { x: 39, y: 62 },
    //     { x: 40, y: 62 },
    //     { x: 41, y: 62 },
    //     { x: 42, y: 62 },
    //     { x: 43, y: 61 },
    //     { x: 44, y: 61 },
    //     { x: 45, y: 61 },
    //     { x: 46, y: 60 },
    //     { x: 47, y: 60 },
    //     { x: 48, y: 60 },
    //     { x: 49, y: 59 },
    //     { x: 50, y: 58 },
    //     { x: 51, y: 58 },
    //     { x: 52, y: 57 },
    //     { x: 53, y: 56 },
    //     { x: 54, y: 55 },
    //     { x: 55, y: 54 },
    //     { x: 56, y: 53 },
    //     { x: 57, y: 52 },
    //     { x: 58, y: 51 },
    //     { x: 58, y: 50 },
    //     { x: 59, y: 49 },
    //     { x: 59, y: 48 },
    //     { x: 60, y: 47 },
    //     { x: 60, y: 46 },
    //     { x: 60, y: 45 },
    //     { x: 61, y: 44 },
    //     { x: 61, y: 43 },
    //     { x: 61, y: 42 },
    //     { x: 61, y: 41 },
    //     { x: 62, y: 40 },
    //     { x: 62, y: 39 },
    //     { x: 62, y: 38 },
    //     { x: 62, y: 37 },
    //     { x: 62, y: 36 },
    //     { x: 62, y: 35 },
    //     { x: 62, y: 34 },
    //     { x: 61, y: 33 },
    //     { x: 61, y: 32 },
    //     { x: 61, y: 31 },
    //     { x: 61, y: 30 },
    //     { x: 60, y: 29 },
    //     { x: 60, y: 28 },
    //     { x: 59, y: 27 },
    //     { x: 59, y: 26 },
    //     { x: 58, y: 25 },
    //     { x: 58, y: 24 },
    //     { x: 57, y: 23 },
    //     { x: 56, y: 22 },
    //     { x: 55, y: 21 },
    //     { x: 55, y: 20 },
    //     { x: 54, y: 19 },
    //     { x: 53, y: 19 },
    //     { x: 52, y: 18 },
    //     { x: 51, y: 17 },
    //     { x: 50, y: 16 },
    //     { x: 49, y: 16 },
    //     { x: 48, y: 15 },
    //     { x: 47, y: 15 },
    //     { x: 46, y: 14 },
    //     { x: 45, y: 14 },
    //     { x: 44, y: 14 },
    //     { x: 43, y: 14 },
    //     { x: 42, y: 13 },
    //     { x: 41, y: 13 },
    //     { x: 40, y: 13 },
    //     { x: 39, y: 13 },
    //     { x: 38, y: 13 },
    //     { x: 37, y: 13 },
    //     { x: 36, y: 13 },
    //     { x: 35, y: 13 },
    //     { x: 34, y: 13 },
    //     { x: 33, y: 13 },
    //     { x: 32, y: 13 },
    //     { x: 31, y: 14 },
    //     { x: 30, y: 14 },
    //     { x: 29, y: 14 },
    //     { x: 27, y: 15 },
    //     { x: 26, y: 16 },
    //     { x: 25, y: 16 },
    //     { x: 24, y: 17 },
    //     { x: 23, y: 17 },
    //     { x: 22, y: 18 },
    //     { x: 21, y: 19 },
    //     { x: 20, y: 20 },
    //     { x: 19, y: 21 },
    //     { x: 18, y: 22 },
    //     { x: 17, y: 23 },
    //     { x: 17, y: 24 },
    //     { x: 16, y: 25 },
    //     { x: 16, y: 26 },
    //     { x: 15, y: 27 },
    //     { x: 15, y: 28 },
    //     { x: 14, y: 29 },
    //     { x: 14, y: 30 },
    //     { x: 14, y: 31 },
    //     { x: 14, y: 32 },
    //     { x: 13, y: 33 },
    //     { x: 13, y: 34 },
    //     { x: 13, y: 35 },
    // ];

    // sunBlocks.forEach(({ x, y }) => {
    //     arena.blocks.push({
    //         x: x * arena.size,
    //         y: y * arena.size,
    //         type: "invisible",
    //     });
    // });

    // Load test
    // for (let i = 0; i < 10000; i++) {
    //     arena.blocks.push({
    //         x: 33,
    //         y: 10,
    //         type: "metal",
    //     });
    // }
}
