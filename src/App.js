import React, { useState, useRef, Fragment } from "react";
import "./style.css";
import { songList } from "./data";

import PlayerDetails from "./components/PlayerDetails";
import PlayerControls from "./components/PlayerControls";
import Library from "./components/Library";
import Player from "./components/Player";
import Lyrics from "./components/Lyrics";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElement = useRef(null);
  const [songs] = useState(songList);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [toggleLibrary, setToggleLibrary] = useState(false);
  const [toggleLyrics, setToggleLyrics] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: "",
    duration: "",
  });

  const timeFormat = (timestamp, fullFormat = false) => {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = Math.floor(timestamp % 60);

    let formatted = `${
      hours === 0 && !fullFormat ? "" : hours.toString().padStart(2, "0") + ":"
    }${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return formatted;
  };

  return (
    <Fragment>
      <Library
        songs={songs}
        currentSong={currentSong}
        toggleLibrary={toggleLibrary}
        setToggleLibrary={setToggleLibrary}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Lyrics
        currentSong={currentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        toggleLyrics={toggleLyrics}
        setToggleLyrics={setToggleLyrics}
        audioElement={audioElement}
        toggleLibrary={toggleLibrary}
      />
      <Player toggleLibrary={toggleLibrary}>
        <PlayerDetails song={currentSong} />
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          songs={songs}
          timeFormat={timeFormat}
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          audioElement={audioElement}
          toggleLibrary={toggleLibrary}
          setToggleLibrary={setToggleLibrary}
          toggleLyrics={toggleLyrics}
          setToggleLyrics={setToggleLyrics}
        />
      </Player>
    </Fragment>
  );
}

export default App;
