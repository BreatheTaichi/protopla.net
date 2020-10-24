import { square } from "../shapes.js";
import vestaJPG from "../images/vesta/VestaDarkCrop.png";
import backgroundPic from "../images/background/Butterfly_HubbleSchmidt_4767.jpg";
import alienShipPNG from "../images/ships/alienShip.png";

// case "vesta":
//     arena = new Arena("vesta", 50, 50, -5, -31, 40, 0, 3);
//     vesta(arena);
//     return { ...state, arena: arena, page: "canvas" };
export default function vesta(arena) {
    var vesta = new Image();
    vesta.onload = function () {
        arena.numberToLoad--;
    };
    vesta.src = vestaJPG;

    var background = new Image();
    background.onload = function () {
        arena.numberToLoad--;
    };
    background.src = backgroundPic;

    var alienShip = new Image();
    alienShip.onload = function () {
        arena.numberToLoad--;
    };
    alienShip.src = alienShipPNG;

    arena.ship.img = alienShip;
    arena.background = background;
    arena.images.push({ img: vesta, xStart: 5, yStart: 5, xEnd: 35, yEnd: 35 });

    square(50, 0, 0, arena);
    arena.finishImg = { x: 1, y: 28, len: 8 };

    var vestaBlocks = [
        { x: 10, y: 21 },
        { x: 9, y: 22 },
        { x: 9, y: 23 },
        { x: 9, y: 24 },
        { x: 9, y: 25 },
        { x: 9, y: 26 },
        { x: 9, y: 27 },
        { x: 9, y: 28 },
        { x: 9, y: 29 },
        { x: 9, y: 30 },
        { x: 9, y: 31 },
        { x: 9, y: 32 },
        { x: 10, y: 33 },
        { x: 11, y: 34 },
        { x: 12, y: 35 },
        { x: 13, y: 36 },
        { x: 14, y: 36 },
        { x: 15, y: 37 },
        { x: 16, y: 37 },
        { x: 17, y: 38 },
        { x: 18, y: 38 },
        { x: 19, y: 38 },
        { x: 20, y: 38 },
        { x: 21, y: 39 },
        { x: 22, y: 39 },
        { x: 23, y: 38 },
        { x: 24, y: 38 },
        { x: 25, y: 38 },
        { x: 26, y: 38 },
        { x: 27, y: 37 },
        { x: 28, y: 37 },
        { x: 29, y: 36 },
        { x: 30, y: 36 },
        { x: 31, y: 35 },
        { x: 32, y: 34 },
        { x: 33, y: 33 },
        { x: 34, y: 32 },
        { x: 35, y: 31 },
        { x: 36, y: 30 },
        { x: 36, y: 29 },
        { x: 37, y: 28 },
        { x: 37, y: 27 },
        { x: 37, y: 26 },
        { x: 37, y: 25 },
        { x: 38, y: 24 },
        { x: 38, y: 23 },
        { x: 38, y: 22 },
        { x: 38, y: 21 },
        { x: 38, y: 20 },
        { x: 37, y: 19 },
        { x: 37, y: 18 },
        { x: 37, y: 17 },
        { x: 36, y: 16 },
        { x: 36, y: 15 },
        { x: 35, y: 14 },
        { x: 35, y: 13 },
        { x: 34, y: 12 },
        { x: 33, y: 11 },
        { x: 32, y: 10 },
        { x: 31, y: 10 },
        { x: 30, y: 9 },
        { x: 29, y: 9 },
        { x: 28, y: 8 },
        { x: 27, y: 8 },
        { x: 26, y: 8 },
        { x: 25, y: 7 },
        { x: 24, y: 7 },
        { x: 23, y: 7 },
        { x: 22, y: 7 },
        { x: 21, y: 7 },
        { x: 20, y: 8 },
        { x: 19, y: 8 },
        { x: 18, y: 8 },
        { x: 17, y: 8 },
        { x: 17, y: 9 },
        { x: 16, y: 10 },
        { x: 15, y: 11 },
        { x: 15, y: 12 },
        { x: 14, y: 13 },
        { x: 13, y: 13 },
        { x: 12, y: 14 },
        { x: 12, y: 15 },
        { x: 12, y: 16 },
        { x: 12, y: 17 },
        { x: 11, y: 18 },
        { x: 10, y: 20 },
    ];

    vestaBlocks.forEach(({ x, y }) => {
        arena.blocks.push({ x: x * arena.size, y: y * arena.size, type: "metal" });
    });
}
