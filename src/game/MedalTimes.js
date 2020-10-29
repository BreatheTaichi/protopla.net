import React from "react";
import goldMedal from "./images/medals/ruby.webp";
import silverMedal from "./images/medals/amythest.webp";
import bronzeMedal from "./images/medals/emerald.webp";
import goldStar from "./images/medals/goldStar.webp";
import silverStar from "./images/medals/silverStar.webp";
import bronzeStar from "./images/medals/bronzeStar.webp";
import none from "./images/medals/none.webp";

export default function MedalTimes(difficulty, player) {
    var medalTimes = [];
    if (difficulty === "Expert") {
        medalTimes = [
            {
                name: "Sol",
                goldMedal: 10000,
                silverMedal: 12000,
                bronzeMedal: 15000,
                goldStar: 20000,
                silverStar: 30000,
                bronzeStar: 50000,
            },
            {
                name: "Mercury",
                goldMedal: 12500,
                silverMedal: 15000,
                bronzeMedal: 20000,
                goldStar: 30000,
                silverStar: 40000,
                bronzeStar: 55000,
            },
            {
                name: "Venus",
                goldMedal: 22000,
                silverMedal: 25000,
                bronzeMedal: 30000,
                goldStar: 40000,
                silverStar: 60000,
                bronzeStar: 80000,
            },
            {
                name: "Earth",
                goldMedal: 16000,
                silverMedal: 20000,
                bronzeMedal: 28000,
                goldStar: 40000,
                silverStar: 50000,
                bronzeStar: 65000,
            },
            {
                name: "Mars",
                goldMedal: 35000,
                silverMedal: 40000,
                bronzeMedal: 47000,
                goldStar: 75000,
                silverStar: 90000,
                bronzeStar: 125000,
            },
            {
                name: "Jupiter",
                goldMedal: 35000,
                silverMedal: 40000,
                bronzeMedal: 55000,
                goldStar: 70000,
                silverStar: 100000,
                bronzeStar: 145000,
            },
            {
                name: "Saturn",
                goldMedal: 100000,
                silverMedal: 120000,
                bronzeMedal: 160000,
                goldStar: 220000,
                silverStar: 310000,
                bronzeStar: 325000,
            },
            {
                name: "Uranus",
                goldMedal: 15000,
                silverMedal: 18000,
                bronzeMedal: 20000,
                goldStar: 25000,
                silverStar: 35000,
                bronzeStar: 50000,
            },
            {
                name: "Neptune",
                goldMedal: 39000,
                silverMedal: 42000,
                bronzeMedal: 52000,
                goldStar: 62000,
                silverStar: 82000,
                bronzeStar: 110000,
            },
        ];
    } else if (difficulty === "Normal" || difficulty === "Test") {
        medalTimes = [
            {
                name: "Sol",
                goldMedal: 12000,
                silverMedal: 15000,
                bronzeMedal: 20000,
                goldStar: 30000,
                silverStar: 50000,
                bronzeStar: 70000,
            },
            {
                name: "Mercury",
                goldMedal: 15000,
                silverMedal: 20000,
                bronzeMedal: 30000,
                goldStar: 40000,
                silverStar: 550000,
                bronzeStar: 75000,
            },
            {
                name: "Venus",
                goldMedal: 25000,
                silverMedal: 30000,
                bronzeMedal: 40000,
                goldStar: 60000,
                silverStar: 80000,
                bronzeStar: 100000,
            },
            {
                name: "Earth",
                goldMedal: 20000,
                silverMedal: 28000,
                bronzeMedal: 40000,
                goldStar: 50000,
                silverStar: 65000,
                bronzeStar: 75000,
            },
            {
                name: "Mars",
                goldMedal: 40000,
                silverMedal: 47000,
                bronzeMedal: 75000,
                goldStar: 90000,
                silverStar: 125000,
                bronzeStar: 145000,
            },
            {
                name: "Jupiter",
                goldMedal: 40000,
                silverMedal: 55000,
                bronzeMedal: 70000,
                goldStar: 100000,
                silverStar: 145000,
                bronzeStar: 165000,
            },
            {
                name: "Saturn",
                goldMedal: 120000,
                silverMedal: 160000,
                bronzeMedal: 220000,
                goldStar: 310000,
                silverStar: 325000,
                bronzeStar: 375000,
            },
            {
                name: "Uranus",
                goldMedal: 20000,
                silverMedal: 24000,
                bronzeMedal: 28000,
                goldStar: 35000,
                silverStar: 43000,
                bronzeStar: 60000,
            },
            {
                name: "Neptune",
                goldMedal: 42000,
                silverMedal: 52000,
                bronzeMedal: 62000,
                goldStar: 82000,
                silverStar: 110000,
                bronzeStar: 175000,
            },
        ];
    }

    medalTimes.medalIMG = function (name, bestLap, lastName, difficulty) {
        var obj = { img: new Image(), display: true };
        var image = new Image();
        // first time lastName comes through it is set to none so Sol always shows
        // then it's set to Sol for the next check.  Check if it's null, set display
        // to false, check if the user has gotten at least a bronze before displaying
        if (lastName !== "none") {
            var lastBestLap = 0;
            lastBestLap = parseInt(
                localStorage.getItem(player + lastName + "bestlap")
            );
            for (let k = 0; k < this.length; k++) {
                if (lastBestLap === null) {
                    obj.display = false;
                } else if (this[k].name === lastName) {
                    if (lastBestLap <= this[k].bronzeStar) {
                        obj.display = true;
                    } else {
                        obj.display = false;
                    }
                }
                if (difficulty === "Test") obj.display = true;
            }
        }

        for (let i = 0; i < this.length; i++) {
            if (this[i].name === name) {
                if (bestLap <= this[i].goldMedal) {
                    image = goldMedal;
                    break;
                } else if (bestLap <= this[i].silverMedal) {
                    image = silverMedal;
                    break;
                } else if (bestLap <= this[i].bronzeMedal) {
                    image = bronzeMedal;
                    break;
                } else if (bestLap <= this[i].goldStar) {
                    image = goldStar;
                    break;
                } else if (bestLap <= this[i].silverStar) {
                    image = silverStar;
                    break;
                } else if (bestLap <= this[i].bronzeStar) {
                    image = bronzeStar;
                    break;
                } else {
                    image = none;
                    break;
                }
            }
        }
        obj.img = (
            <>
                <img className="medal" src={image} alt="medal" height="20px" />{" "}
            </>
        );

        return obj;
    };

    // preload images
    var bronze = new Image();
    bronze.src = bronzeStar;
    var silver = new Image();
    silver.src = silverStar;
    var gold = new Image();
    gold.src = goldStar;
    var emerald = new Image();
    emerald.src = bronzeMedal;
    var amythest = new Image();
    amythest.src = silverMedal;
    var ruby = new Image();
    ruby.src = goldMedal;
    var empty = new Image();
    empty.src = none;

    medalTimes.getRecordMedal = function (arena, lap) {
        var tier;
        var image = new Image();
        lap = parseInt(lap);

        if (lap <= arena.times.goldMedal) {
            image = ruby;
            arena.tier = 6;
        } else if (lap <= arena.times.silverMedal) {
            image = amythest;
            arena.tier = 5;
        } else if (lap <= arena.times.bronzeMedal) {
            image = emerald;
            arena.tier = 4;
        } else if (lap <= arena.times.goldStar) {
            image = gold;
            arena.tier = 3;
        } else if (lap <= arena.times.silverStar) {
            image = silver;
            arena.tier = 2;
        } else if (lap <= arena.times.bronzeStar) {
            image = bronze;
            arena.tier = 1;
        } else {
            image = empty;
        }

        tier = parseInt(localStorage.getItem(player + arena.mapName + "tier"));
        if (tier < arena.tier) {
            for (var k = arena.tier; k > tier; k--) {
                if (k === 0) arena.credits += 100;
                arena.credits += k * 100;
            }
            localStorage.setItem(player + "credits", arena.credits);
            localStorage.setItem(player + arena.mapName + "tier", arena.tier);
        }

        return image;
    };

    return medalTimes;
}
