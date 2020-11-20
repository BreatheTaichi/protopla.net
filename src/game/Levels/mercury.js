import { arc, diagonalRight, diagonalLeft } from "../bricks/shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import mercuryPNG from "../images/mercury/mercury.webp";
import mercuryBWPNG from "../images/mercury/mercuryBW.webp";
import backgroundPic from "../images/background/NGC2525.webp";
import alienShipPNG from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/mercury.jpg";
import finish from "../bricks/finishBlock.js";

export default function mercury(arena) {
    arena.finishImg = { x: 67, y: 82, len: 27 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });

    var mercury = loadImageToCanvas(2040, 2040, mercuryPNG, arena);
    var mercuryBW = loadImageToCanvas(1640, 1640, mercuryBWPNG, arena);
    if (arena.showBackground) {
        var background = loadImageToCanvas(3730, 4000, backgroundPic, arena);
        arena.background = background;
    }
    var alienShip = loadImageToCanvas(50, 50, alienShipPNG, arena);
    arena.ship.img = alienShip;

    arena.images.push({ img: mercury, xStart: 17, yStart: 55 });
    arena.images.push({ img: mercuryBW, xStart: 22, yStart: 0.5 });

    if (arena.showArrows) {
        var arrow = loadImageToCanvas(150, 150, arrowPNG, arena, 135);
        arena.images.push({ img: arrow, xStart: 56, yStart: 37 });
        var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 105);
        arena.images.push({ img: arrow2, xStart: 20, yStart: 50 });
        var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 0);
        arena.images.push({ img: arrow3, xStart: 40, yStart: 116 });
        var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, 240);
        arena.images.push({ img: arrow4, xStart: 74, yStart: 59 });
    }

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Mercury is the closest planet to the sun, and " +
            "of the four rocky body planets.  It is the smallest planet in the " +
            "solar system, only a little bigger than Earth's moon.",
        "Both images on this map are of Mercury.  The top is a natural color, " +
            "and the bottom is a color map that highlights impact craters and " +
            "volcanic eruptions.",
        "This is set before spiral galaxy NGC 2525 where a supernova was spotted.",
    ];
    arena.links = [
        {
            text: "NASA page on Mercury: ",
            link: "https://solarsystem.nasa.gov/planets/mercury/overview/",
        },
        {
            text: "Video of colorized Mercury turning: ",
            link: "https://photojournal.jpl.nasa.gov/catalog/PIA16850",
        },
        {
            text: "Check out more on the Astronomy Picture of the Day: ",
            link:
                "https://apod.nasa.gov/apod/image/2010/STScI_NGC2525_1865x2000.jpg",
        },
    ];

    // Arc outside bottom of mercury
    arc(42, 82, 310, 591, 52, "metal", arena);
    // Right horn
    arc(42, 36, 35, 75, 20, "metal", arena);
    // Left horn
    arc(42, 36, 105, 140, 20, "metal", arena);

    diagonalRight(62, 28, 15, "metal", arena);
    diagonalLeft(22, 28, 15, "metal", arena);

    // Mercury
    // circle(42.5, 80.5, 24, "invisible", arena);
    arena.ellipses.push({
        h: 42.5 * 40,
        k: 80.5 * 40,
        rx: 26 * 40,
        ry: 26 * 40,
    });
    // Above horn
    // arc(42, 20, 20, 162, 20, "invisible", arena);
    arena.ellipses.push({
        h: 42.5 * 40,
        k: 21 * 40,
        rx: 21 * 40,
        ry: 21 * 40,
    });
}
