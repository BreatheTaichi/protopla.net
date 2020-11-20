import React, { useEffect } from "react";
import thrustForward from "../game/images/howtoplay/thrustForward.webp";
import thrustReverse from "../game/images/howtoplay/thrustReverse.webp";
import turnClockwise from "../game/images/howtoplay/turnClockwise2.webp";
import turnCounterclockwise from "../game/images/howtoplay/turnCounterclockwise2.webp";
import amythest from "../game/images/medals/amythest.webp";
import bronzeStar from "../game/images/medals/bronzeStar.webp";
import emerald from "../game/images/medals/emerald.webp";
import goldStar from "../game/images/medals/goldStar.webp";
import ruby from "../game/images/medals/ruby.webp";
import silverStar from "../game/images/medals/silverStar.webp";
import lapTimes from "../game/MedalTimes.js";
import dateFormat from "../game/dateFormat.js";

export default function HowToPlay(props) {
    var medalTimes = lapTimes(
        props.state.player.difficulty,
        props.state.player.name
    );
    useEffect(() => {
        props.setSubmenuNumberOfItems(1);
    });

    return (
        <section id="1" className="how-to-container" tabIndex="0">
            <h1>How to Play</h1>
            <div className="how-to-key-grid">
                <div></div>
                <div className="how-to-arrow-button">
                    <div className="how-to-arrow">↑</div>
                </div>
                <div></div>
                <div className="how-to-arrow-button">
                    <div className="how-to-arrow">←</div>
                </div>
                <div className="how-to-arrow-button">
                    <div className="how-to-arrow">↓</div>
                </div>
                <div className="how-to-arrow-button">
                    <div className="how-to-arrow">→</div>
                </div>
            </div>
            <p>Use arrow keys or gamepad to control the ship.</p>
            <div className="how-to-controls-grid">
                <div>
                    <img src={thrustForward} alt="ship thrusting" />
                    <p>Press up [↑] to move forward.</p>
                </div>
                <div>
                    <img src={thrustReverse} alt="ship thrusting" />
                    <p>Press down [↓] to go in reverse.</p>
                </div>
                <div>
                    <img src={turnClockwise} alt="ship turning" />
                    <p>Press right [→] to turn your ship clockwise.</p>
                </div>
                <div>
                    <img src={turnCounterclockwise} alt="ship turning" />
                    <p>Press left [←] to turn your ship counter-clockwise.</p>
                </div>
            </div>
            <p>You can also use the arrow keys to traverse menus!</p>
            <h2>Upgrading your ship</h2>
            <h5>First earn credits. Then hit the Store.</h5>
            <div className="how-to-credits-grid">
                <div className="how-to-credits-row1">Type</div>
                <div>Credits</div>
                <img src={ruby} alt="ruby" />
                <div>Ruby</div>
                <div>600</div>
                <img src={amythest} alt="amythest" />
                <div>Amythest</div>
                <div>500</div>
                <img src={emerald} alt="emerald" />
                <div>Emerald</div>
                <div>400</div>
                <img src={goldStar} alt="goldStar" />
                <div>Gold</div>
                <div>300</div>
                <img src={silverStar} alt="silverStar" />
                <div>Silver</div>
                <div>200</div>
                <img src={bronzeStar} alt="bronzeStar" />
                <div>Bronze</div>
                <div>100</div>
            </div>
            <p>Earn credits by beating the medal times in each course.</p>
            <div className="instructions-times-grid-wrapper">
                {medalTimes.map((obj, index) => {
                    return (
                        <div className="instructions-times-grid" key={index}>
                            <div className="instructions-times-name">
                                {obj.name}
                            </div>
                            <div className="instructions-times-medal">
                                Ruby:
                            </div>
                            <div>{dateFormat(obj.goldMedal)}</div>
                            <div className="instructions-times-medal">
                                Amythest:
                            </div>
                            <div>{dateFormat(obj.silverMedal)}</div>
                            <div className="instructions-times-medal">
                                Emerald:
                            </div>
                            <div>{dateFormat(obj.bronzeMedal)}</div>
                            <div className="instructions-times-medal">
                                Gold:
                            </div>
                            <div>{dateFormat(obj.goldStar)}</div>
                            <div className="instructions-times-medal">
                                Silver:
                            </div>
                            <div>{dateFormat(obj.silverStar)}</div>
                            <div className="instructions-times-medal">
                                Bronze:
                            </div>
                            <div>{dateFormat(obj.bronzeStar)}</div>
                        </div>
                    );
                })}
            </div>
            <p></p>
            <h3>Store Items</h3>
            <div className="instructions-store-grid">
                <div className="instructions-store-item">
                    <h4>Thrusters</h4>
                    <p>
                        The basic propulsion system for your ship. Sturdy and
                        reliable.
                    </p>
                </div>
                <div className="instructions-store-item">
                    <h4>Rotation</h4>
                    <p>
                        Increase the power of the side gas jets that allow the
                        ship to turn.
                    </p>
                </div>
                <div className="instructions-store-item">
                    <h4>Fuel Balancer</h4>
                    <p>
                        Magnetic array that increases the efficiency of the ship
                        engines by balancing the intake and use of particles
                        from the Ramfield. As the balancer is upgraded the
                        purple hue in the ship exhaust will turn to bright green
                        as the field aligns.
                    </p>
                </div>
                <div className="instructions-store-item">
                    <h4>Alignment Matrix</h4>
                    <p>
                        When you hit a wall the Fuel Balancer goes out of
                        alignment. Upgrade this to get back up to maximum
                        balance more quickly.
                    </p>
                </div>
                <div className="instructions-store-item">
                    <h4>Bussard Ramfield</h4>
                    <p>
                        The field draws in gases to power your ship, but create
                        drag. Upgrade to increase efficiency and decrease the
                        friction.
                    </p>
                </div>
                <div className="instructions-store-item">
                    <h4>Ship Plating</h4>
                    <p>
                        Your ship will bounce off objects more, losing less
                        speed. Less alignment lost from the Fuel Balancer.
                    </p>
                </div>
            </div>
            <h3>Tips</h3>
            <h4>Building your ship</h4>
            <p>
                Number one is speed. The best way to increase speed is the Fuel
                Balancer. Unfortunately when your ship hits a wall it will lose
                most of its alignment, which will slow you down.
            </p>
            <p>
                Next in line are Thrusters and Bussard Ramfield. Thrusters are
                only half as powerful as the Fuel Balancer, but still a great
                way to improve speed.
            </p>
            <p>
                Upgrading the Bussard Ramfield will remove some of the friction
                that slows your ship down. This will help get to max speed, and
                give the feeling of sliding around corners. Important for
                getting top speeds, but can make the ship feel out of control at
                higher levels.
            </p>
            <p>
                As your ship speed increases you will need to add rotation so
                that maneuverability stays high. How much you will need depends
                on skill level, see how long you can put it off!
            </p>
            <p>
                Ship Plating and Alignment Matrix are very good if you are
                hitting walls often. If you are going for the highest times your
                ship will need these points elsewhere, though.
            </p>
            <h4>Racing tips</h4>
            <p>
                Be as comfortable racing forward as you are in reverse. This way
                you can reverse any time, taking sharp corners very quickly.
            </p>
            <p>
                When turning, if you can hug the outside wall before you turn
                your ship will gain more speed coming into the next area.
            </p>
        </section>
    );
}
