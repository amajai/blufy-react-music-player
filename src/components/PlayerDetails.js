import React from "react";

const PlayerDetails = ({song}) => {
  return (
    <div className="player-details">
      <div className="player-name">
        <h2>Blufy</h2>
        <h5>Music Player</h5>
      </div>
      <div className="details-img">
        <img
          className="cover-image"
          src={song.cover? song.cover:'./songs_images/no_cover.jpg'}
          alt={song.title}
        />


      </div>
      <div className="artist-info">
        <h3 className="details-title">{song.title}</h3>
        <h4 className="details-artist">{song.artist}</h4>
      </div>
    </div>
  );
}

export default PlayerDetails;