import { Howl } from "howler";
import sessionBestWAV from "../audio/sessionBest.wav";
import recordLapWAV from "../audio/recordLap.wav";
import lapWAV from "../audio/notification.wav";
var sessionBest = new Howl({
    src: [sessionBestWAV],
});
var recordLap = new Howl({
    src: [recordLapWAV],
});
var lap = new Howl({
    src: [lapWAV],
});

export default function finishLineCH(arena) {
    let start = arena.finishImg.x * arena.size + arena.x + arena.halfSize;
    let end = arena.finishImg.len * arena.size - arena.size;
    let yVal = arena.finishImg.y * arena.size + arena.y + arena.halfSize;

    // Context for arena finishline checkpoint testing.
    // Uncomment all blocks with context to use this.
    // arena.context.save();
    // arena.context.translate(start + arena.halfSW, yVal + arena.halfSH);

    if (
        0 > yVal - arena.halfSize &&
        0 < yVal &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        arena.finishLine = true;
        if (arena.checkPoint && arena.checkLine) {
            arena.lastLap = arena.currentLap;
            arena.hud.last(arena);
            arena.currentLap = 0;
            // If last lap is faster than the session best, set new
            // session best.  If last lap is faster than record lap
            // set new record lap and play recordLap.wav, if new play
            // session best sessionBest.wav else play notification.wav
            if (arena.lastLap < arena.sessionBest) {
                if (arena.lastLap < arena.recordLap) {
                    recordLap.volume(arena.effectsVolume);
                    recordLap.play();
                    // Set timer for record lap popup
                    arena.recordLapTimer = 1;
                    arena.beatTimeBy = arena.recordLap - arena.lastLap;
                    arena.recordLap = arena.lastLap;
                    arena.sessionBest = arena.lastLap;
                    localStorage.setItem(arena.recordLapKey, arena.recordLap);
                    arena.hud.record(arena);
                    arena.hud.session(arena);
                    arena.hud.credits(arena);
                } else {
                    sessionBest.volume(arena.effectsVolume);
                    sessionBest.play();
                    // Set timer for session lap popup
                    arena.sessionBestTimer = 1;
                    arena.beatTimeBy = arena.sessionBest - arena.lastLap;
                    arena.sessionBest = arena.lastLap;
                    arena.hud.session(arena);
                }
            } else {
                lap.volume(arena.effectsVolume);
                lap.play();
            }
            arena.checkPoint = false;
        }
        arena.checkLine = false;
    }

    // Checkline
    if (
        0 > yVal &&
        0 < yVal + arena.halfSize &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.checkPoint) arena.checkLine = true;
        arena.finishLine = false;
    }
    // arena.checkLine
    //     ? (arena.context.fillStyle = "#222")
    //     : (arena.context.fillStyle = "#ddd");
    // arena.context.beginPath();
    // arena.context.rect(-arena.halfSize, 0, arena.size + end, arena.halfSize);
    // arena.context.fill();
    // arena.context.closePath();

    // Checkpoint Top
    if (
        0 > yVal - arena.halfSize + arena.size &&
        0 < yVal + arena.size &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.finishLine) arena.checkPoint = true;
    }

    // arena.checkPoint
    //     ? (arena.context.fillStyle = "#ddd")
    //     : (arena.context.fillStyle = "#222");
    // arena.context.beginPath();
    // arena.context.rect(
    //     -arena.halfSize,
    //     -arena.halfSize + arena.size,
    //     arena.size + end,
    //     arena.halfSize
    // );
    // arena.context.fill();
    // arena.context.closePath();

    // Checkpoint Bottom
    if (
        0 > yVal + arena.size &&
        0 < yVal + arena.halfSize &&
        0 > start - arena.halfSize &&
        0 < start + arena.size + end
    ) {
        if (arena.finishLine) arena.checkPoint = false;
    }

    // arena.checkPoint
    //     ? (arena.context.fillStyle = "#222")
    //     : (arena.context.fillStyle = "#ddd");
    // arena.context.beginPath();
    // arena.context.rect(
    //     -arena.halfSize,
    //     arena.size,
    //     arena.size + end,
    //     arena.halfSize
    // );
    // arena.context.fill();
    // arena.context.closePath();

    // arena.context.translate(-(start + arena.halfSW), -(yVal + arena.halfSH));
    // arena.context.restore();
}
