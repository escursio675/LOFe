import { useEffect, useRef, useState } from "react";

export default function useYouTubePlayer(videoId) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (!window.YT) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: { autoplay: 1, controls: 0, rel: 0 },
        events: {
          onReady: e => setDuration(e.target.getDuration()),
          onStateChange: e =>
            setIsPlaying(e.data === window.YT.PlayerState.PLAYING),
        },
      });
    };

    return () => playerRef.current?.destroy();
  }, [videoId]);

  useEffect(() => {
    const i = setInterval(() => {
      if (playerRef.current?.getPlayerState() === 1) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(i);
  }, []);

  const seek = t => playerRef.current.seekTo(t, true);

  return {
    containerRef,
    isPlaying,
    duration,
    currentTime,
    volume,

    togglePlay: () =>
      isPlaying
        ? playerRef.current.pauseVideo()
        : playerRef.current.playVideo(),

    start: () => seek(0),
    end: () => seek(duration - 0.25),
    prev5: () => seek(Math.max(currentTime - 5, 0)),
    skip5: () => seek(Math.min(currentTime + 5, duration - 0.25)),
    seek,

    mute: () =>
      playerRef.current.isMuted()
        ? playerRef.current.unMute()
        : playerRef.current.mute(),

    setVolume: v => {
      playerRef.current.setVolume(v);
      setVolume(v);
    },
  };
}
