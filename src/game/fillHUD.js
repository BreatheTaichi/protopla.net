import dateFormat from "./dateFormat.js";
var recordMedal = new Image();
var sessionMedal = new Image();
var lastMedal = new Image();

export default class FillHUD {
    record(arena) {
        var canvas = document.createElement("canvas");
        canvas.width = 258;
        canvas.height = 20;
        let context = canvas.getContext("2d");
        context.fillStyle = "#eee";
        context.font = "25px Verdana";
        recordMedal = arena.medalTimes.getRecordMedal(arena, arena.recordLap);
        context.drawImage(recordMedal, 0, 0, 22, 22);

        context.beginPath();
        context.fillText(dateFormat(arena.recordLap) + " Record", 32, 20);
        context.closePath();
        context.restore();

        arena.HUDImages[0] = {
            image: canvas,
            x: arena.screenWidth - 258,
            y: 5,
        };
    }

    session(arena) {
        var canvas = document.createElement("canvas");
        canvas.width = 258;
        canvas.height = 20;
        let context = canvas.getContext("2d");
        context.fillStyle = "#eee";
        context.font = "25px Verdana";
        sessionMedal = arena.medalTimes.getRecordMedal(
            arena,
            arena.sessionBest
        );
        context.drawImage(sessionMedal, 0, 0, 22, 22);

        context.beginPath();
        context.fillText(dateFormat(arena.sessionBest) + " Session", 32, 20);
        context.closePath();
        context.restore();

        arena.HUDImages[1] = {
            image: canvas,
            x: arena.screenWidth - 258,
            y: 35,
        };
    }

    last(arena) {
        var canvas = document.createElement("canvas");
        canvas.width = 258;
        canvas.height = 20;
        let context = canvas.getContext("2d");
        context.fillStyle = "#eee";
        context.font = "25px Verdana";
        lastMedal = arena.medalTimes.getRecordMedal(arena, arena.lastLap);
        context.drawImage(lastMedal, 185, 0, 22, 22);

        context.beginPath();
        context.fillText("Last " + dateFormat(arena.lastLap), 0, 20);
        context.closePath();
        context.restore();

        arena.HUDImages[2] = {
            image: canvas,
            x: 10,
            y: 35,
        };
    }

    credits(arena) {
        var canvas = document.createElement("canvas");
        canvas.width = 258;
        canvas.height = 20;
        let context = canvas.getContext("2d");
        context.fillStyle = "#eee";
        context.font = "25px Verdana";

        context.beginPath();
        context.fillText("Credits: " + arena.credits, 0, 20);
        context.closePath();
        context.restore();

        arena.HUDImages[3] = {
            image: canvas,
            x: 10,
            y: arena.screenHeight - 25,
        };
    }

    popups(arena) {
        // console.log(
        //     "sessionBestTimer: " +
        //         arena.sessionBestTimer +
        //         "  recordLapTimer: " +
        //         arena.recordLapTimer
        // );
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

        if (arena.recordLapTimer > 0) {
            arena.context.font = "italic 22px PT";
            arena.context.beginPath();
            arena.context.fillStyle = `rgba(255, 255, 255, ${arena.recordLapTimer}`;
            arena.recordLapTimer -= 0.007;
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
}
