import React, { useRef, useState, useEffect } from 'react';
import Audio from './assets/audio.mp3'; 

function AudioPlayer() {
  const audioRef = useRef(null);

  const [progress, setProgress] = useState(0);       // Seek bar progress (0-100)
  const [currentTime, setCurrentTime] = useState(0); // Current playback time (sec)
  const [duration, setDuration] = useState(0);       // Total audio duration (sec)

  // Update progress and current time as audio plays
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('loadedmetadata', setAudioDuration); // Once metadata is ready
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, []);

  // Convert seconds to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * value;
    setProgress(value);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
      <audio ref={audioRef} src={Audio} />

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => audioRef.current.play()}>Play</button>
        <button onClick={() => audioRef.current.pause()}>Pause</button>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        style={{ width: '100%' }}
      />

      <div
    style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    fontSize: '14px',
    color: '#555'
  }}
>
  <span>{formatTime(currentTime)}</span>
  <span>{formatTime(duration)}</span>
</div>

    </div>
  );
}

export default AudioPlayer;
