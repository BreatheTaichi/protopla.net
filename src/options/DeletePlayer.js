import React, { useState, useEffect } from "react";
export default function DeletePlayer(props) {
    const [showDelete, setShowDelete] = useState(false);

    var storageArray = [
        "acceleration",
        "accelerationTier",
        "boost",
        "boostTier",
        "bounceFriction",
        "bounceFrictionTier",
        "credits",
        "Earthbestlap",
        "Earthtier",
        "effectsVolume",
        "friction",
        "frictionTier",
        "Jupiterbestlap",
        "Jupitertier",
        "Marsbestlap",
        "Marstier",
        "maxBoost",
        "maxBoostTier",
        "Mercurybestlap",
        "Mercurytier",
        "musicVolume",
        "Neptunebestlap",
        "Neptunetier",
        "rotationSpeed",
        "rotationTier",
        "Saturnbestlap",
        "Saturntier",
        "Solbestlap",
        "Soltier",
        "Uranusbestlap",
        "Uranustier",
        "Venusbestlap",
        "Venustier",
    ];

    function deletePlayer() {
        var name = props.state.player.name;
        var players = JSON.parse(localStorage.getItem("players"));
        var index;
        for (var i = 0; i < players.length; i++) {
            if (players[i].name === name) index = i;
        }
        players.splice(index, 1);
        storageArray.map((obj) => localStorage.removeItem(name + obj));
        localStorage.setItem("players", JSON.stringify(players));
        props.dispatch({ type: "startMenu" });
    }

    useEffect(() => {
        // Depending on state there will be a different number of items
        showDelete
            ? props.setSubmenuNumberOfItems(2)
            : props.setSubmenuNumberOfItems(1);
    });

    return (
        <>
            {!showDelete && (
                <div className="delete-player-wrapper">
                    <p>Do you want to delete current player?</p>
                    <button
                        id="1"
                        className="delete-button"
                        onClick={() => setShowDelete(true)}
                    >
                        Delete
                    </button>
                </div>
            )}
            {showDelete && (
                <div className="delete-player-wrapper">
                    <p>Deletion cannot be undone.</p>
                    <button
                        id="1"
                        className="delete-button"
                        onClick={() => deletePlayer()}
                    >
                        Delete
                    </button>
                    <button
                        id="2"
                        className="delete-button"
                        onClick={() => {
                            props.setCurrentButton("1");
                            setShowDelete(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </>
    );
}
