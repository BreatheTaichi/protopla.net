import dateFormat from "./dateFormat.js";
import times from "./MedalTimes.js";
var recordMedal = new Image();
var sessionMedal = new Image();
export default function drawHUD(arena) {
    var medalTimes = times(arena.difficulty, arena.player);
    arena.context.beginPath();
    arena.context.fillStyle = "#eee";
    arena.context.font = "25px Verdana";
    // arena.currentLap.setTime(Date.now() - arena.lapEnd);
    arena.currentLap = arena.currentLap + 16 + 2 / 3;
    arena.context.fillText(
        "Credits: " + arena.credits,
        5,
        arena.screenHeight - 5
    );
    arena.context.fillText("Lap " + dateFormat(arena.currentLap), 17, 25);
    arena.context.fillText("Last " + dateFormat(arena.lastLap), 10, 55);

    recordMedal = medalTimes.getRecordMedal(
        arena.mapName,
        arena.recordLap,
        arena
    );
    arena.context.drawImage(recordMedal, arena.screenWidth - 258, 5, 24, 24);
    sessionMedal = medalTimes.getRecordMedal(
        arena.mapName,
        arena.sessionBest,
        arena
    );
    arena.context.drawImage(sessionMedal, arena.screenWidth - 258, 35, 24, 24);

    arena.context.fillText(
        dateFormat(arena.recordLap) + " Record",
        arena.screenWidth - 230,
        25
    );
    arena.context.fillText(
        dateFormat(arena.sessionBest) + " Session",
        arena.screenWidth - 230,
        55
    );
    arena.context.closePath();

    // Next two if statements are popups that last until the arena.sessionBestTimer
    // or arena.newRecordLap are > 0.  As they go down, alpha lowers.
    if (arena.sessionBestTimer > 0) {
        arena.context.font = "italic 22px PT";
        arena.context.beginPath();
        arena.context.fillStyle = `rgba(255, 255, 255, ${arena.sessionBestTimer}`;
        arena.sessionBestTimer -= 0.007;
        arena.context.fillText(
            "New session best! " + dateFormat(arena.sessionBest),
            arena.halfSW,
            arena.halfSH + 120
        );
        if (arena.onFirstLap === false) {
            arena.context.fillText(
                "Faster by " + dateFormat(arena.beatTimeBy),
                arena.halfSW,
                arena.halfSH + 150
            );
        }
        if (arena.sessionBestTimer <= 0) arena.onFirstLap = false;
        arena.context.closePath();
    }

    if (arena.newRecordLap > 0) {
        arena.context.font = "italic 22px PT";
        arena.context.beginPath();
        arena.context.fillStyle = `rgba(255, 255, 255, ${arena.newRecordLap}`;
        arena.newRecordLap -= 0.007;
        arena.context.fillText(
            "New record " + dateFormat(arena.recordLap),
            arena.halfSW,
            arena.halfSH + 120
        );
        arena.context.fillText(
            "-" + dateFormat(arena.beatTimeBy),
            arena.halfSW + 30,
            arena.halfSH + 150
        );

        if (arena.newRecordLap <= 0) arena.onFirstLap = false;
        arena.context.closePath();
    }
}
