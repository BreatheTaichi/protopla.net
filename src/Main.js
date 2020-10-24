import React, { useReducer, useEffect } from "react";
import Menu from "./Menu.js";
import Engine from "./game/Engine.js";
import jupiter from "./game/Levels/jupiter.js";
import mars from "./game/Levels/mars.js";
import earth from "./game/Levels/earth.js";
import sun from "./game/Levels/sun.js";
import mercury from "./game/Levels/mercury.js";
import venus from "./game/Levels/venus.js";
import saturn from "./game/Levels/saturn.js";
import uranus from "./game/Levels/uranus.js";
import neptune from "./game/Levels/neptune.js";
import Arena from "./game/Arena.js";
import Loading from "./Loading.js";
import Store from "./options/Store.js";
import OptionsMenu from "./options/OptionsMenu.js";
import StartMenu from "./StartMenu.js";

const initialState = {
    player: {},
    page: "startMenu",
    numberToLoad: 0,
    gamepadConnected: false,
    showGamepadToast: false,
    currentOptionsMenu: "HowTo",
};
var arena;
function reducer(state, action) {
    switch (action.type) {
        case "menu":
            return { ...state, page: "menu" };
        case "gameStart":
            return { ...state, page: "engine" };
        case "startGame":
            // TODO make player object and add here
            return { ...state, page: "menu", player: action.value };
        case "optionsMenu":
            return {
                ...state,
                currentOptionsMenu: action.value,
                page: "optionsMenu",
            };
        case "startMenu":
            return { ...state, page: "startMenu" };
        case "store":
            return { ...state, page: "store" };
        case "gamepadConnected":
            return { ...state, gamepadConnected: true };
        case "gamepadDisconnected":
            return { ...state, gamepadConnected: false };
        case "gamepadToast":
            return { ...state, showGamepadToast: true };
        case "gamepadToastOff":
            return { ...state, showGamepadToast: false };
        case "Sol":
            arena = new Arena(
                "Sol",
                75,
                75,
                -5,
                -40,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            // state.numberToLoad = 3;
            sun(arena, state.numberToLoad);
            return { ...state, page: "loading" };
        case "Mercury":
            arena = new Arena(
                "Mercury",
                75,
                75,
                -75,
                -85,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            mercury(arena);
            return { ...state, page: "loading" };
        case "Venus":
            arena = new Arena(
                "Venus",
                75,
                75,
                -9,
                -85,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            venus(arena);
            return { ...state, page: "loading" };
        case "Earth":
            arena = new Arena(
                "Earth",
                99,
                84,
                -51,
                -25,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            earth(arena);
            return { ...state, page: "loading" };
        case "Mars":
            arena = new Arena(
                "Mars",
                99,
                84,
                -55,
                -226,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            mars(arena);
            return { ...state, page: "loading" };
        case "Jupiter":
            arena = new Arena(
                "Jupiter",
                99,
                84,
                -123,
                -119,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            jupiter(arena);
            return { ...state, page: "loading" };
        case "Saturn":
            arena = new Arena(
                "Saturn",
                99,
                84,
                -125,
                -146,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            saturn(arena);
            return { ...state, page: "loading" };
        case "Uranus":
            arena = new Arena(
                "Uranus",
                75,
                75,
                -75,
                -38,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            // state.numberToLoad = 3;
            uranus(arena);
            return { ...state, page: "loading" };
        case "Neptune":
            arena = new Arena(
                "Neptune",
                99,
                84,
                -72,
                -128,
                40,
                0,
                state.player.name,
                state.player.difficulty
            );
            neptune(arena);
            return { ...state, page: "loading" };
        default:
            throw new Error("Reducer case not found: " + action.type);
    }
}

export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        window.addEventListener("gamepadconnected", function (e) {
            // console.log(
            //     "Gamepad connected at index %d: %s. %d buttons, %d axes.",
            //     e.gamepad.index,
            //     e.gamepad.id,
            //     e.gamepad.buttons.length,
            //     e.gamepad.axes.length
            // );
            // TODO create interval to check for gamepad, up moves to options
            // and the store.  left-right changes levels
            // checkGamepad();
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadConnected" });
        });
        return window.removeEventListener("gamepadconnected", function (e) {
            // checkGamepad();
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadConnected" });
        });
    }, []);
    useEffect(() => {
        window.addEventListener("gamepaddisconnected", function (e) {
            // console.log(
            //     "Gamepad disconnected from index %d: %s",
            //     e.gamepad.index,
            //     e.gamepad.id
            // );
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadDisconnected" });
        });
        return window.removeEventListener("gamepaddisconnected", function (e) {
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadDisconnected" });
        });
    }, []);

    const chooseContent = () => {
        switch (state.page) {
            case "menu":
                document.body.style.overflowX = "hidden";
                document.body.style.overflowY = "visible";
                return <Menu state={state} dispatch={dispatch} />;
            case "startMenu":
                document.body.style.overflow = "visible";
                return <StartMenu state={state} dispatch={dispatch} />;
            case "engine":
                document.body.style.overflow = "hidden";
                return (
                    <Engine state={state} dispatch={dispatch} arena={arena} />
                );
            case "loading":
                document.body.style.overflow = "visible";
                return (
                    <Loading state={state} dispatch={dispatch} arena={arena} />
                );
            case "optionsMenu":
                document.body.style.overflow = "visible";
                return (
                    <OptionsMenu
                        state={state}
                        dispatch={dispatch}
                        arena={arena}
                    />
                );
            case "store":
                document.body.style.overflow = "visible";
                return (
                    <Store state={state} dispatch={dispatch} arena={arena} />
                );
            default:
                return;
        }
    };

    return <>{chooseContent()}</>;
}
