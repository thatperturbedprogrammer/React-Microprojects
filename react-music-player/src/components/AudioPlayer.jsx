import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import "./AudioPlayer.css";
import audio1 from "../assets/audio/good-night-lofi-cozy-chill-music-160166.mp3";
import audio2 from "../assets/audio/piano-anime-ending-242439.mp3";

const audioFiles = [
  { src: audio1, name: audio1.split("/").pop() },
  { src: audio2, name: audio2.split("/").pop() },
];

export default function AudioPlayer() {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(new Audio());

  const togglePlayPause = (audio) => {
    if (currentAudio?.src === audio.src && !audioRef.current.paused) {
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
      audioRef.current.src = audio.src;
      audioRef.current.play();
      setCurrentAudio(audio);
    }
  };

  return (
    <div className="audio-player-container">
      {audioFiles.map((audio, index) => (
        <div key={index} className="audio-player">
          <button
            onClick={() => togglePlayPause(audio)}
            className="play-button"
          >
            {currentAudio?.src === audio.src && !audioRef.current.paused ? (
              <Pause size={24} />
            ) : (
              <Play size={24} />
            )}
          </button>
          <div className="audio-info">
            <span className="file-name">{audio.name}</span>
            <span className="status-text">
              <span
                className={`playing-paused-text ${
                  currentAudio?.src === audio.src && !audioRef.current.paused
                    ? "playing"
                    : "paused"
                }`}
              >
                {currentAudio?.src === audio.src && !audioRef.current.paused
                  ? "Playing..."
                  : "Paused"}
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
