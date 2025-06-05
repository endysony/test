// Playlist.js
import React from "react";

function Playlist({ items, isPlaying, handlePlayPause, currentTrackIndex }) {
  return (
    <div className="playlistBox">
      <h4 className="playlistHeader">Playlists</h4>
      <div className="trackBox">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="trackItem"
            style={{
              backgroundColor:
                isPlaying && currentTrackIndex === index ? "black" : "transparent",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="trackTitle">
              <p>{item.label}</p>
              <p className="artist">{item.artist}</p>
            </div>
            <div>
              <button className="playControls"
                onClick={() => handlePlayPause(index)}
                disabled={!item.src}
                style={{
                  backgroundColor:
                    isPlaying && currentTrackIndex === index
                      ? "#c50824"
                      : "#beb6b6d3",
                }}
              >
                {isPlaying && currentTrackIndex === index ? "⏸" : "⯈"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
