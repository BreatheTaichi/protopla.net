import React, { useState, useEffect } from "react";
import gamepad from "../game/Gamepad.js";
import arrow from "../game/images/icons/whiteArrowLeft.png";

var userGamepad = gamepad();
export default function GamepadForm(props) {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");
    const [forward, setForward] = useState("");
    const [reverse, setReverse] = useState("");
    const [start, setStart] = useState("");
    const [select, setSelect] = useState("");
    var gamepad = navigator.getGamepads()[0];
    var timeouts = [];

    useEffect(() => {
        props.state.gamepadConnected
            ? props.setSubmenuNumberOfItems(7)
            : props.setSubmenuNumberOfItems(0);
    });
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
        if (userGamepad.thrustType === "axes") {
            setForward("axis (" + userGamepad.forward + ")");
            setReverse("axis (" + userGamepad.reverse + ")");
        } else if (userGamepad.thrustType === "button") {
            userGamepad.forward === null
                ? setForward("")
                : setForward("button (" + userGamepad.forward + ")");

            userGamepad.reverse === null
                ? setReverse("")
                : setReverse("button (" + userGamepad.reverse + ")");
        }
        setStart("button (" + userGamepad.start + ")");
        setSelect("button (" + userGamepad.select + ")");
    }, []);

    useEffect(() => {
        if (props.state.gamepadConnected) {
            document.getElementById("1").focus();
        }
    }, [props.state.gamepadConnected]);

    function save() {
        userGamepad.saveGamepad();
        cancelTimeouts();
        props.dispatch({ type: "menu" });
    }

    function cancelTimeouts() {
        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
            console.log("clearing timeout: " + i);
        }
    }

    // Variable to stop setTimeout after a gamepad button press is recorded.
    var keepLooking;
    // Go through gamepad buttons every 100ms and check to see if a button is
    // pressed.  If so record it and the type in the userGamepad object.
    function checkLeftButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting left turn...";
            document.getElementById("1").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        if (userGamepad.turnType === "axes") {
                            setRight("");
                            userGamepad.turnRight = "null";
                        }
                        userGamepad.turnType = "button";
                        userGamepad.turnLeft = i;
                        setLeft("button (" + userGamepad.turnLeft + ")");
                        keepLooking = false;
                    }
                }
                for (var k = 0; k < gamepad.axes.length; k++) {
                    if (
                        Math.abs(gamepad.axes[k]) > 0.9 &&
                        Math.abs(gamepad.axes[k]) <= 1
                    ) {
                        userGamepad.turnType = "axes";
                        userGamepad.turnLeft = k;
                        setLeft("axis (" + userGamepad.turnLeft + ")");
                        setRight("axis (" + userGamepad.turnLeft + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkLeftButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Left turn set.";
                        document.getElementById("2").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getLeftButton(e) {
        e.preventDefault();
        checkLeftButton();
    }

    function checkRightButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting right turn...";
            document.getElementById("2").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        if (userGamepad.turnType === "axes") {
                            setLeft("");
                            userGamepad.turnLeft = "null";
                        }
                        userGamepad.turnType = "button";
                        userGamepad.turnRight = i;
                        setRight("button (" + userGamepad.turnRight + ")");
                        keepLooking = false;
                    }
                }
                for (var k = 0; k < gamepad.axes.length; k++) {
                    if (
                        Math.abs(gamepad.axes[k]) > 0.9 &&
                        Math.abs(gamepad.axes[k]) <= 1
                    ) {
                        userGamepad.turnType = "axes";
                        userGamepad.turnLeft = k;
                        setLeft("axis (" + userGamepad.turnLeft + ")");
                        setRight("axis (" + userGamepad.turnLeft + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkRightButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Right turn set.";
                        document.getElementById("3").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getRightButton(e) {
        e.preventDefault();
        checkRightButton();
    }

    function checkForwardButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting forward...";
            document.getElementById("3").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        if (userGamepad.thrustType === "axes") {
                            setReverse("");
                            userGamepad.reverse = "null";
                        }
                        // if (userGamepad.reverse === "null") setReverse("");
                        userGamepad.thrustType = "button";
                        userGamepad.forward = i;
                        setForward("button (" + userGamepad.forward + ")");
                        keepLooking = false;
                    }
                }
                for (var k = 0; k < gamepad.axes.length; k++) {
                    if (
                        Math.abs(gamepad.axes[k]) > 0.9 &&
                        Math.abs(gamepad.axes[k]) <= 1
                    ) {
                        userGamepad.thrustType = "axes";
                        userGamepad.forward = k;
                        setForward("axis (" + userGamepad.forward + ")");
                        setReverse("axis (" + userGamepad.forward + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkForwardButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Forward set.";
                        document.getElementById("4").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getForwardButton(e) {
        e.preventDefault();
        checkForwardButton();
    }

    function checkReverseButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting reverse...";
            document.getElementById("4").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        if (userGamepad.thrustType === "axes") {
                            setForward("");
                            userGamepad.forward = "null";
                        }
                        userGamepad.thrustType = "button";
                        userGamepad.reverse = i;
                        setReverse("button (" + userGamepad.reverse + ")");
                        keepLooking = false;
                    }
                }
                for (var k = 0; k < gamepad.axes.length; k++) {
                    if (
                        Math.abs(gamepad.axes[k]) > 0.9 &&
                        Math.abs(gamepad.axes[k]) <= 1
                    ) {
                        userGamepad.thrustType = "axes";
                        userGamepad.reverse = k;
                        setForward("axis (" + userGamepad.reverse + ")");
                        setReverse("axis (" + userGamepad.reverse + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkReverseButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Reverse set.";
                        document.getElementById("5").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getReverseButton(e) {
        e.preventDefault();
        checkReverseButton();
    }

    function checkStartButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting start...";
            document.getElementById("5").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        userGamepad.start = i;
                        setStart("button (" + userGamepad.start + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkStartButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Start set.";
                        document.getElementById("6").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getStartButton(e) {
        e.preventDefault();
        checkStartButton();
    }

    function checkSelectButton() {
        try {
            document.getElementById("gamepad-message").innerHTML =
                "Setting select...";
            document.getElementById("6").focus();
        } catch (e) {}
        cancelTimeouts();
        timeouts.push(
            setTimeout(() => {
                for (var i = 0; i < gamepad.buttons.length; i++) {
                    if (gamepad.buttons[i].pressed) {
                        userGamepad.select = i;
                        setSelect("button (" + userGamepad.select + ")");
                        keepLooking = false;
                    }
                }
                if (keepLooking) {
                    checkSelectButton();
                } else {
                    try {
                        document.getElementById("gamepad-message").innerHTML =
                            "Select set.";
                        document.getElementById("save-gamepad-button").focus();
                    } catch (e) {}
                }
            }, 100)
        );
    }
    function getSelectButton(e) {
        e.preventDefault();
        checkSelectButton();
    }

    return (
        <>
            {props.state.gamepadConnected ? (
                <form className="gamepad-wrapper">
                    <div className="text-shadow gamepad-title">Gamepad</div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="left">
                            Left:{" "}
                        </label>
                        <input
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="left"
                            id="left"
                            value={left}
                            readOnly
                        ></input>
                        <button
                            id="1"
                            onClick={(e) => {
                                keepLooking = true;
                                getLeftButton(e);
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
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="right"
                            id="right"
                            value={right}
                            readOnly
                        ></input>
                        <button
                            id="2"
                            onClick={(e) => {
                                keepLooking = true;
                                getRightButton(e);
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="forward">
                            Forward:{" "}
                        </label>
                        <input
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="forward"
                            id="forward"
                            value={forward}
                            readOnly
                        ></input>
                        <button
                            id="3"
                            onClick={(e) => {
                                keepLooking = true;
                                getForwardButton(e);
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="reverse">
                            Reverse:{" "}
                        </label>
                        <input
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="reverse"
                            id="reverse"
                            value={reverse}
                            readOnly
                        ></input>
                        <button
                            id="4"
                            onClick={(e) => {
                                keepLooking = true;
                                getReverseButton(e);
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="start">
                            Start:{" "}
                        </label>
                        <input
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="start"
                            id="start"
                            value={start}
                            readOnly
                        ></input>
                        <button
                            id="5"
                            onClick={(e) => {
                                keepLooking = true;
                                getStartButton(e);
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div className="gamepad-button">
                        <label className="text-shadow" htmlFor="select">
                            Select:{" "}
                        </label>
                        <input
                            tabIndex="-1"
                            className="gamepad-input"
                            type="text"
                            name="select"
                            id="select"
                            value={select}
                            readOnly
                        ></input>
                        <button
                            id="6"
                            onClick={(e) => {
                                keepLooking = true;
                                getSelectButton(e);
                            }}
                        >
                            <img src={arrow} alt="arrow" />
                        </button>
                    </div>
                    <div
                        className="text-shadow gamepad-instruction"
                        id="gamepad-message"
                    >
                        Click an arrow to change a button.
                    </div>
                </form>
            ) : (
                <div className="no-select text-shadow no-gamepad-detected">
                    To use a gamepad connect it and press any button.
                </div>
            )}
            {props.state.gamepadConnected && (
                <button
                    id="7"
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
