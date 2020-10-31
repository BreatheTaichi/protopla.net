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

    function save() {
        localStorage.setItem(
            props.state.player.name + "effectsVolume",
            effectsVolume / 100
        );
        localStorage.setItem(
            props.state.player.name + "musicVolume",
            musicVolume / 100
        );
        props.setOnMenu(true);
        props.setCurrentButton("options-menu-back");
    }

    useEffect(() => {
        props.setSubmenuNumberOfItems(3);
    });

    return (
        <>
            <form className="sound-wrapper">
                <div className="no-select  sound-title">Volume</div>
                <label className="sound-item">
                    <span className="no-select title">Effects</span>
                    <input
                        id="1"
                        type="text"
                        min="0"
                        max="100"
                        autoComplete="off"
                        name="effectsVolume"
                        value={effectsVolume}
                        onChange={(e) => handleNumberInput(e, setEffectsVolume)}
                    />
                    <span>%</span>
                </label>
                <label className="sound-item">
                    <span className="no-select title">Music</span>
                    <input
                        id="2"
                        type="text"
                        min="0"
                        max="100"
                        autoComplete="off"
                        name="musicVolume"
                        value={musicVolume}
                        onChange={(e) => handleNumberInput(e, setMusicVolume)}
                    />
                    <span>%</span>
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
