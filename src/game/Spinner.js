export default function Spinner(arena) {
    // arena.context.clearRect(0, 0, arena.screenWidth, arena.screenHeight);
    arena.context.fillStyle = "#000";
    arena.context.fillRect(0, 0, arena.screenWidth, arena.screenHeight);

    arena.context.lineWidth = 4;
    arena.context.beginPath();
    arena.context.strokeStyle = "#559";
    arena.context.fillStyle = "#99e";
    arena.context.arc(
        arena.halfSW + 160,
        arena.halfSH - 60,
        50,
        arena.spinner,
        Math.PI + arena.spinner
    );
    arena.context.stroke();
    arena.context.fill();
    arena.context.closePath();

    arena.context.beginPath();
    arena.context.strokeStyle = "#99e";
    arena.context.fillStyle = "#559";
    arena.context.arc(
        arena.halfSW + 160,
        arena.halfSH - 60,
        50,
        Math.PI + arena.spinner,
        arena.spinner
    );
    arena.context.stroke();
    arena.context.fill();
    arena.context.closePath();

    arena.context.font = "55px Verdana";
    arena.context.fillStyle = "#99e";
    arena.context.fillText("Loading", arena.halfSW - 130, arena.halfSH - 45);

    // Add radians to spinner or reset
    if (arena.spinner <= Math.PI * 2) {
        arena.spinner += 0.04;
    } else {
        arena.spinner = 0.04;
    }
}
