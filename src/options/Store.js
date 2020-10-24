import React, { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

export default function Store(props) {
    var player = props.state.player.name;
    const [credits, setCredits] = useLocalStorage(player + "credits", 0);
    const [accelerationTier, setAccelerationTier] = useLocalStorage(
        player + "accelerationTier",
        1
    );
    const [acceleration, setAcceleration] = useLocalStorage(
        player + "acceleration",
        0.06
    );
    const [rotationTier, setRotationTier] = useLocalStorage(
        player + "rotationTier",
        1
    );
    const [rotationSpeed, setRotationSpeed] = useLocalStorage(
        player + "rotationSpeed",
        1
    );
    const [boostTier, setBoostTier] = useLocalStorage(player + "boostTier", 1);
    const [boost, setBoost] = useLocalStorage(player + "boost", 0.01);
    const [maxBoostTier, setMaxBoostTier] = useLocalStorage(
        player + "maxBoostTier",
        1
    );
    const [maxBoost, setMaxBoost] = useLocalStorage(player + "maxBoost", 0.001);
    const [frictionTier, setFrictionTier] = useLocalStorage(
        player + "frictionTier",
        1
    );
    const [friction, setFriction] = useLocalStorage(player + "friction", 0.98);
    const [bounceFrictionTier, setBounceFrictionTier] = useLocalStorage(
        player + "bounceFrictionTier",
        1
    );
    const [bounceFriction, setBounceFriction] = useLocalStorage(
        player + "bounceFriction",
        0.7
    );

    function storeItem(
        number,
        itemTier,
        setItemTier,
        shipAttribute,
        setShipAttribute,
        modifier,
        name
    ) {
        return (
            <>
                <div className="upgrade-name">{name}</div>
                <button
                    id={number}
                    className="store-item-button"
                    onFocus={() => {
                        props.setCurrentButton(number);
                    }}
                    onClick={() => {
                        if (credits >= itemTier * 100) {
                            setItemTier(itemTier + 1);
                            setCredits(credits - itemTier * 100);
                            setShipAttribute(shipAttribute + modifier);
                        }
                    }}
                >
                    {itemTier * 100} credits
                </button>
                <div className="upgrade-level">{itemTier}</div>
            </>
        );
    }

    useEffect(() => {
        props.setSubmenuNumberOfItems(6);
    });

    //TODO add max tier for at least ramjet
    return (
        <div className="store-wrapper">
            <div className="store-credits">Credits: {credits}</div>
            <div className="store-title">Type</div>
            <div className="store-title">Upgrade</div>
            <div className="store-title">Level</div>
            {storeItem(
                1,
                accelerationTier,
                setAccelerationTier,
                acceleration,
                setAcceleration,
                0.005,
                "Thrust"
            )}
            {storeItem(
                2,
                rotationTier,
                setRotationTier,
                rotationSpeed,
                setRotationSpeed,
                0.1,
                "Rotation"
            )}
            {storeItem(
                3,
                boostTier,
                setBoostTier,
                boost,
                setBoost,
                0.01,
                "Fuel Balancer"
            )}
            {storeItem(
                4,
                maxBoostTier,
                setMaxBoostTier,
                maxBoost,
                setMaxBoost,
                0.01,
                "Alignment Matrix"
            )}
            {storeItem(
                5,
                frictionTier,
                setFrictionTier,
                friction,
                setFriction,
                0.001,
                "Bussard Ramfield"
            )}
            {storeItem(
                6,
                bounceFrictionTier,
                setBounceFrictionTier,
                bounceFriction,
                setBounceFriction,
                0.03,
                "Ship Plating"
            )}
        </div>
    );
}
