import { useContext } from "react";
import { Button, Container, Navbar, ProgressBar } from "react-bootstrap";
import { spotifyPlayerContext } from "./spotifyPlayerContext";


export default function Footer() {
  const {
    isPlaying,
    currentTrack,
    progress,
    volume,
    setVolume,
    togglePlay,
    skipNext,
    skipPrev,
    seek
  } = useContext(spotifyPlayerContext);

  const formatTime = (ms) => {
    if (!ms) return "0:00";
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = (clickPosition / rect.width) * 100;
    seek(percentage);
  }

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newVolume = (clickPosition / rect.width) * 100;
    setVolume(Math.max(0, Math.min(100, newVolume)));
  }


  return (
    <Navbar expand="lg" bg="dark" fixed="bottom" className="shadow-sm py-1 player-bar">
      <Container fluid className="d-flex justify-content-between align-items-center">
        {/* Song Info */}
        <div className="d-flex align-items-center" style={{ width: '200px' }}>
          <img
            src={currentTrack?.album.images[0]?.url || "https://via.placeholder.com/50"}
            alt="Album cover"
            className="rounded me-2"
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <div className="text-white">{currentTrack?.name || "No track playing"}</div>
            <div className="text-muted" style={{ fontSize: '0.8rem' }}>
              {currentTrack?.artists.map(a => a.name).join(', ') || "Artist"}
            </div>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="d-flex flex-column align-items-center" style={{ width: '400px' }}>
          <div className="d-flex align-items-center mb-1">
            <Button variant="link" className="text-white mx-2" onClick={skipPrev}>
              <i className="bi bi-skip-backward-btn fs-4"></i>
            </Button>
            <Button
              variant="link"
              className="text-white mx-2"
              style={{ fontSize: '1.5rem' }}
              onClick={togglePlay}
            >
              <i className={`bi ${isPlaying ? 'bi-pause' : 'bi-play'} fs-4`}></i>
            </Button>
            <Button variant="link" className="text-white mx-2" onClick={skipNext}>
              <i className="bi bi-skip-forward-btn fs-4"></i>
            </Button>
          </div>
          <div className="d-flex align-items-center w-100">
            <span className="text-muted me-2" style={{ fontSize: '0.8rem' }}>
              {formatTime(currentTrack?.duration_ms * (progress / 100))}
            </span>
            <ProgressBar
              now={progress}
              className="flex-grow-1"
              style={{ height: '4px', cursor: 'pointer' }}
              onClick={handleProgressClick}
            />
            <span className="text-muted ms-2" style={{ fontSize: '0.8rem' }}>
              {formatTime(currentTrack?.duration_ms)}
            </span>
          </div>
        </div>

        {/* Volume Controls */}
        <div className="d-flex align-items-center" style={{ width: '200px' }}>
          <Button variant="link" className="text-white">
            <i className="bi bi-volume-down"></i>
          </Button>
          <ProgressBar
            now={volume}
            className="flex-grow-1 mx-2"
            style={{ height: '4px', cursor: 'pointer' }}
            onClick={handleVolumeClick}
          />
          <Button variant="link" className="text-white">
            <i className="bi bi-volume-up"></i>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}


