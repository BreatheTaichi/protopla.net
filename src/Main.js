import React, { useReducer, useEffect } from "react";
// import useWindowListener from "./hooks/useWindowListener.js";
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
import Loading from "./game/Loading.js";
import Store from "./options/Store.js";
import OptionsMenu from "./options/OptionsMenu.js";
import StartMenu from "./StartMenu.js";

var arena;

const initialState = {
    player: {},
    page: "startMenu",
    numberToLoad: 0,
    gamepadConnected: false,
    showGamepadToast: false,
    currentOptionsMenu: "HowTo",
};
function reducer(state, action) {
    switch (action.type) {
        case "menu":
            return { ...state, page: "menu" };
        case "gameStart":
            return { ...state, page: "engine" };
        case "startGame":
            return { ...state, page: "menu", player: action.value };
        case "saveOptions":
            return { ...state, player: action.value };
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
            arena = new Arena("Sol", 0, 0, -5, -40, 40, 0, state.player);
            sun(arena, state.numberToLoad);
            return { ...state, page: "loading" };
        case "Mercury":
            arena = new Arena("Mercury", 0, 15, -75, -85, 40, 0, state.player);
            mercury(arena);
            return { ...state, page: "loading" };
        case "Venus":
            arena = new Arena("Venus", 0, 0, -9, -85, 40, 0, state.player);
            venus(arena);
            return { ...state, page: "loading" };
        case "Earth":
            arena = new Arena("Earth", 0, 0, -51, -25, 40, 0, state.player);
            earth(arena);
            return { ...state, page: "loading" };
        case "Mars":
            arena = new Arena("Mars", 0, 75, -55, -226, 40, 0, state.player);
            mars(arena);
            return { ...state, page: "loading" };
        case "Jupiter":
            arena = new Arena(
                "Jupiter",
                -18,
                0,
                -123,
                -120,
                40,
                0,
                state.player
            );
            jupiter(arena);
            return { ...state, page: "loading" };
        case "Saturn":
            arena = new Arena(
                "Saturn",
                32,
                63,
                -125,
                -146,
                40,
                0,
                state.player
            );
            saturn(arena);
            return { ...state, page: "loading" };
        case "Uranus":
            arena = new Arena("Uranus", 20, 0, -75, -38, 40, 0, state.player);
            uranus(arena);
            return { ...state, page: "loading" };
        case "Neptune":
            arena = new Arena("Neptune", 10, 0, -72, -129, 40, 0, state.player);
            neptune(arena);
            return { ...state, page: "loading" };
        default:
            throw new Error("Reducer case not found: " + action.type);
    }
}

export default function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const gpConnected = () =>
        window.addEventListener("gamepadconnected", function (e) {
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadConnected" });
        });

    useEffect(() => {
        gpConnected();
        return gpConnected();
    }, []);

    const gpDisconnected = () =>
        window.addEventListener("gamepaddisconnected", function (e) {
            dispatch({ type: "gamepadToast" });
            setInterval(() => {
                dispatch({ type: "gamepadToastOff" });
            }, 3400);
            dispatch({ type: "gamepadDisconnected" });
        });

    useEffect(() => {
        gpDisconnected();
        return gpDisconnected();
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
