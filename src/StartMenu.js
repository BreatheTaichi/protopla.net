import React, { useState } from "react";
import { useEffect } from "react";
import useWindowListener from "./hooks/useWindowListener.js";
import menuSun from "./game/images/icons/menuSun2.webp";
import menuSunJPG from "./game/images/icons/menuSun2.png";

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
    // Shows new player screen, or choose player screen
    const [newPlayer, setNewPlayer] = useState(
        players.length === 0 ? true : false
    );
    // Focused item.  Shows
    const [focused, setFocused] = useState(newPlayer ? "0" : lastPlayer);

    const regex = /^[0-9a-zA-Z]+$/;
    const handleNameInput = (e) => {
        const value = e.target.value;
        if (value.match(regex) || value === "") {
            setPlayerName(value);
        }
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
        console.log(difficulty);
    };

    const handleKeyDown = (event) => {
        var itemToFocus;
        if (event.key === "Escape") {
            setFocused("0");
            setNewPlayer(() => !newPlayer);
        }

        if (event.key === "ArrowRight" && parseInt(focused) < 4 && newPlayer) {
            setFocused("4");
        } else if (event.key === "ArrowRight" && newPlayer) setFocused("0");

        if (event.key === "ArrowLeft" && parseInt(focused) > 3 && newPlayer) {
            setFocused("0");
        } else if (event.key === "ArrowLeft" && newPlayer) setFocused("4");

        if (event.key === "ArrowUp") {
            // Check if new player menu or choose player menu
            // If start of focus list go to end, otherwise go up one
            if (newPlayer) {
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
        if (event.key === "ArrowDown") {
            // Check if new player menu or choose player menu
            // If end of focus list go to start, otherwise go down one
            if (newPlayer) {
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

    const ImgWithFallback = ({
        src,
        fallback,
        type = "image/webp",
        ...delegated
    }) => {
        return (
            <picture>
                <source srcSet={src} type={type} />
                <img src={fallback} {...delegated} alt="sun" />
            </picture>
        );
    };

    const playerList = () => {
        return (
            <ul className="player-menu-choose">
                <span className="player-menu-title-name">Name</span>
                <span className="player-menu-title-difficulty">Difficulty</span>
                {Object.entries(players).length === 0 ? (
                    <div className="player-menu-choose-button" id="players">
                        No player data
                    </div>
                ) : (
                    players.map((obj, index) => {
                        return (
                            <button
                                id={index}
                                className="player-menu-choose-button"
                                key={obj.name}
                                onClick={() => {
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
                    className="player-menu-create-new-player-button"
                    id={players.length}
                    onClick={() => {
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
            <form className="player-menu-input">
                <div className="player-menu-choose-title no-select">
                    <em>Create New Player</em>
                </div>
                <input
                    onChange={handleNameInput}
                    className="player-new-input"
                    id="0"
                    maxLength="20"
                    value={playerName}
                ></input>
                <button
                    className="player-menu-button"
                    id="4"
                    onClick={(e) => {
                        e.preventDefault();
                        var duplicate = false;
                        var name = document.getElementById("0").value;
                        for (var i = 0; i < players.length; i++) {
                            if (players[i].name === name) duplicate = true;
                        }
                        if (!duplicate && playerName !== "") {
                            var addPlayer = players.concat({
                                name: name,
                                difficulty: difficulty,
                            });
                            setPlayers(addPlayer);
                            localStorage.setItem(
                                "players",
                                JSON.stringify(addPlayer)
                            );
                            setDifficulty("Normal");
                            setPlayerName("");
                            setNewPlayer(false);
                            setFocused(players.length);
                        }
                    }}
                >
                    Create
                </button>
                <div className="player-menu-radio-group">
                    <div className="player-menu-radio">
                        <label>
                            <input
                                id="1"
                                type="radio"
                                checked={difficulty === "Normal"}
                                onClick={() => setDifficulty("Normal")}
                                value="Normal"
                                onChange={handleDifficultyChange}
                            />
                            Normal
                        </label>
                    </div>
                    <div className="player-menu-radio">
                        <label>
                            <input
                                id="2"
                                type="radio"
                                checked={difficulty === "Expert"}
                                onClick={() => setDifficulty("Expert")}
                                value="Expert"
                                onChange={handleDifficultyChange}
                            />
                            Expert
                        </label>
                    </div>
                    <div className="player-menu-radio">
                        <label>
                            <input
                                id="3"
                                type="radio"
                                checked={difficulty === "Test"}
                                onClick={() => setDifficulty("Test")}
                                value="Test"
                                onChange={handleDifficultyChange}
                            />
                            Test
                        </label>
                    </div>
                </div>
                <button
                    className="player-menu-create-new-player-cancel-button"
                    id="5"
                    onClick={() => {
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
