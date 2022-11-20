import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

import SearchBox from "./SearchBox";
import TrackList from "./TrackList";

export default function Library({
  songs,
  setCurrentSong,
  currentSong,
  toggleLibrary,
  setToggleLibrary,
  isPlaying,
  setIsPlaying,
}) {
  const [searchField, setSearchField] = useState("");

  const onSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredTracks = songs.filter((track) => {
    return track.title.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <div className={`library-container ${toggleLibrary ? "open" : ""}`}>
      <div className="library-nav">
        <span className="icon" onClick={()=> setToggleLibrary(!toggleLibrary)}>
         <FontAwesomeIcon icon={faSquareXmark} size='2x' />
        </span>
        <h2>Library</h2>
      </div>
      <SearchBox searchChange={onSearchChange} />
      <TrackList
        tracks={filteredTracks}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
