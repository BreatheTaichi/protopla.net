// Draw finish line by making 2 black and 2 white squares a
// quarter the size of the arena block, in a square for
// each block to the .len of the the finishline
export default function finishBlock(arena, len) {
    let line = document.createElement("canvas");
    line.width = len * arena.size;
    line.height = arena.halfSize;
    let lineContext = line.getContext("2d");

    const quarterSize = arena.halfSize / 2;
    lineContext.closePath();
    for (let i = 0; i < len * 2; i++) {
        lineContext.beginPath();
        lineContext.rect(i * 2 * quarterSize, 0, quarterSize, quarterSize);
        lineContext.rect(
            i * 2 * quarterSize + quarterSize,
            quarterSize,
            quarterSize,
            quarterSize
        );
        lineContext.fillStyle = "#fff";
        lineContext.fill();
        lineContext.beginPath();

        lineContext.rect(
            i * 2 * quarterSize + quarterSize,
            0,
            quarterSize,
            quarterSize
        );
        lineContext.rect(
            i * 2 * quarterSize,
            quarterSize,
            quarterSize,
            quarterSize
        );
        lineContext.fillStyle = "#000";
        lineContext.fill();
    }
    return line;
}
