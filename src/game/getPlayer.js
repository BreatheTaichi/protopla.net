export default function setShip(player) {
    if (localStorage.getItem(player + "rotationSpeed") === null)
        localStorage.setItem(player + "rotationSpeed", 0.5);
    if (localStorage.getItem(player + "acceleration") === null)
        localStorage.setItem(player + "acceleration", 0.06);
    if (localStorage.getItem(player + "boost") === null)
        localStorage.setItem(player + "boost", 0.001);
    if (localStorage.getItem(player + "maxBoost") === null)
        localStorage.setItem(player + "maxBoost", 0.01);
    if (localStorage.getItem(player + "friction") === null)
        localStorage.setItem(player + "friction", 0.98);
    if (localStorage.getItem(player + "bounceFriction") === null)
        localStorage.setItem(player + "bounceFriction", 0.7);
}
// TODO change this to a function that returns a player object
// that can be passed through the program.  This will help when
// the back end is created, and stop the program from having to
// check localstorage so often, or calling to the backend to
// get information, and will only set items.  Possibly even go
// old school and make the player save at the end of sessions
// or not..?  Well probably not, but an option.
