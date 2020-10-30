import { circle, arc, diagonalLeft } from "../shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import neptunePNG from "../images/neptune/neptune.webp";
import larissaPNG from "../images/neptune/larissa.webp";
import tritonPNG from "../images/neptune/triton.webp";
import proteusPNG from "../images/neptune/proteus.webp";
import backgroundPic from "../images/background/lagoonNebula.webp";
import alienShipPNG from "../images/ships/alienShip.webp";
// import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/neptune.jpg";
import finish from "../bricks/finishBlock.js";

export default function mercury(arena) {
    arena.finishImg = { x: 67, y: 124, len: 10 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });
    var neptune = loadImageToCanvas(1600, 1600, neptunePNG, arena);
    var triton = loadImageToCanvas(712, 712, tritonPNG, arena);
    var proteus = loadImageToCanvas(557, 627, proteusPNG, arena);
    var larissa = loadImageToCanvas(165, 143, larissaPNG, arena);
    var background = loadImageToCanvas(3500, 4000, backgroundPic, arena);
    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);
    // var arrow0 = loadImageToCanvas(150, 150, arrowPNG, arena, 220);
    // arena.images.push({ img: arrow0, xStart: 119, yStart: 112 });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Neptune is the eighth planet. It's the furthest planet from " +
            "the sun and only orbits once every 165 years. ",
        "Neptune is an ice giant made mostly of water, methane " +
            "and ammonia, with a rocky core.",
        "We know of 14 moons around Neptune. Being so far away, though, " +
            "there is a lot to learn, and we may find more.  After all, there " +
            "has only been one mission to Neptune.",
        "In the background you will see the Lagoon Nebula.",
    ];
    arena.links = [
        {
            text: "Overview of Neptune: ",
            link: "https://solarsystem.nasa.gov/planets/neptune/overview/",
        },
        {
            text: "The moons of Neptune: ",
            link: "https://solarsystem.nasa.gov/moons/neptune-moons/overview/",
        },
        {
            text: "Information on the Lagoon Nebula: ",
            link:
                "https://www.nasa.gov/feature/goddard/2018/lagoon-nebula-visible-light-view",
        },
    ];
    arena.ship.img = alienShip;
    arena.background = background;
    arena.images.push({ img: neptune, xStart: 35, yStart: 50 });
    circle(55, 70, 18.8, "invisible", arena);
    arena.images.push({ img: triton, xStart: 50, yStart: 115 });
    circle(58.8, 123.8, 7.8, "invisible", arena);
    arena.images.push({ img: proteus, xStart: 26.7, yStart: 109 });
    arena.images.push({ img: larissa, xStart: 70, yStart: 93 });

    // first ring outside of neptune
    arc(55, 70, 122, 440, 27, "metal", arena);
    // second ring
    arc(55, 70, 112, 405, 35, "metal", arena);
    // 3 diagonal lines under neptune - top, middle, bottom
    diagonalLeft(55, 90, 13, "metal", arena);
    diagonalLeft(59, 98, 13, "metal", arena);
    diagonalLeft(67, 103, 13, "metal", arena);
    // first ring around triton
    arc(59, 124, -45, 227, 18, "metal", arena);
    // second ring
    arc(59, 124, -50, 160, 27, "metal", arena);
    // outside larissa
    arc(72, 95, 0, 126, 8, "metal", arena);
    // outside proteus
    arc(34, 117, 95, 280, 16, "metal", arena);

    var neptuneBlocks = [
        // proteus
        { x: 40, y: 120 },
        { x: 39, y: 121 },
        { x: 39, y: 122 },
        { x: 38, y: 123 },
        { x: 37, y: 124 },
        { x: 36, y: 124 },
        { x: 35, y: 124 },
        { x: 34, y: 124 },
        { x: 33, y: 124 },
        { x: 32, y: 124 },
        { x: 31, y: 123 },
        { x: 30, y: 122 },
        { x: 29, y: 121 },
        { x: 29, y: 120 },
        { x: 28, y: 119 },
        { x: 28, y: 118 },
        { x: 28, y: 117 },
        { x: 28, y: 116 },
        { x: 28, y: 115 },
        { x: 28, y: 114 },
        { x: 29, y: 113 },
        { x: 29, y: 112 },
        { x: 30, y: 112 },
        { x: 31, y: 111 },
        { x: 32, y: 111 },
        { x: 33, y: 110 },
        { x: 34, y: 110 },
        { x: 35, y: 110 },
        { x: 36, y: 110 },
        { x: 37, y: 110 },
        { x: 38, y: 111 },
        { x: 39, y: 112 },
        { x: 39, y: 113 },
        { x: 39, y: 114 },
        { x: 39, y: 115 },
        { x: 39, y: 116 },
        { x: 39, y: 117 },
        { x: 40, y: 118 },
        { x: 40, y: 119 },

        // larissa
        { x: 71, y: 94 },
        { x: 72, y: 94 },
        { x: 73, y: 94 },
        { x: 73, y: 95 },
        { x: 72, y: 96 },
        { x: 71, y: 95 },
    ];

    neptuneBlocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "invisible",
        });
    });
}

/*
0,0    110, 0
0,600  110, 600

{ x: 1, y: 0 },
{ x: 111, y: 2 },
{ x: 113, y: 601 },
{ x: 1, y: 598 },
*/
