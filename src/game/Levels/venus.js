import { arc, verticalLine, horizontalLine } from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import venusPNG from "../images/venus/venus.webp";
import backgroundPic from "../images/background/GrandDesign.webp";
import alienShipPNG from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/venus.jpg";
import finish from "../bricks/finishBlock.js";

export default function venus(arena) {
    arena.finishImg = { x: 2, y: 82, len: 14 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });

    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);
    arena.ship.img = alienShip;
    var venus = loadImageToCanvas(2200, 2160, venusPNG, arena);
    arena.images.push({ img: venus, xStart: 15, yStart: 55 });
    // circle(42.5, 82, 26, "invisible", arena);
    arena.ellipses.push({
        h: 42.5 * 40,
        k: 82 * 40,
        rx: 28 * 40,
        ry: 27.5 * 40,
    });

    // { x: 11, y: 150 },
    // { x: 54, y: 150 },

    if (arena.showBackground) {
        var background = loadImageToCanvas(3970, 3970, backgroundPic, arena);
        arena.background = background;
    }
    if (arena.showArrows) {
        var arrow = loadImageToCanvas(150, 150, arrowPNG, arena, 45);
        arena.images.push({ img: arrow, xStart: 59, yStart: 52 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 45);
        arena.images.push({ img: arrow2, xStart: 45, yStart: 128 });
        var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, -90);
        arena.images.push({ img: arrow3, xStart: 35, yStart: 155 });
    }

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Venus is the second planet from the Sun, and is the hottest of all " +
            "the planets at around 880 degrees Farenheit. It's also the " +
            "closest to Earth, and has had over 40 spacecraft visit it from Earth!",
        "The background is NGC 6814 Grand Design Spiral Galaxy taken by " +
            "Hubble Telescope and edited by Judy Schmidt.",
    ];
    arena.links = [
        {
            text: "NASA's page on Venus: ",
            link: "https://solarsystem.nasa.gov/planets/venus/overview/",
        },
        {
            text: "To see more about the Grand Design Spiral Galaxy, go to: ",
            link:
                "https://science.nasa.gov/ngc-6814-grand-design-spiral-galaxy-hubble",
        },
    ];

    arc(42, 82, 105, 436, 40, "metal", arena);
    // Line from bottom of venus
    verticalLine(42, 110, 54, "metal", arena);
    // Coming from the bottom of the outer arc, Left
    verticalLine(32, 121, 8, "metal", arena);
    horizontalLine(12, 129, 20, "metal", arena);
    verticalLine(11, 130, 20, "metal", arena);
    horizontalLine(12, 150, 19, "metal", arena);
    verticalLine(31, 151, 20, "metal", arena);
    horizontalLine(32, 171, 21, "metal", arena);
    // Coming from the bottom of the outer arc, Right
    verticalLine(52, 121, 8, "metal", arena);
    horizontalLine(53, 129, 20, "metal", arena);
    verticalLine(73, 130, 20, "metal", arena);
    horizontalLine(54, 150, 19, "metal", arena);
    verticalLine(53, 151, 20, "metal", arena);
    // Crossbar at bottom
    horizontalLine(22, 140, 40, "metal", arena);
}
