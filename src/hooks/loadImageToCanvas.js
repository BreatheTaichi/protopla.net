function rads(x) {
    return (Math.PI * x) / 180;
}
export default function loadImageToCanvas(sizeX, sizeY, image, arena, rotate) {
    var canvas = document.createElement("canvas");
    canvas.width = sizeX;
    canvas.height = sizeY;
    var context = canvas.getContext("2d");

    arena.numberToLoad++;
    var img = new Image();
    img.onload = function () {
        arena.numberToLoad--;

        if (rotate !== undefined) {
            context.translate(sizeX / 2, sizeY / 2);
            context.rotate(rads(rotate));
            context.translate(-sizeX / 2, -sizeY / 2);
        }
        context.drawImage(img, 0, 0, sizeX, sizeY);
    };
    img.src = image;

    return canvas;
}
