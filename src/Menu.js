import React, { useEffect, useState } from "react";
import sun from "./game/images/sun/sunIcon.webp";
import mercury from "./game/images/mercury/mercuryIcon.webp";
import venus from "./game/images/venus/venusIcon.webp";
import earth from "./game/images/earth/earthIcon.webp";
import mars from "./game/images/mars/marsIcon.webp";
import jupiter from "./game/images/jupiter/jupiterAuroraIcon.webp";
import saturn from "./game/images/saturn/saturnIcon.webp";
import neptune from "./game/images/neptune/neptuneIcon.webp";
import uranus from "./game/images/uranus/uranusIcon.webp";
import dateFormat from "./game/dateFormat.js";
import medalTimes from "./game/MedalTimes.js";
import useWindowListener from "./hooks/useWindowListener.js";

export default function Menu(props) {
    const [credits] = useState(
        localStorage.getItem(props.state.player.name + "credits")
    );
    const [score] = useState(
        localStorage.getItem(props.state.player.name + "score")
    );

    const [focused, setFocused] = useState("");
    const [lastBodyFocused, setLastBodyFocused] = useState("Sol");
    var coursesRevealed = 0;
    var beginFocused = localStorage.getItem(
        props.state.player.name + "levelFocused"
    );
    var alreadyFocused = false;
    var courses = [
        { name: "Sol", source: sun, class: "sol" },
        { name: "Mercury", source: mercury, class: "mercury" },
        { name: "Venus", source: venus, class: "venus" },
        { name: "Earth", source: earth, class: "earth" },
        { name: "Mars", source: mars, class: "mars" },
        { name: "Jupiter", source: jupiter, class: "jupiter" },
        { name: "Saturn", source: saturn, class: "saturn" },
        { name: "Uranus", source: uranus, class: "uranus" },
        { name: "Neptune", source: neptune, class: "neptune" },
    ];
    var medalIMG = null;
    var medal = medalTimes(
        props.state.player.difficulty,
        props.state.player.name
    );
    const handleMenu = (event) => {
        if (event.key === "ArrowLeft") {
            document.getElementById("quit-id").focus();
        }
        if (event.key === "ArrowRight") {
            document.getElementById("store-id").focus();
        }
        if (event.key === "ArrowUp") {
            document.getElementById(lastBodyFocused).focus();
        }
        if (event.key === "ArrowDown") {
            document.getElementById(lastBodyFocused).focus();
        }
    };

    const handleStore = (event) => {
        if (event.key === "ArrowLeft") {
            document.getElementById("menu-id").focus();
        }
        if (event.key === "ArrowRight") {
            document.getElementById("quit-id").focus();
        }
        if (event.key === "ArrowUp") {
            document.getElementById(lastBodyFocused).focus();
        }
        if (event.key === "ArrowDown") {
            document.getElementById(lastBodyFocused).focus();
        }
    };

    const handleQuit = (event) => {
        if (event.key === "ArrowLeft") {
            document.getElementById("store-id").focus();
        }
        if (event.key === "ArrowRight") {
            document.getElementById("menu-id").focus();
        }
        if (event.key === "ArrowUp") {
            document.getElementById(lastBodyFocused).focus();
        }
        if (event.key === "ArrowDown") {
            document.getElementById(lastBodyFocused).focus();
        }
    };
    const handleIconKeyDown = (event, name) => {
        var courseWrapper = document.getElementById("course-wrapper");
        if (event.key === "Enter" || event.key === " ") {
            localStorage.setItem(
                props.state.player.name + "levelFocused",
                focused
            );
            props.dispatch({ type: focused });
        }
        if (event.key === "ArrowRight") {
            courseWrapper.classList.remove("no-transition");
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].name === name) {
                    if (i >= coursesRevealed - 1) {
                        i = 0;
                        document.getElementById(courses[i].name).focus();
                        break;
                    } else {
                        document.getElementById(courses[i + 1].name).focus();
                    }
                }
            }
        }
        if (event.key === "ArrowLeft") {
            courseWrapper.classList.remove("no-transition");
            for (let i = 0; i < courses.length; i++) {
                if (courses[i].name === name) {
                    if (i <= 0) {
                        i = coursesRevealed;
                        courseWrapper.classList.add("no-transition");
                    }
                    document.getElementById(courses[i - 1].name).focus();
                }
            }
        }
        if (event.key === "ArrowUp") {
            document.getElementById("store-id").focus();
        }
        if (event.key === "ArrowDown") {
            document.getElementById("store-id").focus();
        }
    };

    const handleKeyDown = (value, e) => {
        switch (e.code) {
            case "Escape":
                props.dispatch({ type: "startMenu" });
                break;
            default:
                break;
        }
    };
    useWindowListener("keydown", handleKeyDown.bind(this, true));

    // Usually this would be linked to focused state, and not be
    // limited by the , [] but in this case rerendering makes the
    // transition between planets jank
    useEffect(() => {
        document.getElementById(beginFocused).focus();
        // eslint-disable-next-line
    }, []);
    var lastLevelName = "none";

    return (
        <>
            <div className="menu-button-bar">
                <button
                    id="menu-id"
                    className="menu-button"
                    onKeyDown={(e) => handleMenu(e)}
                    onClick={() =>
                        props.dispatch({
                            type: "optionsMenu",
                            value: "HowToPlay",
                        })
                    }
                >
                    Options
                </button>
                <button
                    id="store-id"
                    className="menu-button"
                    onClick={() =>
                        props.dispatch({ type: "optionsMenu", value: "Store" })
                    }
                    onKeyDown={(e) => handleStore(e)}
                >
                    Credits: {credits}
                </button>
                <button
                    id="quit-id"
                    className="menu-button"
                    onKeyDown={(e) => handleQuit(e)}
                    onClick={() => props.dispatch({ type: "startMenu" })}
                >
                    Quit
                </button>
            </div>
            {addCourses()}
            <div className="course-instructions-wrapper">
                <div className="no-select course-instructions">
                    Arrow keys [← ↑ ↓ →] to navigate. Enter or Spacebar to
                    select.
                </div>
            </div>
        </>
    );

    function addCourses() {
        return (
            <div id="course-wrapper" className="game-list-wrapper">
                {props.state.showGamepadToast && (
                    <div className="gamepad-toast">Gamepad Connected</div>
                )}
                <div className="no-select game-list">
                    {courses.map((obj) => {
                        var bestLap;
                        var bestLapKey =
                            props.state.player.name + obj.name + "bestlap";
                        bestLap = localStorage.getItem(bestLapKey);
                        medalIMG = medal.medalIMG(
                            obj.name,
                            bestLap,
                            lastLevelName,
                            props.state.player.difficulty
                        );
                        lastLevelName = obj.name;
                        // move selected icon to the center by starting
                        // with the left border on the right
                        var centerIcon =
                            window.innerWidth / 2 - 117 - 200 * coursesRevealed;
                        if (score >= medalIMG.pointsToUnlock) {
                            coursesRevealed++;
                            return (
                                <div className="icon-wrapper" key={obj.name}>
                                    <button
                                        id={obj.name}
                                        className={"icon " + obj.class}
                                        onFocus={() => {
                                            alreadyFocused = true;
                                            setFocused(obj.name);
                                            setLastBodyFocused(obj.name);
                                            document.getElementById(
                                                "course-wrapper"
                                            ).style.marginLeft =
                                                centerIcon + "px";
                                        }}
                                        onBlur={() => {
                                            setFocused("");
                                            alreadyFocused = false;
                                        }}
                                        onClick={() => {
                                            alreadyFocused
                                                ? props.dispatch({
                                                      type: obj.name,
                                                  })
                                                : document
                                                      .getElementById(obj.name)
                                                      .focus();
                                            alreadyFocused = true;
                                        }}
                                        onKeyDown={(e) =>
                                            handleIconKeyDown(e, obj.name)
                                        }
                                    >
                                        <img src={obj.source} alt={obj.name} />
                                    </button>
                                    {focused === obj.name && (
                                        <>
                                            <div className="icon-text">
                                                {obj.name}
                                            </div>
                                            {bestLap === null ||
                                            bestLap === 0 ? (
                                                <div className="icon-best-lap">
                                                    New!
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="icon-best-lap">
                                                        {medalIMG.img}
                                                        {dateFormat(bestLap)}
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        } else return <div key={obj.name}> </div>;
                    })}
                </div>
            </div>
        );
    }
}
