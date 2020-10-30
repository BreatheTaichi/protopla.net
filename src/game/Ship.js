import userGamepad from "./Gamepad.js";
function thrust(x, y, xm, ym) {
    var thrust = {
        x: x,
        y: y,
        xm: 0,
        ym: 0,
        time: 0,
    };
    return thrust;
}

export default function Ship(rotation = 0, radius = 20, player, arena) {
    var rotationSpeed = parseFloat(
        localStorage.getItem(player + "rotationSpeed")
    );
    var accel = parseFloat(localStorage.getItem(player + "acceleration"));
    var boost = parseFloat(localStorage.getItem(player + "boost"));
    var maxBoost = parseFloat(localStorage.getItem(player + "maxBoost"));
    var friction = parseFloat(localStorage.getItem(player + "friction"));
    var bounceFriction = parseFloat(
        localStorage.getItem(player + "bounceFriction")
    );
    var ship = {
        x: 0,
        y: 0,
        xMomentum: 0,
        yMomentum: 0,
        rotation: rotation,
        radius: radius,

        rotationSpeed: rotationSpeed,
        acceleration: accel,
        boost: boost,
        maxBoost: maxBoost,
        friction: friction,
        bounceFriction: bounceFriction,

        thrustArray: [],
        img: null,
        userGamepad: userGamepad(),

        accelerate(dir) {
            let bx, by;
            let addX =
                Math.sin((-ship.rotation * 2 * Math.PI) / 180) *
                (ship.acceleration + ship.boost) *
                dir;
            let addY =
                Math.cos((-ship.rotation * 2 * Math.PI) / 180) *
                (ship.acceleration + ship.boost) *
                dir;

            ship.boost < ship.maxBoost
                ? (ship.boost += 0.0001)
                : (ship.boost = ship.maxBoost);

            ship.xMomentum -= addX;
            ship.yMomentum -= addY;
            var d = new Date();
            if (d.getMilliseconds() % 2 === 1) {
                var rand = Math.random() * 3 + 30;
                bx =
                    ship.x +
                    (ship.radius + 5) *
                        Math.cos((Math.PI * (ship.rotation + rand)) / 90);
                by =
                    ship.y +
                    (ship.radius + 5) *
                        Math.sin((Math.PI * (ship.rotation + rand)) / 90);
                ship.thrustArray.push(thrust(bx, by));
                rand = Math.random() * 3 + 57;
                bx =
                    ship.x +
                    (ship.radius + 5) *
                        Math.cos((Math.PI * (ship.rotation + rand)) / 90);
                by =
                    ship.y +
                    (ship.radius + 5) *
                        Math.sin((Math.PI * (ship.rotation + rand)) / 90);
                ship.thrustArray.push(thrust(bx, by));
            }
        },

        updateShip(key) {
            var gamepad = navigator.getGamepads()[0];
            if (gamepad && gamepad.connected) {
                if (Math.abs(gamepad.axes[ship.userGamepad.turnLeft]) > 0.2) {
                    if (ship.userGamepad.turnType === "axes") {
                        ship.rotation +=
                            gamepad.axes[ship.userGamepad.turnLeft] *
                            ship.rotationSpeed;
                    }
                } else if (gamepad.buttons[ship.userGamepad.turnLeft].pressed) {
                    if (ship.userGamepad.turnType === "button") {
                        ship.rotation -= 1;
                    }
                } else if (
                    gamepad.buttons[ship.userGamepad.turnRight].pressed
                ) {
                    if (ship.userGamepad.turnType === "button") {
                        ship.rotation += 1;
                    }
                }

                if (gamepad.buttons[ship.userGamepad.forward].pressed) {
                    if (ship.userGamepad.thrustType === "button") {
                        ship.accelerate(-1);
                    }
                } else if (gamepad.buttons[ship.userGamepad.reverse].pressed) {
                    if (ship.userGamepad.thrustType === "button") {
                        ship.accelerate(1);
                    }
                } else if (
                    Math.abs(gamepad.axes[ship.userGamepad.forward]) > 0.2
                ) {
                    if (ship.userGamepad.thrustType === "axes") {
                        ship.accelerate(gamepad.axes[ship.userGamepad.forward]);
                    }
                }
            } else {
                if (key.up) ship.accelerate(-1);
                if (key.down) ship.accelerate(1);

                if (key.left) ship.rotation -= ship.rotationSpeed;
                if (key.right) ship.rotation += ship.rotationSpeed;
            }
            ship.xMomentum *= ship.friction;
            ship.yMomentum *= ship.friction;
        },
    };
    return ship;
}
