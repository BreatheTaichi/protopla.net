import React, { useEffect } from "react";

export default function Credits(props) {
    useEffect(() => {
        props.setSubmenuNumberOfItems(1);
    });
    return (
        <section id="1" className="how-to-container" tabIndex="0">
            <h1>Credits</h1>
            <h2>NASA</h2>
            <p>
                It took many decades of hard work and ingenuity to send probes
                to the outer and inner reaches of the solar system, bringing
                back the pictures and data that make something like this game
                possible.
            </p>
            <h2>React team and React Reddit</h2>
            <p>
                Thanks for all the great tutorials, and answering my questions.
            </p>
            <h2>freesound.org</h2>
            <p>Thanks to the people who donated at freesound.</p>
        </section>
    );
}
