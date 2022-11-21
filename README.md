# Blufy - React Music Player
![Project frontpage](https://github.com/amajai/blufy-music-player/blob/main/project%20images/main.jpg "Project frontpage")


A react music player project I built and took inspiration from spotify. Has all the functionality of a music player with additional features to make it unique. 

## Features

- Basic music player functionalities (Play, skip, volume, shuffle etc.. )
- Library of music track you add
- Lyrics/karaoke mode - If lrc file (lyrics file format) is provided with a music track
- Adjust Playback speed ranging from 2x to 0.25x speed
- Default album cover is used if music track has no image cover
- Responsive audio timeframe slider (synced with lyrics)

## Adding music track, album cover image and lyrics
1. To add music track, song cover and lyrics, go to `publc/` folder and them to `publc/songs`, `publc/songs_images` and `publc/songs_lrc` respectively.
2. Go to `data.js` in `src/` folder and add an object in the `songList` function detailing the music track, cover image and lyrics file you added:
    - `id` - unique id but its optional
    - `title` - music track title
    - `cover` - album cover source path
    - `src` - audio file source path
    - `artist` - artist name
    - `lyrics` - .lrc file format source path 
    
    Object template

    ```javascript
          {
            id: "[...]",
            title: "[...]",
            cover:"./songs_images/[...].jpg",
            src: "./songs/[...].mp3",
            artist: "[...]",
            lyrics: "./songs_lrc/[...].lrc",
          },

    ```
