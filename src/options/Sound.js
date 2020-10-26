import React, { useState, useEffect } from "react";
export default function Sound(props) {
    const [effectsVolume, setEffectsVolume] = useState(100);
    const [musicVolume, setMusicVolume] = useState(100);
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

    useEffect(() => {
        if (
            localStorage.getItem(props.state.player.name + "effectsVolume") !==
            null
        ) {
            setEffectsVolume(
                Math.round(
                    localStorage.getItem(
                        props.state.player.name + "effectsVolume"
                    ) * 100
                )
            );
        }
        if (
            localStorage.getItem(props.state.player.name + "musicVolume") !==
            null
        ) {
            setMusicVolume(
                Math.round(
                    localStorage.getItem(
                        props.state.player.name + "musicVolume"
                    ) * 100
                )
            );
        }
    }, [props.state.player.name]);
    // const handleKeyDown = (value, e) => {
    //     switch (e.code) {
    //         case "ArrowLeft":
    //             if (currentFocus === "effectsVolume") {
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // };
    // useWindowListener("keydown", handleKeyDown.bind(this, true));

    function save() {
        localStorage.setItem(
            props.state.player.name + "effectsVolume",
            effectsVolume / 100
        );
        localStorage.setItem(
            props.state.player.name + "musicVolume",
            musicVolume / 100
        );
        props.dispatch({ type: "menu" });
    }

    useEffect(() => {
        props.setSubmenuNumberOfItems(3);
    });

    return (
        <>
            <form className="sound-wrapper">
                <div className="no-select  sound-title">Volume</div>
                <label className="sound-item">
                    <span className="no-select ">Effects</span>
                    <input
                        id="1"
                        type="text"
                        min="0"
                        max="100"
                        name="effectsVolume"
                        value={effectsVolume}
                        onChange={(e) => handleNumberInput(e, setEffectsVolume)}
                    />
                    <span className="no-select volume-percent">
                        {effectsVolume}%
                    </span>
                </label>
                <label className="sound-item">
                    <span className="no-select ">Music</span>
                    <input
                        id="2"
                        type="text"
                        min="0"
                        max="100"
                        name="musicVolume"
                        value={musicVolume + ""}
                        onChange={(e) => handleNumberInput(e, setMusicVolume)}
                    />
                    <span className="no-select volume-percent">
                        {musicVolume}%
                    </span>
                </label>
            </form>
            <button
                id="3"
                className="bottom-button save-button"
                onClick={() => save()}
            >
                Save
            </button>
        </>
    );
}
