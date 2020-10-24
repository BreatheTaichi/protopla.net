export default function Gamepad() {
    var gamepad = {
        forward:
            localStorage.getItem("forward") === null
                ? 1
                : localStorage.getItem("forward"),
        reverse:
            localStorage.getItem("reverse") === null
                ? 0
                : localStorage.getItem("reverse"),
        thrustType:
            localStorage.getItem("thrustType") === null
                ? "button"
                : localStorage.getItem("thrustType"),
        turnLeft:
            localStorage.getItem("turnLeft") === null
                ? 0
                : localStorage.getItem("turnLeft"),
        turnRight:
            localStorage.getItem("turnRight") === null
                ? 1
                : localStorage.getItem("turnRight"),
        turnType:
            localStorage.getItem("turnType") === null
                ? "axes"
                : localStorage.getItem("turnType"),
        start:
            localStorage.getItem("start") === null
                ? 10
                : localStorage.getItem("start"),
        select:
            localStorage.getItem("select") === null
                ? 9
                : localStorage.getItem("select"),

        saveGamepad() {
            localStorage.setItem("forward", gamepad.forward);
            localStorage.setItem("thrustType", gamepad.thrustType);
            localStorage.setItem("reverse", gamepad.reverse);
            localStorage.setItem("thrustType", gamepad.thrustType);
            localStorage.setItem("turnType", gamepad.turnType);
            localStorage.setItem("turnLeft", gamepad.turnLeft);
            localStorage.setItem("turnRight", gamepad.turnRight);
            localStorage.setItem("start", gamepad.start);
            localStorage.setItem("select", gamepad.select);
        },
    };

    return gamepad;
}
