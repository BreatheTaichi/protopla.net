import React, { useState } from "react";
import { useEffect } from "react";
import useWindowListener from "./hooks/useWindowListener.js";
import menuSun from "./game/images/icons/menuSun2.webp";
import menuSunJPG from "./game/images/icons/menuSun2.png";
import getPlayer from "./game/getPlayer.js";

export default function StartMenu(props) {
    // Get last used player for focus, or focus first element if none exists
    var lastPlayer =
        localStorage.getItem("lastPlayer") === null
            ? "0"
            : localStorage.getItem("lastPlayer");

    var playerData = JSON.parse(localStorage.getItem("players"));
    // List of all player objects. Contains Name and difficulty
    const [players, setPlayers] = useState(playerData || []);
    // Controlled component for difficulty radio in new player section
    const [difficulty, setDifficulty] = useState("Normal");
    // Controlled component input that creates new player
    const [playerName, setPlayerName] = useState("");
    const [score, setScore] = useState(false);
    // Shows new player screen, or choose player screen
    const [newPlayer, setNewPlayer] = useState(
        players.length === 0 ? true : false
    );
    // Focused item
    const [focused, setFocused] = useState(newPlayer ? "0" : lastPlayer);

    // Make new player and start game
    const createPlayer = (e) => {
        e.preventDefault();
        var duplicate = false;
        var name = document.getElementById("0").value;
        for (var i = 0; i < players.length; i++) {
            if (players[i].name === name) duplicate = true;
        }
        if (!duplicate && playerName !== "") {
            var player = {};

            player.name = name;
            player.difficulty = difficulty;
            player.arrows = true;
            player.thrustTrail = true;
            player.background = true;
            player.effectsVolume = 1;
            player.musicVolume = 1;
            // Set default storage values
            getPlayer(name, difficulty);
            var addPlayer = players.concat({
                name: name,
                difficulty: difficulty,
            });
            setPlayers(addPlayer);
            localStorage.setItem("players", JSON.stringify(addPlayer));
            props.dispatch({
                type: "startGame",
                value: player,
            });
        }
    };

    const regex = /^[0-9a-zA-Z]+$/;
    const handleNameInput = (e) => {
        const value = e.target.value;
        if (value.match(regex) || value === "") {
            setPlayerName(value);
        }
    };

    const handleDifficultyChange = (e, difficulty, id) => {
        e.preventDefault();
        setDifficulty(difficulty);
        setFocused(id);
    };

    var difficultyButtonArray = [
        {
            id: "1",
            difficulty: "Normal",
        },
        {
            id: "2",
            difficulty: "Expert",
        },
        {
            id: "3",
            difficulty: "Test",
        },
    ];

    const handleKeyDown = (e) => {
        var itemToFocus;
        if (e.key === "Enter" && focused === "0") createPlayer(e);
        if (e.key === "Escape") {
            setFocused("0");
            setNewPlayer(() => !newPlayer);
        }

        if (e.key === "ArrowRight" && parseInt(focused) < 4 && newPlayer) {
            setFocused("4");
        } else if (e.key === "ArrowRight" && newPlayer) setFocused("0");

        if (e.key === "ArrowLeft" && parseInt(focused) > 3 && newPlayer) {
            setFocused("0");
        } else if (e.key === "ArrowLeft" && newPlayer) setFocused("4");

        if (e.key === "ArrowUp") {
            // Check if new player menu or choose player menu
            // If start of focus list go to end, otherwise go up one
            if (newPlayer) {
                if (!score && focused === 3) {
                    itemToFocus = 1;
                } else
                    itemToFocus =
                        parseInt(focused) > 0
                            ? (itemToFocus = parseInt(focused) - 1)
                            : (itemToFocus = 5);
            } else {
                itemToFocus =
                    parseInt(focused) > 0
                        ? (itemToFocus = parseInt(focused) - 1)
                        : (itemToFocus = players.length);
            }
            setFocused(itemToFocus);
        }
        if (e.key === "ArrowDown") {
            // Check if new player menu or choose player menu
            // If end of focus list go to start, otherwise go down one
            if (newPlayer) {
                if (!score && focused === 1) {
                    itemToFocus = 3;
                } else
                    itemToFocus =
                        parseInt(focused) < 5
                            ? (itemToFocus = parseInt(focused) + 1)
                            : (itemToFocus = 0);
            } else {
                itemToFocus =
                    parseInt(focused) < players.length
                        ? (itemToFocus = parseInt(focused) + 1)
                        : (itemToFocus = 0);
            }
            setFocused(itemToFocus);
        }
    };
    useWindowListener("keydown", handleKeyDown);

    useEffect(() => {
        document.getElementById(focused).focus();
    });

    useEffect(() => {
        players.forEach((obj) => {
            if (parseInt(localStorage.getItem(obj.name + "score")) >= 18900) {
                setScore(true);
            }
        });
    });

    const ImgWithFallback = ({ src, fallback, type = "image/webp" }) => {
        return (
            <picture>
                <source srcSet={src} type={type} />
                <img src={fallback} alt="sun" />
            </picture>
        );
    };

    const playerList = () => {
        return (
            <ul className="player-menu-choose">
                Select a player to start.
                <span className="player-menu-title-name">Name</span>
                <span className="player-menu-title-difficulty">Difficulty</span>
                {Object.entries(players).length === 0 ? (
                    <div className="player-menu-choose-button" id="players">
                        No player data
                    </div>
                ) : (
                    players.map((obj, index) => {
                        obj.thrustTrail =
                            localStorage.getItem(obj.name + "thrustTrail") ===
                            "true";
                        obj.arrows =
                            localStorage.getItem(obj.name + "arrows") ===
                            "true";
                        obj.background =
                            localStorage.getItem(obj.name + "background") ===
                            "true";
                        obj.musicVolume = localStorage.getItem(
                            obj.name + "musicVolume"
                        );
                        obj.effectsVolume = localStorage.getItem(
                            obj.name + "effectsVolume"
                        );
                        return (
                            <button
                                id={index}
                                className="player-menu-choose-button"
                                key={obj.name}
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem("lastPlayer", index);
                                    props.dispatch({
                                        type: "startGame",
                                        value: obj,
                                    });
                                }}
                                onFocus={() => setFocused(index)}
                            >
                                <span className="player-menu-button-name">
                                    {obj.name}
                                </span>
                                <span className="player-menu-button-difficulty">
                                    {obj.difficulty}
                                </span>
                            </button>
                        );
                    })
                )}
                <button
                    className="create"
                    id={players.length}
                    onClick={(e) => {
                        e.preventDefault();
                        setFocused("0");
                        setNewPlayer(true);
                    }}
                >
                    New Player
                </button>
            </ul>
        );
    };

    const newPlayerForm = () => {
        return (
            <form
                className="player-menu-input"
                onSubmit={(e) => createPlayer(e)}
            >
                <label className="player-menu-choose-title no-select">
                    <em>New Player</em>
                    <input
                        className="player-new-input"
                        id="0"
                        tabIndex="1"
                        maxLength="20"
                        value={playerName}
                        onChange={handleNameInput}
                        onClick={() => {
                            setFocused("0");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                // e.stopPropagation();
                                createPlayer(e);
                            }
                        }}
                    ></input>
                </label>
                {difficultyButtonArray.map((obj) => {
                    if (obj.difficulty !== "Expert" || score) {
                        // Class
                        let selected =
                            difficulty === obj.difficulty
                                ? "selected"
                                : "unselected";
                        return (
                            <button
                                className={selected + " " + obj.difficulty}
                                key={obj.id}
                                id={obj.id}
                                onClick={(e) =>
                                    handleDifficultyChange(
                                        e,
                                        obj.difficulty,
                                        obj.id
                                    )
                                }
                            >
                                {obj.difficulty}
                            </button>
                        );
                    } else return <div key={obj.id}></div>;
                })}
                <input
                    id="4"
                    type="submit"
                    value="Create"
                    tabIndex="2"
                    className="player-menu-button create"
                ></input>
                <button
                    className="player-menu-button cancel"
                    id="5"
                    onClick={(e) => {
                        e.preventDefault();
                        setNewPlayer(false);
                        setDifficulty("Normal");
                        setPlayerName("");
                        setFocused("0");
                    }}
                >
                    Cancel
                </button>
            </form>
        );
    };
    return (
        <>
            <div className="title-grid">
                <h1>
                    <em className="no-select">ProtoPla.net</em>
                </h1>
                <h2 className="no-select">Race through the solar system</h2>
            </div>
            {!newPlayer && playerList()}
            {newPlayer && newPlayerForm()}
            <div className="course-instructions-wrapper">
                <ImgWithFallback
                    src={menuSun}
                    fallback={menuSunJPG}
                    alt="Sun"
                />
            </div>
        </>
    );
}
