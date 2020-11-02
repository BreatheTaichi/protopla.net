export default function getPlayer(player, difficulty) {
    localStorage.setItem(player + "rotationSpeed", 0.5);
    localStorage.setItem(player + "acceleration", 0.06);
    localStorage.setItem(player + "boost", 0.001);
    localStorage.setItem(player + "maxBoost", 0.01);
    localStorage.setItem(player + "friction", 0.98);
    localStorage.setItem(player + "bounceFriction", 0.3);

    var testCredits;
    difficulty === "Test" ? (testCredits = 20000) : (testCredits = 0);
    localStorage.setItem(player + "credits", testCredits);
    localStorage.setItem(player + "score", 0);
    localStorage.setItem(player + "levelFocused", "Sol");
    localStorage.setItem(player + "arrows", "true");
    localStorage.setItem(player + "thrustTrail", "true");
    localStorage.setItem(player + "background", "true");
    localStorage.setItem(player + "musicVolume", 1);
    localStorage.setItem(player + "effectsVolume", 1);
}
