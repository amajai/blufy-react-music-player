import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";

const TrackList = ({tracks, currentSong, isPlaying, setIsPlaying, setCurrentSong}) => {

    const songSelecthandler = (e) => {
        const index = e.currentTarget.dataset.id
        setCurrentSong(tracks[index])
        setIsPlaying(true)
      };

    const albumCoverHandler =(song) =>{
      if(song.cover){
        return <img src={song.cover} alt={`${song.title} album cover`} />  
      } else {
        return <img src={`./songs_images/no_cover.jpg`} alt={`default cover`} />  
      }
    }

    return(
        <div className="library-track-container">
        {tracks.map((song, i) => {
          return (
            <div key={i} data-id={i} className={`track ${tracks.indexOf(currentSong) === i? 'selected-track':''}`} onClick={(e) => songSelecthandler(e)}>
              <div className="library-track">
                {tracks.indexOf(currentSong) === i && isPlaying?
                    <span className={`playing-disc ${tracks.indexOf(currentSong) === i && isPlaying? 'selected-track':''}`}>
                    <FontAwesomeIcon icon={faCompactDisc} spin size='4x'/>
                    </span>
                :''}
                {albumCoverHandler(song)}
                <div className="library-title">
                  <h3>{song.title}</h3>
                  <h4>{song.artist}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
}

export default TrackList