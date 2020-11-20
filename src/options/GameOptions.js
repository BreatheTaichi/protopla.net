import React, { useState, useEffect } from "react";
import "../sass/switch.css";

export default function GameOptions(props) {
    const [effectsVolume, setEffectsVolume] = useState(
        props.state.player.effectsVolume * 100
    );
    const [musicVolume, setMusicVolume] = useState(
        props.state.player.musicVolume * 100
    );
    const [thrustTrail, setThrustTrail] = useState(
        props.state.player.thrustTrail
    );
    const [arrows, setArrows] = useState(props.state.player.arrows);
    const [background, setBackground] = useState(props.state.player.background);

    // User can input number between 0 and 100, 0 on ""
    const regex = /^[0-9]+$/;
    const handleNumberInput = (e, set) => {
        const value = e.target.value;
        if (value.match(regex)) {
            if (value > 100) {
                set(100);
            } else {
                set(parseInt(value));
            }
        } else if (value === "") {
            set(0);
        }
    };

    function save() {
        localStorage.setItem(
            props.state.player.name + "effectsVolume",
            effectsVolume / 100
        );
        localStorage.setItem(
            props.state.player.name + "musicVolume",
            musicVolume / 100
        );
        var boolString = background ? "true" : "false";
        localStorage.setItem(
            props.state.player.name + "background",
            boolString
        );
        boolString = thrustTrail ? "true" : "false";
        localStorage.setItem(
            props.state.player.name + "thrustTrail",
            boolString
        );
        boolString = arrows ? "true" : "false";
        localStorage.setItem(props.state.player.name + "arrows", boolString);
        var obj = {
            name: props.state.player.name,
            difficulty: props.state.player.difficulty,
            background: background,
            thrustTrail: thrustTrail,
            arrows: arrows,
            musicVolume: musicVolume / 100,
            effectsVolume: effectsVolume / 100,
        };
        props.dispatch({
            type: "saveOptions",
            value: obj,
        });
        props.setOnMenu(true);
        props.setCurrentButton("options-menu-back");
    }

    // Set number of items for parent to control focus
    useEffect(() => {
        props.setSubmenuNumberOfItems(6);
    });

    const handleChange = (item, set) => {
        set(!item);
    };

    const switchComp = (text, sw, item, set) => {
        return (
            <>
                <span className="switch-text">{text}</span>
                <label className="switch" htmlFor={sw}>
                    <input
                        id={sw}
                        name={sw}
                        type="checkbox"
                        checked={item}
                        onChange={() => handleChange(item, set)}
                    />
                    <span className="slider"></span>
                </label>
            </>
        );
    };

    return (
        <>
            <form className="sound-wrapper">
                <div className="no-select sound-title">Volume</div>
                <label className="sound-item">
                    <span className="no-select title">Effects</span>
                    <input
                        className="range-volume"
                        type="range"
                        min="0"
                        max="100"
                        autoComplete="off"
                        value={effectsVolume}
                        onChange={(e) => handleNumberInput(e, setEffectsVolume)}
                    />
                    <input
                        id="1"
                        type="text"
                        min="0"
                        max="100"
                        autoComplete="off"
                        value={effectsVolume}
                        onChange={(e) => handleNumberInput(e, setEffectsVolume)}
                    />
                    <span>%</span>
                </label>
                <label className="sound-item">
                    <span className="no-select title">Music</span>
                    <input
                        className="range-volume"
                        type="range"
                        min="0"
                        max="100"
                        autoComplete="off"
                        value={musicVolume}
                        onChange={(e) => handleNumberInput(e, setMusicVolume)}
                    />
                    <input
                        id="2"
                        type="text"
                        min="0"
                        max="100"
                        autoComplete="off"
                        value={musicVolume}
                        onChange={(e) => handleNumberInput(e, setMusicVolume)}
                    />
                    <span>%</span>
                </label>
                <div className="no-select sound-title">Performance</div>
                {switchComp(
                    "Course helper arrows",
                    3,
                    arrows,
                    setArrows,
                    "arrows"
                )}
                {switchComp(
                    "Ship thrust trail",
                    4,
                    thrustTrail,
                    setThrustTrail,
                    "thrustTrail"
                )}
                {switchComp(
                    "Background images",
                    5,
                    background,
                    setBackground,
                    "background"
                )}
            </form>
            <button
                id="6"
                className="bottom-button save-button"
                onClick={() => save()}
            >
                Save
            </button>
        </>
    );
}
