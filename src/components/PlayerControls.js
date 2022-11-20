import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeHigh,
  faVolumeMute,
  faVolumeLow,
  faForwardStep,
  faBackwardStep,
  faRepeat,
  faShuffle,
  faBars,
  faMusic,
  faSpinner,
  faPlusMinus,
} from "@fortawesome/free-solid-svg-icons";

const PlayerControls = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  setCurrentSong,
  songs,
  songInfo,
  setSongInfo,
  timeFormat,
  audioElement,
  toggleLibrary,
  setToggleLibrary,
  toggleLyrics,
  setToggleLyrics,
}) => {
  const [volume, setVolume] = useState(0.5);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [lastVolume, setLastVolume] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [isMute, setIsMute] = useState(false);


  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
      audioElement.current.playbackRate = playbackRate
    }
  }, [currentSong, isPlaying, audioElement, playbackRate]);

  const audioPlayHandler = () => {
    if (!isPlaying) {
      audioElement.current.volume = volume;
      audioElement.current.play();
      setIsPlaying(true);
    } else {
      audioElement.current.pause();
      setIsPlaying(false);
    }
  };

  const draghandler = (e) => {
    audioElement.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  

  const timeUpdatehandler = async (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
    });
  };

  const volumeHandler = (e) => {
    setLastVolume(volume)
    if (e.target.value === 0){
      setIsMute(true)
    } else{
      setIsMute(false)
    }
    setVolume(e.target.value);
    audioElement.current.volume = e.target.value;
  };

  const volumeMuteHandler = () => {
    const slider = document.querySelector('#volume-slider')
    setIsMute(!isMute)
    if(!isMute){
      console.log('mute');
      setLastVolume(volume)
      setVolume(0);
      audioElement.current.volume = 0;
      slider.value = 0
    } else {
      setVolume(lastVolume);
      audioElement.current.volume = lastVolume;
      slider.value = lastVolume
    }
  }

  const volumeIndicatorHandler = (volumeValue) => {
    if (volumeValue <= 0) {
      return <FontAwesomeIcon icon={faVolumeMute} size="2x" />;
    } else if (volumeValue <= 0.4) {
      return <FontAwesomeIcon icon={faVolumeLow} size="2x" />;
    } else {
      return <FontAwesomeIcon icon={faVolumeHigh} size="2x" />;
    }
  };

  const playbackSpeedHandler = (speed) => {
    audioElement.current.playbackRate = speed
    setPlaybackRate(speed)
  }

  const songSkippingHandler = (direction) => {
    const currentIndex = songs.indexOf(currentSong);
    if (direction === "back") {
      if ((currentIndex - 1) % songs.length < 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      }
    }
    if (direction === "forward") {
      if(!repeat){
        if(!shuffle){
          setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else {
          const arr = [...songs]
          arr.splice(currentIndex,1)
          setCurrentSong(songs[Math.floor(Math.random()*arr.length)]);
        }
      } else {
        audioElement.current.currentTime = 0;
        setSongInfo({ ...songInfo, currentTime: 0 });
        audioElement.current.play();
        setIsPlaying(true);
      }
    }
  };


  return (
    <div className="player-controls">
      <audio
        onTimeUpdate={timeUpdatehandler}
        onLoadedMetadata={timeUpdatehandler}
        src={currentSong.src}
        ref={audioElement}
        onEnded={() => {
          songSkippingHandler("forward");
        }}
      ></audio>
      <div className="time-control">
        <p>{timeFormat(songInfo.currentTime || 0)}</p>
        <input
          className="slider styled-slider slider-progress"
          id="time-slider"
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={draghandler}
        />
        <p>{timeFormat(songInfo.duration || 0)}</p>
      </div>
      <div className="player-control">
        <div className="toggle-options">
          <span title="Library" className={`icon ${toggleLibrary? "toggleable":""}`} onClick={()=> setToggleLibrary(!toggleLibrary)}>
            <FontAwesomeIcon
              icon={faBars}
              size="2x"
            />
          </span>
          <span title="Lyrics" className={`icon ${toggleLyrics? "toggleable":""}`} onClick={()=> setToggleLyrics(!toggleLyrics)}>
            <FontAwesomeIcon
              onClick={()=> setToggleLyrics(!toggleLyrics)}
              title="Lyrics"
              icon={faMusic}
              size="2x"
            />
          </span>
        </div>
        <div className="playback-options">
          <span  title="Shuffle"  className={`icon ${shuffle? "toggleable":""}`}>
            <FontAwesomeIcon
              onClick={()=> setShuffle(!shuffle)}
              icon={faShuffle}
              size="2x"
            />
          </span>
          <span title="Back" className="icon">
            <FontAwesomeIcon
              onClick={() => songSkippingHandler("back")}
              icon={faBackwardStep}
              size="2x"
            />
          </span>
          <span title={!isPlaying ? "Play" : "Pause"}  className="icon">
            {songInfo.duration ? (
              <FontAwesomeIcon
                className="play"
                icon={!isPlaying ? faPlay : faPause}
                size="2x"
                onClick={audioPlayHandler}
              />
            ) : (
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            )}
          </span>
          <span title="Next" className="icon">
            <FontAwesomeIcon
              icon={faForwardStep}
              size="2x"
              onClick={() => songSkippingHandler("forward")}
            />
          </span>
          <span title="Repeat" className={`icon ${repeat? "toggleable":""}`}>
            <FontAwesomeIcon
              onClick={() => setRepeat(!repeat)}
              icon={faRepeat}
              size="2x"
            />
          </span>
        </div>
        <div className="playback-speed-control">
          <span title="Playback Speed" className={`icon`}>
            <FontAwesomeIcon
              icon={faPlusMinus}
              size="2x"
            />
              <ul className="playback-speed-dropdown">
                <li className={`${playbackRate === 2?'active':''}`} onClick={()=>playbackSpeedHandler(2)}>2.00x</li>
                <li className={`${playbackRate === 1.5?'active':''}`} onClick={()=>playbackSpeedHandler(1.5)}>1.50x</li>
                <li className={`${playbackRate === 1?'active':''}`} onClick={()=>playbackSpeedHandler(1)}>Normal</li>
                <li className={`${playbackRate === 0.5?'active':''}`} onClick={()=>playbackSpeedHandler(0.5)}>0.50x</li>
                <li className={`${playbackRate === 0.25?'active':''}`} onClick={()=>playbackSpeedHandler(0.25)}>0.25x</li>
              </ul>
      
          </span> 
        </div>
        <div title="Volume" className="volume-chooser">
          <span className="icon volume-button" onClick={volumeMuteHandler}>
            {volumeIndicatorHandler(volume)}
          </span>
          <span className="icon volume-control">
            <input
              className="volume styled-slider slider-progress"
              id="volume-slider"
              min={0}
              max={1}
              step={0.01} 
              type="range"
              onChange={volumeHandler}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
