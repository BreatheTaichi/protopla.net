import userGamepad from "./Gamepad.js";
function thrust(x, y, arena) {
    var thrust = {
        x: x,
        y: y,
        xm: arena.ship.xMomentum / 3,
        ym: arena.ship.yMomentum / 3,
        time: 0,
    };
    return thrust;
}

export default function Ship(rotation = 0, radius = 20, arena) {
    var rotationSpeed = parseFloat(
        localStorage.getItem(arena.player + "rotationSpeed")
    );
    var accel = parseFloat(localStorage.getItem(arena.player + "acceleration"));
    var boost = parseFloat(localStorage.getItem(arena.player + "boost"));
    var maxBoost = parseFloat(localStorage.getItem(arena.player + "maxBoost"));
    var friction = parseFloat(localStorage.getItem(arena.player + "friction"));
    var bounceFriction = parseFloat(
        localStorage.getItem(arena.player + "bounceFriction")
    );
    var ship = {
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

        // Bool to switch thruster every other run
        thrusterSwitch: true,

        accelerate(dir) {
            let bx, by;
            let rot = (-ship.rotation * 6.283) / 180;
            let force = (ship.acceleration + ship.boost) * dir;
            let addX = Math.sin(rot) * force;
            let addY = Math.cos(rot) * force;
            ship.xMomentum -= addX;
            ship.yMomentum -= addY;

            ship.boost < ship.maxBoost
                ? (ship.boost += 0.0001)
                : (ship.boost = ship.maxBoost);

            if (this.thrusterSwitch) {
                var rand =
                    (Math.PI * (ship.rotation + Math.random() * 3 + 30)) / 90;
                bx = ship.radius * Math.cos(rand);
                by = ship.radius * Math.sin(rand);
                ship.thrustArray.push(thrust(bx, by, arena));

                rand =
                    (Math.PI * (ship.rotation + Math.random() * 3 + 60)) / 90;
                bx = ship.radius * Math.cos(rand);
                by = ship.radius * Math.sin(rand);
                ship.thrustArray.push(thrust(bx, by, arena));
            }
            this.thrusterSwitch = !this.thrusterSwitch;
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
                        ship.rotation -= ship.rotationSpeed;
                    }
                } else if (
                    gamepad.buttons[ship.userGamepad.turnRight].pressed
                ) {
                    if (ship.userGamepad.turnType === "button") {
                        ship.rotation += ship.rotationSpeed;
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

        gamepadUpdate(gamepad) {
            if (Math.abs(gamepad.axes[ship.userGamepad.turnLeft]) > 0.2) {
                if (ship.userGamepad.turnType === "axes") {
                    ship.rotation +=
                        gamepad.axes[ship.userGamepad.turnLeft] *
                        ship.rotationSpeed;
                }
            } else if (gamepad.buttons[ship.userGamepad.turnLeft].pressed) {
                if (ship.userGamepad.turnType === "button") {
                    ship.rotation -= ship.rotationSpeed;
                }
            } else if (gamepad.buttons[ship.userGamepad.turnRight].pressed) {
                if (ship.userGamepad.turnType === "button") {
                    ship.rotation += ship.rotationSpeed;
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
            } else if (Math.abs(gamepad.axes[ship.userGamepad.forward]) > 0.2) {
                if (ship.userGamepad.thrustType === "axes") {
                    ship.accelerate(gamepad.axes[ship.userGamepad.forward]);
                }
            }

            ship.xMomentum *= ship.friction;
            ship.yMomentum *= ship.friction;
        },

        keyboardUpdate(key) {
            if (key.up) ship.accelerate(-1);
            if (key.down) ship.accelerate(1);

            if (key.left) ship.rotation -= ship.rotationSpeed;
            if (key.right) ship.rotation += ship.rotationSpeed;

            ship.xMomentum *= ship.friction;
            ship.yMomentum *= ship.friction;
        },
    };
    return ship;
}
