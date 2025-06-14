import { useEffect, useRef, useState } from "react"
import { spotifyPlayerContext } from './spotifyPlayerContext/'


export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState()
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [deviceId, setDeviceId] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    const originalOnReady = window.onSpotifyWebPlaybackSDKReady;
    ;


    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: 'Cilia Music Player',
        getOAuthToken: cb => { cb(localStorage.getItem('spotifyToken')); },
        volume: volume / 100
      });

      newPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
      });

      newPlayer.addListener('player_state_changed', state => {
        if (!state) return;

        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
        setProgress(state.position / state.duration * 100);
      });

      newPlayer.connect();
      playerRef.current = newPlayer;
      setPlayer(newPlayer);

      return () => {
        newPlayer.disconnect();
      };
    };

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script);
      window.onSpotifyWebPlaybackSDKReady = originalOnReady;
      if (playerRef.current) {
        playerRef.current.disconnect();
      }
    };
  }, [volume])

  useEffect(() => {
    if (player) {
      player.setVolume(volume / 100);
    }
  }, [volume, player]);

  const togglePlay = () => {
    playerRef.current.togglePlay();
  };

  const skipNext = () => {
    playerRef.current.nextTrack();
  };

  const skipPrev = () => {
    playerRef.current.previousTrack();
  };

  const seek = (percentage) => {
    if (currentTrack) {
      const positionMs = (percentage / 100) * currentTrack.duration_ms;
      playerRef.current.seek(positionMs);
    }
  };
  return (
    <spotifyPlayerContext.Provider value={{
      player,
      isPlaying,
      currentTrack,
      progress,
      volume,
      setVolume,
      deviceId,
      togglePlay,
      skipNext,
      skipPrev,
      seek

    }}>
      {children}
    </spotifyPlayerContext.Provider>
  )
}
