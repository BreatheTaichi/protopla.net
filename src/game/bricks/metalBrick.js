export default function metalBrick(brickSize) {
    let halfBrick = brickSize / 2;
    let brick = document.createElement("canvas");
    brick.width = brickSize;
    brick.height = brickSize;
    let brick_context = brick.getContext("2d");

    brick_context.translate(halfBrick, halfBrick);
    brick_context.beginPath();
    brick_context.moveTo(0, 0);
    brick_context.lineTo(halfBrick, halfBrick);
    brick_context.lineTo(-halfBrick, halfBrick);
    brick_context.closePath();
    brick_context.fillStyle = "#333";
    brick_context.fill();

    brick_context.beginPath();
    brick_context.moveTo(0, 0);
    brick_context.lineTo(halfBrick, -halfBrick);
    brick_context.lineTo(halfBrick, halfBrick);
    brick_context.closePath();
    brick_context.fillStyle = "#777";
    brick_context.fill();

    brick_context.beginPath();
    brick_context.moveTo(0, 0);
    brick_context.lineTo(-halfBrick, halfBrick);
    brick_context.lineTo(-halfBrick, -halfBrick);
    brick_context.closePath();
    brick_context.fillStyle = "#555";
    brick_context.fill();

    brick_context.beginPath();
    brick_context.moveTo(0, 0);
    brick_context.lineTo(-halfBrick, -halfBrick);
    brick_context.lineTo(halfBrick, -halfBrick);
    brick_context.closePath();
    brick_context.fillStyle = "#999";
    brick_context.fill();

    return brick;
}
