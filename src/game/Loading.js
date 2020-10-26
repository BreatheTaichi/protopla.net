import React, { useEffect } from "react";
import useWindowListener from "../hooks/useWindowListener.js";

export default function Loading(props) {
    var currentButton;
    useEffect(() => {
        document.getElementById("continue").focus();
    });

    const handleKeyDown = (value, e) => {
        switch (e.code) {
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                if (currentButton === "back") {
                    document.getElementById("continue").focus();
                } else {
                    document.getElementById("back").focus();
                }
                break;
            case "Escape":
                props.dispatch({ type: "menu" });
                break;
            default:
                break;
        }
    };
    useWindowListener("keydown", handleKeyDown.bind(this, true));
    return (
        <div className="loading-wrapper">
            <div className="loading-text">
                {props.arena.loadingMessage.map((obj, index) => (
                    <p key={index}>{obj}</p>
                ))}
                {props.arena.links.map((obj, index) => (
                    <p key={index}>
                        {obj.text}
                        <a
                            href={obj.link}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {obj.link}
                        </a>
                    </p>
                ))}
            </div>
            <button
                className="bottom-button back-button"
                onClick={() => props.dispatch({ type: "menu" })}
                onFocus={() => (currentButton = "back")}
                id="back"
            >
                Back
            </button>
            <button
                className=" bottom-button continue-button"
                id="continue"
                onClick={() => props.dispatch({ type: "gameStart" })}
            >
                Continue
            </button>
            <img
                className="loading-image"
                src={props.arena.loadingImage}
                alt="Course Map"
            />
        </div>
    );
}
