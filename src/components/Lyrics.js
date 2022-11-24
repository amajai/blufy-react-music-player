import React, { useState, useEffect } from "react";

const Lyrics = ({
  currentSong,
  songInfo,
  setSongInfo,
  toggleLyrics,
  audioElement,
  toggleLibrary
}) => {
  const [lyrics, setLyrics] = useState([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState("");

  useEffect(() => {
    setLyrics([])
    getLyrics();
  }, [currentSong]);

  useEffect(() => {
    if (lyrics.length && toggleLyrics) {
      const index = getSyncLyricIndex(lyrics, Number(songInfo.currentTime));
      const currentLyricDOM = document.querySelector(`[data-key="${index}"]`);
      const lyricContent = document.querySelector(".lyrics-content");
      if (index === currentLyricIndex) {
      } else if (index >= 0) {

        setCurrentLyricIndex(index);
        currentLyricDOM.classList.add("current-lyric");
        const lyricLine = document.querySelector(".current-lyric");
        const center = lyricLine.offsetTop - lyricContent.offsetTop - (lyricContent.offsetHeight / 2 - lyricLine.offsetHeight - 20);
        lyricContent.scrollTop = center;
        const lyricLines = lyricContent.childNodes;

        lyricLines.forEach((line, i) => {
          if (index !== i) {
            line.classList.remove("current-lyric");
          }
        });

      } else {
        const lyricLines = lyricContent.childNodes;
        lyricLines.forEach((line, i) => {
          if (index !== i) {
            line.classList.remove("current-lyric");
          }
        });
        setCurrentLyricIndex(-1);
        lyricContent.scrollTop = 0;
      }
    }
  }, [songInfo, currentLyricIndex, lyrics, toggleLyrics]);



  const skipTolyricsLineHandler = (time) => {
    const delay = 0.001
    audioElement.current.currentTime = time+delay;
    setSongInfo({ ...songInfo, currentTime: time+delay });
    const slider = document.querySelector('#time-slider')
    slider.value = time
    audioElement.current.value = time+delay;
  };
  
  const getSyncLyricIndex = (lyrics, time) => {
    for (const i in lyrics) {
      if (lyrics[i].time >= time) {
        return i - 1;
      }
      if (Number(i) === lyrics.length - 1) {
        return Number(i);
      }
    }
    return -1;
  };

  const parseTime = (time) => {
    const minsec = time.split(":");

    const min = parseInt(minsec[0]) * 60;
    const sec = parseFloat(minsec[1]);

    return min + sec; // Total seconds
  };

  const getLyrics = async () => {
    const lyrics_src = currentSong.lyrics;
    const res = await fetch(lyrics_src);
    const lrc = await res.text();
    setLyrics(parseLyric(lrc));
  };

  const parseLyric = (lrc) => {
    const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<text>.*)/;

    const lines = lrc.split("\n");

    const output = [];

    lines.forEach((line) => {
      const match = line.match(regex);

      if (match == null) return;

      const { time, text } = match.groups;

      output.push({
        time: parseTime(time),
        text: text.trim(),
      });
    });

    return output;
  };

  return (
    <div id="lyrics" className={`${toggleLyrics ? "lyrics-open" : ""}`}>
      <div className={`lyrics-detail ${toggleLibrary ? "library-open" : ""}`}>
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist}</p>
      </div>
      <div className={`lyrics-content ${toggleLibrary ? "library-open" : ""}`}>
        {lyrics.length ? (
          lyrics.map((line, i) => (
            <h2 className="lyric" key={i} data-key={i} onClick={()=> skipTolyricsLineHandler(line.time)}>
              {line.text}
            </h2>
          ))
        ) : (
          <h1>There is no lyrics</h1>
        )}
      </div>
    </div>
  );
};

export default Lyrics;
