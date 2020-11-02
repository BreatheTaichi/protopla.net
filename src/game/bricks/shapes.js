export function arc(cx, cy, angleFrom, angleTo, radius, type, arena) {
    var points = [];
    // angle is the number of degrees between each check to place a block
    // 55 / radius seems to stop there from being holes, but doesn't cause
    // too many extra to be placed.
    var angle = 55 / radius;
    for (let i = angleFrom; i < angleTo; i += angle) {
        var match = false;
        var radian = i * 0.0174532925;
        var x = Math.round(Math.cos(radian) * radius) + cx;
        var y = Math.round(Math.sin(radian) * radius) + cy;
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
        }
    }
}

export function circle(cx, cy, radius, type, arena) {
    var points = [];
    var angle = 55 / radius;
    for (let i = 0; i < 360; i += angle) {
        var match = false;
        var radian = i * 0.0174532925;
        var x = Math.round(Math.cos(radian) * radius) + cx;
        var y = Math.round(Math.sin(radian) * radius) + cy;
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
        }
    }
}

export function diagonalLeft(x, y, len, type, arena) {
    for (let i = 0; i < len; i++) {
        arena.blocks.push({
            x: (x - i) * arena.size,
            y: (y + i) * arena.size,
            type,
        });
    }
}

export function diagonalRight(x, y, len, type, arena) {
    for (let i = 0; i < len; i++) {
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: (y + i) * arena.size,
            type,
        });
    }
}

export function drawBody(x, y, image, arena) {
    // var width = image.width / arena.size / 1.6;
    // var height = image.height / arena.size / 1.6;
    var width = image.width;
    var height = image.height;
    x = x * arena.size + arena.x;
    y = y * arena.size + arena.y;
    // Bounding box for screen, skip images out of view
    if (
        x < -arena.halfSW - width ||
        x > arena.halfSW + width ||
        y < -arena.halfSH - height ||
        y > arena.halfSH + height
    ) {
        return;
    }
    arena.context.drawImage(
        image,
        arena.halfSW + x,
        arena.halfSH + y
        // width,
        // height
    );
}

export function ellipse(cx, cy, a, b, type, arena) {
    var points = [];
    var angle = 0.3;
    for (let i = 0; i < 360; i += angle) {
        var match = false;
        let mathTanI = Math.tan(i);
        let denominator = Math.sqrt(b * b + a * a * mathTanI * mathTanI);
        let xVal = Math.round((a * b) / denominator);
        let yVal = Math.round((a * b * mathTanI) / denominator);
        var x = cx + xVal;
        var y = cy + yVal;
        var x2 = cx - xVal;
        var y2 = cy - yVal;
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x && points[j].y === y) match = true;
        }
        if (!match) {
            arena.blocks.push({
                x: x * arena.size,
                y: y * arena.size,
                type: type,
            });
            points.push({ x: x, y: y });
            arena.blocks.push({
                x: x2 * arena.size,
                y: y2 * arena.size,
                type: type,
            });
        }
    }
}

export function horizontalLine(x, y, length, type, arena) {
    const l = length >= 0 ? 1 : -1;
    for (let i = 0; i < Math.abs(length); i++) {
        arena.blocks.push({
            x: (x + i * l) * arena.size,
            y: y * arena.size,
            type: type,
        });
    }
}

export function line(x, y, x2, y2, type, arena) {
    var points = [];
    // Get length of x and y
    var xLen = Math.pow(x - x2, 2);
    var yLen = Math.pow(y - y2, 2);
    // Length of the vector
    var len = Math.sqrt(xLen + yLen);

    for (let i = 0; i < len; i++) {
        var match = false;
        var x3 = x - (i / len) * (x - x2);
        x3 = Math.round(x3);
        var y3 = y - (i / len) * (y - y2);
        y3 = Math.round(y3);
        for (let j = 0; j < points.length; j++) {
            if (points[j].x === x3 && points[j].y === y3) match = true;
        }
        if (!match) {
            console.log("x: " + x3 + "  y: " + y3);
            points.push({ x: x3, y: y3 });
            arena.blocks.push({
                x: x3 * arena.size,
                y: y3 * arena.size,
                type,
            });
        }
    }
}

export function rectangle(xStart, yStart, xEnd, yEnd, type, arena) {
    const xLen = xEnd - xStart;
    const yLen = yEnd - yStart;
    for (let i = 0; i < xLen; i++) {
        arena.blocks.push({
            x: (xStart + i) * arena.size,
            y: yStart * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (xStart + i) * arena.size,
            y: yEnd * arena.size,
            type: type,
        });
    }
    for (let i = 0; i < yLen; i++) {
        arena.blocks.push({
            x: xStart * arena.size,
            y: (yStart + i) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: xEnd * arena.size,
            y: (yStart + i) * arena.size,
            type: type,
        });
    }
}

export function square(x, y, size, type, arena) {
    for (let i = 0; i < size; i++) {
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: y * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: x * arena.size,
            y: (y + i) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (x + i) * arena.size,
            y: (y + size) * arena.size,
            type: type,
        });
        arena.blocks.push({
            x: (x + size) * arena.size,
            y: (y + i) * arena.size,
            type: type,
        });
    }
    arena.blocks.push({
        x: (x + size) * arena.size,
        y: (y + size) * arena.size,
        type: type,
    });
}

export function verticalLine(x, y, length, type, arena) {
    const l = length >= 0 ? 1 : -1;
    for (let i = 0; i < length; i++) {
        arena.blocks.push({
            x: x * arena.size,
            y: (y + i * l) * arena.size,
            type: type,
        });
    }
}
