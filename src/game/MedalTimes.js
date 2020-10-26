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
                goldMedal: new Date(10000),
                silverMedal: new Date(12000),
                bronzeMedal: new Date(15000),
                goldStar: new Date(20000),
                silverStar: new Date(30000),
                bronzeStar: new Date(50000),
            },
            {
                name: "Mercury",
                goldMedal: new Date(12500),
                silverMedal: new Date(15000),
                bronzeMedal: new Date(20000),
                goldStar: new Date(30000),
                silverStar: new Date(40000),
                bronzeStar: new Date(55000),
            },
            {
                name: "Venus",
                goldMedal: new Date(22000),
                silverMedal: new Date(25000),
                bronzeMedal: new Date(30000),
                goldStar: new Date(40000),
                silverStar: new Date(60000),
                bronzeStar: new Date(80000),
            },
            {
                name: "Earth",
                goldMedal: new Date(16000),
                silverMedal: new Date(20000),
                bronzeMedal: new Date(28000),
                goldStar: new Date(40000),
                silverStar: new Date(50000),
                bronzeStar: new Date(65000),
            },
            {
                name: "Mars",
                goldMedal: new Date(35000),
                silverMedal: new Date(40000),
                bronzeMedal: new Date(47000),
                goldStar: new Date(75000),
                silverStar: new Date(90000),
                bronzeStar: new Date(125000),
            },
            {
                name: "Jupiter",
                goldMedal: new Date(35000),
                silverMedal: new Date(40000),
                bronzeMedal: new Date(55000),
                goldStar: new Date(70000),
                silverStar: new Date(100000),
                bronzeStar: new Date(145000),
            },
            {
                name: "Saturn",
                goldMedal: new Date(100000),
                silverMedal: new Date(120000),
                bronzeMedal: new Date(160000),
                goldStar: new Date(220000),
                silverStar: new Date(310000),
                bronzeStar: new Date(325000),
            },
            {
                name: "Uranus",
                goldMedal: new Date(15000),
                silverMedal: new Date(18000),
                bronzeMedal: new Date(20000),
                goldStar: new Date(25000),
                silverStar: new Date(35000),
                bronzeStar: new Date(50000),
            },
            {
                name: "Neptune",
                goldMedal: new Date(39000),
                silverMedal: new Date(42000),
                bronzeMedal: new Date(52000),
                goldStar: new Date(62000),
                silverStar: new Date(82000),
                bronzeStar: new Date(110000),
            },
        ];
    } else if (difficulty === "Normal" || difficulty === "Test") {
        medalTimes = [
            {
                name: "Sol",
                goldMedal: new Date(12000),
                silverMedal: new Date(15000),
                bronzeMedal: new Date(20000),
                goldStar: new Date(30000),
                silverStar: new Date(50000),
                bronzeStar: new Date(70000),
            },
            {
                name: "Mercury",
                goldMedal: new Date(15000),
                silverMedal: new Date(20000),
                bronzeMedal: new Date(30000),
                goldStar: new Date(40000),
                silverStar: new Date(550000),
                bronzeStar: new Date(75000),
            },
            {
                name: "Venus",
                goldMedal: new Date(25000),
                silverMedal: new Date(30000),
                bronzeMedal: new Date(40000),
                goldStar: new Date(60000),
                silverStar: new Date(80000),
                bronzeStar: new Date(100000),
            },
            {
                name: "Earth",
                goldMedal: new Date(20000),
                silverMedal: new Date(28000),
                bronzeMedal: new Date(40000),
                goldStar: new Date(50000),
                silverStar: new Date(65000),
                bronzeStar: new Date(75000),
            },
            {
                name: "Mars",
                goldMedal: new Date(40000),
                silverMedal: new Date(47000),
                bronzeMedal: new Date(75000),
                goldStar: new Date(90000),
                silverStar: new Date(125000),
                bronzeStar: new Date(145000),
            },
            {
                name: "Jupiter",
                goldMedal: new Date(40000),
                silverMedal: new Date(55000),
                bronzeMedal: new Date(70000),
                goldStar: new Date(100000),
                silverStar: new Date(145000),
                bronzeStar: new Date(165000),
            },
            {
                name: "Saturn",
                goldMedal: new Date(120000),
                silverMedal: new Date(160000),
                bronzeMedal: new Date(220000),
                goldStar: new Date(310000),
                silverStar: new Date(325000),
                bronzeStar: new Date(375000),
            },
            {
                name: "Uranus",
                goldMedal: new Date(20000),
                silverMedal: new Date(24000),
                bronzeMedal: new Date(28000),
                goldStar: new Date(35000),
                silverStar: new Date(43000),
                bronzeStar: new Date(60000),
            },
            {
                name: "Neptune",
                goldMedal: new Date(42000),
                silverMedal: new Date(52000),
                bronzeMedal: new Date(62000),
                goldStar: new Date(82000),
                silverStar: new Date(110000),
                bronzeStar: new Date(175000),
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
            lastBestLap = localStorage.getItem(player + lastName + "bestlap");
            for (let k = 0; k < this.length; k++) {
                if (lastBestLap === null) {
                    obj.display = false;
                } else if (this[k].name === lastName) {
                    if (lastBestLap <= this[k].bronzeStar.valueOf()) {
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

    medalTimes.getRecordMedal = function (name, lap, arena) {
        var tier;
        var image = new Image();
        for (let i = 0; i < medalTimes.length; i++) {
            var obj = medalTimes[i];
            if (obj.name === name) {
                if (lap <= obj.goldMedal) {
                    image.src = goldMedal;
                    localStorage.setItem(player + name + "tier", 6);
                } else if (lap <= obj.silverMedal) {
                    image.src = silverMedal;
                    localStorage.setItem(player + name + "tier", 5);
                } else if (lap <= obj.bronzeMedal) {
                    image.src = bronzeMedal;
                    localStorage.setItem(player + name + "tier", 4);
                } else if (lap <= obj.goldStar) {
                    image.src = goldStar;
                    localStorage.setItem(player + name + "tier", 3);
                } else if (lap <= obj.silverStar) {
                    image.src = silverStar;
                    localStorage.setItem(player + name + "tier", 2);
                } else if (lap <= obj.bronzeStar) {
                    image.src = bronzeStar;
                    localStorage.setItem(player + name + "tier", 1);
                } else {
                    image.src = none;
                }
                tier = parseInt(localStorage.getItem(player + name + "tier"));
                if (arena.tier < tier) {
                    for (var k = tier; k > arena.tier; k--) {
                        if (k === 0) arena.credits += 100;
                        arena.credits += k * 100;
                        localStorage.setItem(
                            player + arena.mapName + "tier",
                            arena.tier
                        );
                        localStorage.setItem(player + "credits", arena.credits);
                    }
                    arena.tier = tier;
                }
            }
        }
        return image;
    };
    medalTimes.display = function (name) {
        for (let i = 0; i < this.length; i++) {
            if (this.name === name) {
            }
        }
    };
    return medalTimes;
}
