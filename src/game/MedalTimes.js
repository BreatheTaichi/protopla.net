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
                pointsToUnlock: 0,
                goldMedal: 10000,
                silverMedal: 12000,
                bronzeMedal: 15000,
                goldStar: 20000,
                silverStar: 30000,
                bronzeStar: 50000,
            },
            {
                name: "Mercury",
                pointsToUnlock: 100,
                goldMedal: 12500,
                silverMedal: 15000,
                bronzeMedal: 20000,
                goldStar: 30000,
                silverStar: 36000,
                bronzeStar: 55000,
            },
            {
                name: "Venus",
                pointsToUnlock: 200,
                goldMedal: 22000,
                silverMedal: 25000,
                bronzeMedal: 30000,
                goldStar: 38000,
                silverStar: 45000,
                bronzeStar: 60000,
            },
            {
                name: "Earth",
                pointsToUnlock: 700,
                goldMedal: 16000,
                silverMedal: 20000,
                bronzeMedal: 26000,
                goldStar: 34000,
                silverStar: 43000,
                bronzeStar: 50000,
            },
            {
                name: "Mars",
                pointsToUnlock: 1200,
                goldMedal: 35000,
                silverMedal: 40000,
                bronzeMedal: 47000,
                goldStar: 60000,
                silverStar: 70000,
                bronzeStar: 90000,
            },
            {
                name: "Jupiter",
                pointsToUnlock: 2000,
                goldMedal: 35000,
                silverMedal: 40000,
                bronzeMedal: 55000,
                goldStar: 100000,
                silverStar: 110000,
                bronzeStar: 120000,
            },
            {
                name: "Saturn",
                pointsToUnlock: 3000,
                goldMedal: 100000,
                silverMedal: 120000,
                bronzeMedal: 140000,
                goldStar: 160000,
                silverStar: 200000,
                bronzeStar: 280000,
            },
            {
                name: "Uranus",
                pointsToUnlock: 4000,
                goldMedal: 15000,
                silverMedal: 16000,
                bronzeMedal: 18000,
                goldStar: 20000,
                silverStar: 25000,
                bronzeStar: 35000,
            },
            {
                name: "Neptune",
                pointsToUnlock: 5000,
                goldMedal: 39000,
                silverMedal: 42000,
                bronzeMedal: 46000,
                goldStar: 52000,
                silverStar: 56000,
                bronzeStar: 60000,
            },
        ];
    } else if (difficulty === "Normal" || difficulty === "Test") {
        medalTimes = [
            {
                name: "Sol",
                pointsToUnlock: 0,
                goldMedal: 15000,
                silverMedal: 20000,
                bronzeMedal: 30000,
                goldStar: 50000,
                silverStar: 70000,
                bronzeStar: 90000,
            },
            {
                name: "Mercury",
                pointsToUnlock: 100,
                goldMedal: 20000,
                silverMedal: 30000,
                bronzeMedal: 40000,
                goldStar: 55000,
                silverStar: 75000,
                bronzeStar: 95000,
            },
            {
                name: "Venus",
                pointsToUnlock: 200,
                goldMedal: 30000,
                silverMedal: 40000,
                bronzeMedal: 60000,
                goldStar: 80000,
                silverStar: 100000,
                bronzeStar: 120000,
            },
            {
                name: "Earth",
                pointsToUnlock: 400,
                goldMedal: 28000,
                silverMedal: 40000,
                bronzeMedal: 50000,
                goldStar: 65000,
                silverStar: 75000,
                bronzeStar: 85000,
            },
            {
                name: "Mars",
                pointsToUnlock: 700,
                goldMedal: 50000,
                silverMedal: 60000,
                bronzeMedal: 80000,
                goldStar: 100000,
                silverStar: 135000,
                bronzeStar: 155000,
            },
            {
                name: "Jupiter",
                pointsToUnlock: 1100,
                goldMedal: 55000,
                silverMedal: 70000,
                bronzeMedal: 100000,
                goldStar: 130000,
                silverStar: 165000,
                bronzeStar: 185000,
            },
            {
                name: "Saturn",
                pointsToUnlock: 1600,
                goldMedal: 160000,
                silverMedal: 220000,
                bronzeMedal: 310000,
                goldStar: 330000,
                silverStar: 350000,
                bronzeStar: 400000,
            },
            {
                name: "Uranus",
                pointsToUnlock: 2200,
                goldMedal: 25000,
                silverMedal: 30000,
                bronzeMedal: 35000,
                goldStar: 40000,
                silverStar: 60000,
                bronzeStar: 80000,
            },
            {
                name: "Neptune",
                pointsToUnlock: 2900,
                goldMedal: 50000,
                silverMedal: 60000,
                bronzeMedal: 75000,
                goldStar: 85000,
                silverStar: 120000,
                bronzeStar: 175000,
            },
        ];
    }

    medalTimes.medalIMG = function (name, bestLap, lastName, difficulty) {
        var obj = { img: new Image(), display: true, pointsToUnlock: 0 };
        var image = new Image();

        for (let i = 0; i < this.length; i++) {
            if (this[i].name === name) {
                obj.pointsToUnlock = this[i].pointsToUnlock;
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
            var earned = 0;
            for (var k = arena.tier; k > tier; k--) {
                if (k === 0) earned += 100;
                earned += k * 100;
            }
            arena.credits += earned;
            arena.score += earned;
            localStorage.setItem(player + "credits", arena.credits);
            localStorage.setItem(player + "score", arena.score);
            localStorage.setItem(player + arena.mapName + "tier", arena.tier);
        }

        return image;
    };

    return medalTimes;
}
