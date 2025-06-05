import React, { useRef, useState, useEffect } from "react";
import CardList from "./CardList";
import Playlist from "./Playlist";
import track1 from "./assets/unforgettable.mp3";
import track2 from "./assets/because.mp3";
import track3 from "./assets/nho.mp3";
import track4 from "./assets/anhchi.mp3";
import track5 from "./assets/anhvan.mp3"
import track6 from "./assets/vietban.mp3"
import track7 from "./assets/khoangcach.mp3"
import track8 from "./assets/chieco.mp3"




function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null); // No auto-play

  const trackList = [
    { id: 1, label: "Unforgettable Rain", artist: "Sony", src: track1 },
    { id: 2, label: "Because I Know I Love You", artist: "Sony ft. Yuji", src: track2 },
    { id: 3, label: "Nhớ Cho Đến Khi Có Thể Quên", artist: "Sony ft. Tùng LV", src: track3 },
    { id: 4, label: "Anh Chỉ Yêu Mình Em Thôi", artist: "Sony ft. Tùng LV, Tố Tố", src: track4 },
    { id: 5, label: "Anh Vẫn Mang Một Lời Hứa", artist: "Sony ft. Tùng LV", src: track5},
    { id: 6, label: "Viết Bản Tình Ca", artist: "Sony ft. Tùng LV", src: track6 },
    { id: 7, label: "Khoảng Cách Phiến Gỗ", artist: "Sony ft. Tùng LV", src: track7 },
    { id: 8, label: "Chiếc Ô Không Mở", artist: "Sony", src: track8 },
  ];

  const handlePlayPause = (index = currentTrackIndex ?? 0) => {
    const audio = audioRef.current;

    if (!trackList[index].src) return;

    if (index !== currentTrackIndex) {
      setCurrentTrackIndex(index);
      audio.src = trackList[index].src;
      audio.load();
      audio.play();
      setIsPlaying(true);
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSeek = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime = (audioRef.current.duration / 100) * value;
    setProgress(value);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const setAudioDuration = () => setDuration(audio.duration);
    const onEnded = () => handleNextTrack();

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", onEnded);
    };
  }, [currentTrackIndex]);

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const handleNextTrack = () => {
    if (currentTrackIndex === null) return;
    const nextIndex = (currentTrackIndex + 1) % trackList.length;
    handlePlayPause(nextIndex);
  };

  const handlePreviousTrack = () => {
    if (currentTrackIndex === null) return;
    const prevIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    handlePlayPause(prevIndex);
  };

  const displayedTrack = currentTrackIndex !== null ? trackList[currentTrackIndex] : trackList[0];

  return (
    <div className="cardContainer" style={{ maxWidth: "500px", margin: "auto" }}>
      <audio ref={audioRef} />

      <CardList
        title={displayedTrack.label}
        artist={displayedTrack.artist}
        handlePlayPause={() => handlePlayPause()}
        isPlaying={isPlaying}
        progress={progress}
        handleSeek={handleSeek}
        currentTime={currentTime}
        duration={duration}
        formatTime={formatTime}
        onNext={handleNextTrack}
        onPrev={handlePreviousTrack}
      />

      <Playlist
        items={trackList}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        currentTrackIndex={currentTrackIndex}
      />
    </div>
  );
}

export default AudioPlayer;
