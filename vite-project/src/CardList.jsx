// CardList.js
import Sony from "./assets/sony.png";

function Card({
  image = Sony,
  title,
  artist,
  handlePlayPause,
  isPlaying,
  progress,
  handleSeek,
  currentTime,
  duration,
  formatTime,
  onNext,
  onPrev,
}) {
  return (
    <div className="cardBox">
      <img className="photo" src={image} alt="Profile" />
      <p className="title">{title}</p>
      <p className="artistSize">{artist}</p>

      <div className="seekbar-container">
        <input
          className="seekbar"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5px",
            fontSize: "8px",
            color: "white",
          }}
        >
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="button-container">
        <button className="left-button" onClick={onPrev}>
          ⯇⯇
        </button>
        <button className="toggle-button" onClick={handlePlayPause}>
          {isPlaying ? "⏸" : "⯈"}
        </button>
        <button className="right-button" onClick={onNext}>
          ⯈⯈
        </button>
      </div>
    </div>
  );
}

function CardList(props) {
  return <Card {...props} />;
}

export default CardList;
