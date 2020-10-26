import React, { useState, useEffect } from "react";
import controller from "./game/Gamepad.js";
import arrow from "./game/images/icons/whiteArrowLeft.webp";

var userGamepad = controller();
export default function GamepadForm(props) {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");

    useEffect(() => {
        if (userGamepad.turnType === "axes") {
            setLeft("axis (" + userGamepad.turnLeft + ")");
            setRight("axis (" + userGamepad.turnLeft + ")");
        } else if (userGamepad.turnType === "button") {
            userGamepad.turnLeft === "null"
                ? setLeft("")
                : setLeft("button (" + userGamepad.turnLeft + ")");

            userGamepad.turnRight === "null"
                ? setRight("")
                : setRight("button (" + userGamepad.turnRight + ")");
        }
    }, [left, right]);

    useEffect(() => {
        var gamepad = navigator.getGamepads()[0];
        if (gamepad && gamepad.connected) {
            var interval = setInterval(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (
                        // gamepad.buttons[i] === 1
                        // gamepad.buttons[i].value > 0
                        gamepad.buttons[i].pressed === true // works for firefox
                    ) {
                        console.log("button pressed: " + i);
                        if (userGamepad.turnType === "axes") {
                            setRight("");
                            userGamepad.turnRight = "null";
                        }
                        userGamepad.turnType = "button";
                        userGamepad.turnLeft = i;
                        setLeft("button (" + userGamepad.turnLeft + ")");
                    }
                }
                for (var k = 0; k < gamepad.axes.length; k++) {
                    if (
                        Math.abs(gamepad.axes[k]) > 0.9 &&
                        Math.abs(gamepad.axes[k]) <= 1
                    ) {
                        console.log(
                            "joystick pressed: " +
                                k +
                                "  value: " +
                                gamepad.axes[k]
                        );
                        userGamepad.turnType = "axes";
                        userGamepad.turnLeft = k;
                        setLeft("axis (" + userGamepad.turnLeft + ")");
                        setRight("axis (" + userGamepad.turnLeft + ")");
                    }
                }
            }, 100);
        }
        return () => clearInterval(interval);
    }, []);

    function save() {
        userGamepad.saveGamepad();
        props.dispatch({ type: "menu" });
    }
    return (
        <>
            <h1>
                <em className="no-select text-shadow">ProtoPla.net</em>
            </h1>
            {props.state.gamepadConnected ? (
                <form className="gamepad-wrapper">
                    <div className="text-shadow gamepad-title">Gamepad</div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="left">
                            Left:{" "}
                        </label>
                        <input
                            className="gamepad-input"
                            tabIndex="-1"
                            type="text"
                            name="left"
                            id="left"
                            value={left}
                            readOnly
                        ></input>
                        <button
                            id="left-gamepad-button"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>

                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="right">
                            Right:{" "}
                        </label>
                        <input
                            className="gamepad-input"
                            tabIndex="-1"
                            type="text"
                            name="right"
                            id="right"
                            value={right}
                            readOnly
                        ></input>
                        <button
                            id="right-gamepad-button"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                </form>
            ) : (
                <div className="no-select text-shadow no-gamepad-detected">
                    To use a gamepad connect it and press any button.
                </div>
            )}
            <button
                className="bottom-button back-button"
                onClick={() => props.dispatch({ type: "menu" })}
            >
                Back
            </button>
            {props.state.gamepadConnected && (
                <button
                    id="save-gamepad-button"
                    className="bottom-button save-button"
                    onClick={() => {
                        save();
                    }}
                >
                    Save
                </button>
            )}
        </>
    );
}
