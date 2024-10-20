import React, { useState, useRef } from 'react';

// Sample tracks using online links
const tracks = [
  {
    title: 'Track 1',
    artist: 'Ammy Virk',
    src: '/audio/track-1.mp3',
  },
  {
    title: 'Track 2',
    artist: 'Lana Del Rey',
    src: '/audio/track-2.mp3',
  },
  {
    title: 'Track 3',
    artist: 'Toaka',
    src: '/audio/track-3.mp3',
  },
  {
    title:'Track 4',
    artist:'Roop kumar rathod',
    src:'/audio/track-4.mp3'
  }
];

const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].src));
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[(currentTrackIndex + 1) % tracks.length].src);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    audioRef.current.pause();
    audioRef.current = new Audio(tracks[(currentTrackIndex - 1 + tracks.length) % tracks.length].src);
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleProgressChange = (event) => {
    const value = event.target.value;
    audioRef.current.currentTime = (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  // Update progress while the track is playing
  audioRef.current.ontimeupdate = () => {
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  return (
    <div className="audio-player">
      <h2>{tracks[currentTrackIndex].title}</h2>
      <h3>{tracks[currentTrackIndex].artist}</h3>
      <div className="controls">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleNext}>Next</button>
      </div>
      <input
        type="range"
        value={progress}
        onChange={handleProgressChange}
        className="progress-bar"
      />
    </div>
  );
};

export default AudioPlayer;