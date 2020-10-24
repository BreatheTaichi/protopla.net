import React, { useEffect, useRef } from "react";
import useWindowListener from "../hooks/useWindowListener.js";
import drawHUD from "./drawHUD.js";
import raf from "raf";
import Spinner from "./Spinner.js";
import { Howl } from "howler";
import pauseMP3 from "./audio/pause.mp3";
import endMP3 from "./audio/end.wav";
var end = new Howl({
    src: [endMP3],
});
var pause = new Howl({
    src: [pauseMP3],
});

export default function Engine(props) {
    var arena = props.arena;
    var gameMenu = false;
    // var gamepad = userGamepad();
    var key = {
        left: false,
        right: false,
        up: false,
        down: false,
        escape: false,
        enter: false,
    };

    const canvasRef = useRef();
    const getBlockRef = useRef();
    const animationRef = useRef();

    function handleKeyPush(value, e) {
        switch (e.code) {
            case "ArrowLeft":
                key.left = value;
                break;
            case "ArrowRight":
                key.right = value;
                break;
            case "ArrowUp":
                if (key.up) break;
                key.up = value;
                break;
            case "ArrowDown":
                if (key.down) break;
                key.down = value;
                break;
            case "Enter":
                if (gameMenu) {
                    end.volume(arena.musicVolume);
                    end.play();
                    arena.inGame = false;
                    props.dispatch({ type: "menu" });
                }
                break;
            case "Escape":
                key.escape = value;
                gameMenu = !gameMenu;
                pause.volume(0.5 * arena.effectsVolume);
                pause.play();
                break;
            default:
                break;
        }
    }

    function handleKeyUp(value, e) {
        switch (e.code) {
            case "ArrowLeft":
                key.left = value;
                break;
            case "ArrowRight":
                key.right = value;
                break;
            case "ArrowUp":
                key.up = value;
                break;
            case "ArrowDown":
                key.down = value;
                break;
            default:
                break;
        }
    }

    function handleResize() {
        arena.screenWidth = window.innerWidth;
        arena.screenHeight = window.innerHeight;
        arena.halfSH = window.innerHeight / 2;
        arena.halfSW = window.innerWidth / 2;
        var canvas = document.querySelector("canvas");
        if (canvas.getContext) {
            var context = canvas.getContext("2d");
            context.canvas.width = arena.screenWidth;
            context.canvas.height = arena.screenHeight;
        }
    }

    useWindowListener("keydown", handleKeyPush.bind(this, true));
    useWindowListener("keyup", handleKeyUp.bind(this, false));
    useWindowListener("resize", handleResize.bind(this, false));

    function getBlockPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(
            (event.clientX -
                rect.left -
                arena.x -
                arena.halfSW -
                arena.halfSize) /
                arena.size
        );
        const y = Math.floor(
            (event.clientY -
                rect.top -
                arena.y -
                arena.halfSH -
                arena.halfSize) /
                arena.size
        );
        console.log("{ x: " + (x + 1) + ", y: " + (y + 1) + " },\n");
    }

    function menu() {
        arena.context.beginPath();
        arena.context.lineWidth = 6;
        arena.context.rect(arena.halfSW - 120, arena.halfSH - 60, 320, 200);
        arena.context.fillStyle = "#000";
        arena.context.strokeStyle = "#fff";
        arena.context.strokeWidth = 6;
        arena.context.fill();
        arena.context.stroke();

        arena.context.font = "25px Verdana";
        arena.context.fillStyle = "#fff";
        arena.context.fillText(
            "Press Enter to quit.",
            arena.halfSW - 75,
            arena.halfSH
        );
        arena.context.fillText(
            "Escape to return",
            arena.halfSW - 60,
            arena.halfSH + 55
        );
        arena.context.fillText(
            "to game.",
            arena.halfSW - 15,
            arena.halfSH + 90
        );
        arena.context.stroke();

        arena.context.closePath();
    }

    // Add event listener to console click position
    useEffect(() => {
        const canvas = document.querySelector("canvas");
        getBlockRef.current = canvas.addEventListener("mousedown", function (
            e
        ) {
            getBlockPosition(canvas, e);
        });
        return () => cancelAnimationFrame(getBlockRef.current);
        // eslint-disable-next-line
    }, []);

    // Start the main loop
    useEffect(() => {
        arena.context = canvasRef.current.getContext("2d");
        arena.inGame = true;
        animationRef.current = raf(main);
        return () => {
            raf.cancel(animationRef.current);
        };
        // eslint-disable-next-line
    }, []);

    function main() {
        if (gameMenu) {
            menu();
        } else if (arena.numberToLoad > 0) {
            Spinner(arena);
        } else {
            arena.ship.updateShip(key);
            arena.draw();
            drawHUD(arena);
        }
        if (arena.inGame) raf(main);
    }

    return (
        <>
            <div className="no-select lower-right">ESC for menu</div>
            <canvas
                ref={canvasRef}
                width={arena.screenWidth * arena.screenRatio}
                height={arena.screenHeight * arena.screenRatio}
            />
        </>
    );
}
