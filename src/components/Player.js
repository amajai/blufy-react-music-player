import React from "react";

const Player = ({children, toggleLibrary }) => {

    return (
        <div className="player-container">
            <main id="player" className={`${toggleLibrary ? "open" : ""}`}>
                {children}
            </main>
        </div>
    )
}

export default Player;