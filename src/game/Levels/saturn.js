import {
    arc,
    horizontalLine,
    verticalLine,
    circle,
    ellipse,
} from "../shapes.js";
import loadImageToCanvas from "../../hooks/loadImageToCanvas.js";
import saturnPNG from "../images/saturn/Saturn.webp";
import enceladusPNG from "../images/saturn/enceladus.webp";
import epimetheusPNG from "../images/saturn/epimetheus.webp";
import helenePNG from "../images/saturn/helene.webp";
import hyperionPNG from "../images/saturn/hyperion.webp";
import iapetusPNG from "../images/saturn/iapetus.webp";
import janusPNG from "../images/saturn/janus.webp";
import panPNG from "../images/saturn/pan.webp";
import pandoraPNG from "../images/saturn/pandora.webp";
import phoebePNG from "../images/saturn/phoebe.webp";
import prometheusPNG from "../images/saturn/prometheus.webp";
import backgroundPic from "../images/background/SoulNebula.webp";
import alienShip from "../images/ships/alienShip.webp";
import arrowPNG from "../images/icons/courseArrow.webp";
import loadingImage from "../images/loading/saturn.jpg";
import finish from "../bricks/finishBlock.js";

export default function Sun(arena) {
    arena.finishImg = { x: 119, y: 143, len: 12 };
    var finishBlock = finish(arena, arena.finishImg.len);
    arena.images.push({
        img: finishBlock,
        xStart: arena.finishImg.x,
        yStart: arena.finishImg.y,
    });
    var ship = loadImageToCanvas(50, 50, alienShip, arena);
    var background = loadImageToCanvas(6660, 3482, backgroundPic, arena);
    var saturn = loadImageToCanvas(4950, 1890, saturnPNG, arena);
    var enceladus = loadImageToCanvas(1000, 1000, enceladusPNG, arena);
    var epimetheus = loadImageToCanvas(586, 559, epimetheusPNG, arena);
    var helene = loadImageToCanvas(336, 369, helenePNG, arena);
    var hyperion = loadImageToCanvas(797, 857, hyperionPNG, arena);
    var iapetus = loadImageToCanvas(1031, 1003, iapetusPNG, arena);
    var janus = loadImageToCanvas(955, 895, janusPNG, arena);
    var pan = loadImageToCanvas(431, 371, panPNG, arena);
    var pandora = loadImageToCanvas(516, 768, pandoraPNG, arena);
    var phoebe = loadImageToCanvas(704, 931, phoebePNG, arena);
    var prometheus = loadImageToCanvas(497, 298, prometheusPNG, arena);
    var arrow0 = loadImageToCanvas(150, 150, arrowPNG, arena, 220);
    arena.images.push({ img: arrow0, xStart: 119, yStart: 112 });
    var arrow1 = loadImageToCanvas(150, 150, arrowPNG, arena, 270);
    arena.images.push({ img: arrow1, xStart: 143, yStart: 129 });
    var arrow2 = loadImageToCanvas(150, 150, arrowPNG, arena, 130);
    arena.images.push({ img: arrow2, xStart: 98, yStart: 82 });
    var arrow3 = loadImageToCanvas(150, 150, arrowPNG, arena, 50);
    arena.images.push({ img: arrow3, xStart: 91, yStart: 129 });
    var arrow4 = loadImageToCanvas(150, 150, arrowPNG, arena, 260);
    arena.images.push({ img: arrow4, xStart: 80, yStart: 158 });
    var arrow5 = loadImageToCanvas(150, 150, arrowPNG, arena, -45);
    arena.images.push({ img: arrow5, xStart: 166, yStart: 128 });
    var arrow6 = loadImageToCanvas(150, 150, arrowPNG, arena, 0);
    arena.images.push({ img: arrow6, xStart: 225, yStart: 135 });
    var arrow7 = loadImageToCanvas(150, 150, arrowPNG, arena, 40);
    arena.images.push({ img: arrow7, xStart: 337, yStart: 131 });
    var arrow8 = loadImageToCanvas(150, 150, arrowPNG, arena, 220);
    arena.images.push({ img: arrow8, xStart: 328, yStart: 164 });
    var arrow9 = loadImageToCanvas(150, 150, arrowPNG, arena, 85);
    arena.images.push({ img: arrow9, xStart: 215, yStart: 162 });
    var arrow10 = loadImageToCanvas(150, 150, arrowPNG, arena, 135);
    arena.images.push({ img: arrow10, xStart: 220, yStart: 203 });
    var arrow11 = loadImageToCanvas(150, 150, arrowPNG, arena, 210);
    arena.images.push({ img: arrow11, xStart: 203, yStart: 183 });
    var arrow12 = loadImageToCanvas(150, 150, arrowPNG, arena, 0);
    arena.images.push({ img: arrow12, xStart: 238, yStart: 203 });
    var arrow13 = loadImageToCanvas(150, 150, arrowPNG, arena, 135);
    arena.images.push({ img: arrow13, xStart: 249, yStart: 215 });
    var arrow14 = loadImageToCanvas(150, 150, arrowPNG, arena, 295);
    arena.images.push({ img: arrow14, xStart: 159, yStart: 184 });
    var arrow15 = loadImageToCanvas(150, 150, arrowPNG, arena, 95);
    arena.images.push({ img: arrow15, xStart: 145, yStart: 165 });
    var arrow16 = loadImageToCanvas(150, 150, arrowPNG, arena, 265);
    arena.images.push({ img: arrow16, xStart: 127, yStart: 167 });

    arena.loadingImage = loadingImage;
    arena.loadingMessage = [
        "Beautiful ringed Saturn and some of it's many moons. " +
            "Saturn has more moons than even Jupiter. " +
            "Though many are yet unconfirmed, it's estimated " +
            "that there will be 82 in all.",
        "Conspicuously missing is the moon Titan, which will " +
            "feature prominently in another version of the level.",
        "In the background you will see the Soul Nebula, or " +
            "Embryo Nebula.",
    ];
    arena.links = [
        {
            text: "More information on Saturn: ",
            link: "https://solarsystem.nasa.gov/planets/saturn/overview/",
        },
        {
            text: "Saturn's Moons: ",
            link: "https://solarsystem.nasa.gov/moons/saturn-moons/overview/",
        },
        {
            text: "To read more about, and see the Soul Nebula: ",
            link:
                "https://www.jpl.nasa.gov/spaceimages/details.php?id=pia13014",
        },
    ];
    arena.ship.img = ship;
    arena.background = background;
    arena.images.push({ img: saturn, xStart: 129, yStart: 122 });
    ellipse(191, 145.6, 24.4, 22.2, "invisible", arena);
    ellipse(190.3, 145, 58.3, 5, "invisible", arena);

    arena.images.push({ img: pan, xStart: 114, yStart: 99 });
    arena.images.push({ img: hyperion, xStart: 85, yStart: 145 });

    arena.images.push({ img: enceladus, xStart: 326, yStart: 140 });
    circle(338.4, 152.5, 11.35, "invisible", arena);

    arena.images.push({ img: epimetheus, xStart: 150, yStart: 161 });
    circle(157, 168, 6, "invisible", arena);

    arena.images.push({ img: helene, xStart: 134, yStart: 175 });
    arena.images.push({ img: iapetus, xStart: 85, yStart: 100 });
    circle(97.7, 112.2, 11.2, "invisible", arena);

    arena.images.push({ img: janus, xStart: 217, yStart: 186 });
    arena.images.push({ img: pandora, xStart: 304, yStart: 152 });
    arena.images.push({ img: phoebe, xStart: 176, yStart: 179 });
    arena.images.push({ img: prometheus, xStart: 267, yStart: 202 });

    // from the right side of the finish line up
    verticalLine(131, 114, 30, "metal", arena);
    // left side of finish line
    arc(30, 129, 353, 390, 90, "metal", arena);
    // circle to pan
    arc(125, 113, 270, 365, 6, "metal", arena);
    // blocks outside of pan
    horizontalLine(110, 118, 9, "metal", arena);
    arc(120, 102, 185, 370, 18, "metal", arena);
    // from arc back to saturn
    verticalLine(139, 105, 30, "metal", arena);
    // second ring around pan
    arc(114, 114, 125, 403, 40, "metal", arena);
    // around hyperion
    arc(92, 160, 40, 220, 22, "metal", arena);
    // third ring around pan
    arc(114, 114, 140, 378, 52, "metal", arena);
    // above saturn
    arc(192, 145, 218, 335, 33, "metal", arena);
    // above saturn's right ring, to the right
    horizontalLine(223, 131, 20, "metal", arena);
    horizontalLine(243, 130, 18, "metal", arena);
    horizontalLine(261, 129, 15, "metal", arena);
    horizontalLine(276, 128, 12, "metal", arena);
    horizontalLine(288, 127, 10, "metal", arena);
    horizontalLine(298, 126, 10, "metal", arena);
    horizontalLine(308, 125, 14, "metal", arena);
    horizontalLine(322, 124, 9, "metal", arena);
    // from saturn's right ring, to the right to enceladus
    horizontalLine(250, 144, 16, "metal", arena);
    horizontalLine(266, 143, 18, "metal", arena);
    horizontalLine(284, 142, 10, "metal", arena);
    horizontalLine(294, 141, 12, "metal", arena);
    horizontalLine(306, 140, 14, "metal", arena);
    horizontalLine(320, 139, 18, "metal", arena);
    // around enceladus
    arc(331, 154, 270, 506, 30, "metal", arena);
    // back to saturn
    horizontalLine(224, 159, 5, "metal", arena);
    horizontalLine(229, 158, 4, "metal", arena);
    horizontalLine(233, 157, 3, "metal", arena);
    horizontalLine(236, 156, 9, "metal", arena);
    horizontalLine(245, 155, 16, "metal", arena);
    horizontalLine(261, 154, 22, "metal", arena);
    horizontalLine(283, 153, 17, "metal", arena);
    horizontalLine(300, 152, 9, "metal", arena);
    // then down to janus
    verticalLine(223, 160, 10, "metal", arena);
    verticalLine(224, 170, 8, "metal", arena);
    verticalLine(225, 178, 6, "metal", arena);
    verticalLine(226, 184, 4, "metal", arena);
    verticalLine(227, 188, 2, "metal", arena);
    // left side of wall
    verticalLine(211, 161, 10, "metal", arena);
    verticalLine(212, 171, 8, "metal", arena);
    verticalLine(213, 179, 6, "metal", arena);
    verticalLine(214, 185, 4, "metal", arena);
    verticalLine(215, 189, 12, "metal", arena);
    verticalLine(214, 201, 4, "metal", arena);
    // under janus around to phoebe
    arc(204, 198, 16, 170, 26, "metal", arena);
    arc(204, 198, 32, 153, 12, "metal", arena);
    // from the right of phoebe
    arc(192, 201, 279, 362, 13, "metal", arena);
    // from jupiter, above phoebe, all the way to janus
    arc(204, 198, 15, 231, 40, "metal", arena);
    // off the right of janus to prometheus
    arc(240, 240, 266, 310, 42, "metal", arena);
    arc(240, 240, 276, 310, 32, "metal", arena);
    // around prometheus
    arc(272, 206, 270, 509, 14, "metal", arena);
    // above prometheus
    arc(240, 240, 266, 304, 56, "metal", arena);
    // above that
    arc(240, 240, 256, 303, 66, "metal", arena);
    // outside prometheus
    arc(272, 206, 282, 500, 23, "metal", arena);
    // lowest point, under janus and phoebe
    arc(204, 198, 25, 205, 54, "metal", arena);
    // from saturn's ring, to the left of epimetheus to helene
    arc(157, 168, 160, 243, 20, "metal", arena);
    // under helene
    arc(138, 180, 45, 195, 16, "metal", arena);
    // up toward finish line on the left
    verticalLine(121, 166, 10, "metal", arena);
    verticalLine(120, 156, 10, "metal", arena);
    verticalLine(119, 151, 5, "metal", arena);
    // on the right
    verticalLine(136, 157, 7, "metal", arena);
    verticalLine(135, 153, 4, "metal", arena);
    verticalLine(134, 148, 5, "metal", arena);

    var saturnBlocks = [
        // saturn extra blocks
        { x: 131, y: 145 },

        // blocks over Pan from lower right, clockwise
        { x: 124, y: 107 },
        { x: 123, y: 107 },
        { x: 122, y: 107 },
        { x: 121, y: 107 },
        { x: 120, y: 107 },
        { x: 119, y: 107 },
        { x: 118, y: 107 },
        { x: 117, y: 106 },
        { x: 116, y: 105 },
        { x: 115, y: 104 },
        { x: 115, y: 103 },
        { x: 115, y: 102 },
        { x: 116, y: 101 },
        { x: 117, y: 101 },
        { x: 118, y: 100 },
        { x: 119, y: 100 },
        { x: 120, y: 100 },
        { x: 121, y: 101 },
        { x: 122, y: 101 },
        { x: 123, y: 102 },
        { x: 124, y: 103 },
        { x: 124, y: 104 },
        { x: 124, y: 105 },
        { x: 123, y: 106 },

        // hyperion
        { x: 91, y: 148 },
        { x: 92, y: 148 },
        { x: 93, y: 148 },
        { x: 94, y: 147 },
        { x: 95, y: 147 },
        { x: 96, y: 147 },
        { x: 97, y: 146 },
        { x: 98, y: 146 },
        { x: 99, y: 146 },
        { x: 100, y: 146 },
        { x: 101, y: 146 },
        { x: 102, y: 147 },
        { x: 103, y: 147 },
        { x: 103, y: 148 },
        { x: 103, y: 149 },
        { x: 104, y: 150 },
        { x: 104, y: 151 },
        { x: 104, y: 152 },
        { x: 104, y: 153 },
        { x: 104, y: 154 },
        { x: 104, y: 155 },
        { x: 103, y: 156 },
        { x: 103, y: 157 },
        { x: 103, y: 158 },
        { x: 102, y: 159 },
        { x: 102, y: 160 },
        { x: 101, y: 161 },
        { x: 100, y: 162 },
        { x: 99, y: 162 },
        { x: 98, y: 163 },
        { x: 97, y: 164 },
        { x: 96, y: 164 },
        { x: 95, y: 164 },
        { x: 94, y: 165 },
        { x: 93, y: 165 },
        { x: 92, y: 165 },
        { x: 91, y: 165 },
        { x: 90, y: 165 },
        { x: 89, y: 165 },
        { x: 88, y: 165 },
        { x: 88, y: 164 },
        { x: 87, y: 163 },
        { x: 86, y: 162 },
        { x: 86, y: 161 },
        { x: 86, y: 160 },
        { x: 86, y: 159 },
        { x: 86, y: 158 },
        { x: 86, y: 157 },
        { x: 87, y: 156 },
        { x: 87, y: 155 },
        { x: 88, y: 154 },
        { x: 88, y: 153 },
        { x: 88, y: 152 },
        { x: 89, y: 151 },
        { x: 90, y: 150 },
        { x: 91, y: 149 },

        // pandora
        { x: 308, y: 170 },
        { x: 309, y: 170 },
        { x: 310, y: 170 },
        { x: 311, y: 170 },
        { x: 312, y: 170 },
        { x: 313, y: 170 },
        { x: 313, y: 170 },
        { x: 313, y: 169 },
        { x: 314, y: 168 },
        { x: 314, y: 167 },
        { x: 315, y: 166 },
        { x: 315, y: 165 },
        { x: 315, y: 164 },
        { x: 315, y: 163 },
        { x: 316, y: 162 },
        { x: 316, y: 161 },
        { x: 316, y: 160 },
        { x: 316, y: 159 },
        { x: 316, y: 158 },
        { x: 316, y: 157 },
        { x: 315, y: 156 },
        { x: 315, y: 155 },
        { x: 314, y: 154 },
        { x: 313, y: 154 },
        { x: 312, y: 153 },
        { x: 311, y: 153 },
        { x: 310, y: 153 },
        { x: 309, y: 153 },

        // helene
        { x: 138, y: 176 },
        { x: 137, y: 176 },
        { x: 136, y: 177 },
        { x: 136, y: 178 },
        { x: 135, y: 179 },
        { x: 135, y: 180 },
        { x: 136, y: 181 },
        { x: 137, y: 182 },
        { x: 137, y: 183 },
        { x: 138, y: 183 },
        { x: 139, y: 183 },
        { x: 140, y: 182 },
        { x: 141, y: 181 },
        { x: 141, y: 180 },
        { x: 141, y: 179 },
        { x: 140, y: 178 },
        { x: 139, y: 177 },

        // janus
        { x: 227, y: 190 },
        { x: 227, y: 191 },
        { x: 228, y: 191 },
        { x: 229, y: 191 },
        { x: 230, y: 191 },
        { x: 231, y: 192 },
        { x: 232, y: 192 },
        { x: 233, y: 193 },
        { x: 234, y: 194 },
        { x: 235, y: 194 },
        { x: 235, y: 195 },
        { x: 236, y: 196 },
        { x: 236, y: 197 },
        { x: 236, y: 198 },
        { x: 235, y: 199 },
        { x: 235, y: 200 },
        { x: 234, y: 201 },
        { x: 233, y: 202 },
        { x: 232, y: 202 },
        { x: 231, y: 203 },
        { x: 230, y: 203 },
        { x: 229, y: 204 },
        { x: 228, y: 203 },
        { x: 227, y: 202 },
        { x: 226, y: 201 },
        { x: 225, y: 200 },
        { x: 225, y: 199 },
        { x: 224, y: 198 },
        { x: 224, y: 197 },
        { x: 224, y: 196 },
        { x: 224, y: 195 },
        { x: 225, y: 194 },
        { x: 225, y: 193 },
        { x: 226, y: 193 },
        { x: 226, y: 192 },

        // prometheus
        { x: 268, y: 207 },
        { x: 268, y: 206 },
        { x: 269, y: 205 },
        { x: 270, y: 204 },
        { x: 271, y: 204 },
        { x: 272, y: 204 },
        { x: 273, y: 203 },
        { x: 274, y: 203 },
        { x: 275, y: 203 },
        { x: 277, y: 204 },
        { x: 277, y: 205 },
        { x: 276, y: 206 },
        { x: 275, y: 207 },
        { x: 274, y: 207 },
        { x: 273, y: 208 },
        { x: 272, y: 208 },
        { x: 271, y: 208 },
        { x: 270, y: 208 },
        { x: 269, y: 207 },

        // phoebe
        { x: 193, y: 188 },
        { x: 192, y: 187 },
        { x: 192, y: 186 },
        { x: 192, y: 185 },
        { x: 192, y: 184 },
        { x: 191, y: 183 },
        { x: 190, y: 182 },
        { x: 189, y: 181 },
        { x: 188, y: 181 },
        { x: 187, y: 181 },
        { x: 186, y: 180 },
        { x: 185, y: 180 },
        { x: 184, y: 180 },
        { x: 183, y: 180 },
        { x: 182, y: 180 },
        { x: 181, y: 180 },
        { x: 180, y: 180 },
        { x: 179, y: 180 },
        { x: 178, y: 181 },
        { x: 177, y: 182 },
        { x: 177, y: 183 },
        { x: 177, y: 184 },
        { x: 177, y: 185 },
        { x: 178, y: 186 },
        { x: 178, y: 187 },
        { x: 178, y: 188 },
        { x: 179, y: 189 },
        { x: 179, y: 190 },
        { x: 179, y: 191 },
        { x: 179, y: 192 },
        { x: 178, y: 193 },
        { x: 178, y: 194 },
        { x: 178, y: 195 },
        { x: 177, y: 196 },
        { x: 177, y: 197 },
        { x: 177, y: 198 },
        { x: 177, y: 199 },
        { x: 177, y: 200 },
        { x: 178, y: 201 },
        { x: 179, y: 202 },
        { x: 180, y: 201 },
        { x: 181, y: 201 },
        { x: 182, y: 201 },
        { x: 183, y: 201 },
        { x: 184, y: 201 },
        { x: 185, y: 200 },
        { x: 186, y: 200 },
        { x: 187, y: 199 },
        { x: 188, y: 198 },
        { x: 189, y: 198 },
        { x: 190, y: 197 },
        { x: 191, y: 196 },
        { x: 191, y: 195 },
        { x: 192, y: 194 },
        { x: 192, y: 193 },
        { x: 192, y: 192 },
        { x: 192, y: 191 },
        { x: 192, y: 190 },
        { x: 193, y: 189 },

        // enceladus
        { x: 338, y: 140 },
        { x: 350, y: 151 },
        { x: 350, y: 152 },
        { x: 350, y: 153 },
    ];

    saturnBlocks.forEach(({ x, y }) => {
        arena.blocks.push({
            x: x * arena.size,
            y: y * arena.size,
            type: "invisible",
        });
    });
}
