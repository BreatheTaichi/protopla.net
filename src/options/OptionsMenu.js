import React, { useState, useEffect } from "react";
import "../sass/options.css";
import GamepadForm from "./GamepadControls.js";
import DeletePlayer from "./DeletePlayer.js";
import GameOptions from "./GameOptions.js";
import Store from "./Store.js";
import HowToPlay from "./HowToPlay.js";
import Credits from "./Credits.js";
import useWindowListener from "../hooks/useWindowListener.js";

export default function OptionsMenu(props) {
    const [menuItem, setMenuItem] = useState(props.state.currentOptionsMenu);
    const [onMenu, setOnMenu] = useState(false);
    const [submenuNumberOfItems, setSubmenuNumberOfItems] = useState();
    const [currentButton, setCurrentButton] = useState("1");

    // Left goes to the menu of items, right goes to submenu
    // submenuNumberOfItems is returned and used to know when to
    // cycle to top or bottom of list.
    const handleKeyDown = (value, e) => {
        switch (e.code) {
            case "ArrowRight":
                if (submenuNumberOfItems > 0) {
                    setCurrentButton("1");
                    setOnMenu(false);
                }
                break;
            case "ArrowLeft":
                document.getElementById("options-menu-how-to").focus();
                setCurrentButton("options-menu-how-to");
                setOnMenu(true);
                break;
            case "ArrowUp":
                if (onMenu) {
                    switch (currentButton) {
                        case "options-menu-how-to":
                            setCurrentButton("options-menu-back");
                            break;
                        case "options-menu-store":
                            setCurrentButton("options-menu-how-to");
                            break;
                        case "options-menu-game-options":
                            setCurrentButton("options-menu-store");
                            break;
                        case "options-menu-delete":
                            setCurrentButton("options-menu-game-options");
                            break;
                        case "options-menu-gamepad":
                            setCurrentButton("options-menu-delete");
                            break;
                        case "options-menu-credits":
                            setCurrentButton("options-menu-gamepad");
                            break;
                        case "options-menu-back":
                            setCurrentButton("options-menu-credits");
                            break;
                        default:
                            break;
                    }
                }
                if (!onMenu) {
                    if (currentButton <= 1) {
                        setCurrentButton(submenuNumberOfItems);
                    } else {
                        setCurrentButton(() => currentButton - 1);
                    }
                }
                break;

            case "ArrowDown":
                if (onMenu) {
                    switch (currentButton) {
                        case "options-menu-how-to":
                            setCurrentButton("options-menu-store");
                            break;
                        case "options-menu-store":
                            setCurrentButton("options-menu-game-options");
                            break;
                        case "options-menu-game-options":
                            setCurrentButton("options-menu-delete");
                            break;
                        case "options-menu-delete":
                            setCurrentButton("options-menu-gamepad");
                            break;
                        case "options-menu-gamepad":
                            setCurrentButton("options-menu-credits");
                            break;
                        case "options-menu-credits":
                            setCurrentButton("options-menu-back");
                            break;
                        case "options-menu-back":
                            setCurrentButton("options-menu-how-to");
                            break;
                        default:
                            break;
                    }
                }
                if (!onMenu) {
                    if (currentButton >= submenuNumberOfItems) {
                        setCurrentButton(1);
                    } else {
                        setCurrentButton(parseInt(currentButton) + 1);
                    }
                }
                break;
            case "Escape":
                props.dispatch({ type: "menu" });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        try {
            document.getElementById(currentButton).focus();
        } catch (e) {
            console.log("Button " + currentButton + " not found.");
        }
    });

    var menuItemArray = [
        {
            id: "options-menu-how-to",
            click: "HowToPlay",
            text: "Instructions",
        },
        {
            id: "options-menu-store",
            click: "Store",
            text: "Store",
        },
        {
            id: "options-menu-game-options",
            click: "GameOptions",
            text: "Game Options",
        },
        {
            id: "options-menu-delete",
            click: "DeletePlayer",
            text: "Delete Player",
        },
        {
            id: "options-menu-gamepad",
            click: "GamepadForm",
            text: "Gamepad",
        },
        {
            id: "options-menu-credits",
            click: "Credits",
            text: "Credits",
        },
    ];

    useWindowListener("keydown", handleKeyDown.bind(this, true));

    const contentSwitch = () => {
        switch (menuItem) {
            case "HowToPlay":
                return (
                    <HowToPlay
                        state={props.state}
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            case "GameOptions":
                return (
                    <GameOptions
                        state={props.state}
                        setOnMenu={setOnMenu}
                        dispatch={props.dispatch}
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            case "DeletePlayer":
                return (
                    <DeletePlayer
                        state={props.state}
                        dispatch={props.dispatch}
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            case "GamepadForm":
                return (
                    <GamepadForm
                        state={props.state}
                        setOnMenu={setOnMenu}
                        dispatch={props.dispatch}
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            case "Store":
                return (
                    <Store
                        state={props.state}
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            case "Credits":
                return (
                    <Credits
                        setCurrentButton={setCurrentButton}
                        setSubmenuNumberOfItems={setSubmenuNumberOfItems}
                    />
                );
            default:
                return;
        }
    };

    return (
        <div className="options-menu-grid">
            <div className="options-menu-button-wrapper">
                {menuItemArray.map((obj) => {
                    return (
                        <button
                            key={obj.click}
                            id={obj.id}
                            className="options-menu-button"
                            onClick={() => {
                                setMenuItem(obj.click);
                                setCurrentButton(obj.id);
                            }}
                        >
                            {obj.text}
                        </button>
                    );
                })}
                <button
                    className="options-menu-button"
                    id="options-menu-back"
                    onClick={() => props.dispatch({ type: "menu" })}
                >
                    Back
                </button>
            </div>
            <div className="options-menu-active-item">{contentSwitch()}</div>
        </div>
    );
}
