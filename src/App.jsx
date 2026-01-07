import { useState } from "react";
import VideoLayer from "./components/VideoLayer";
import BackgroundGif from "./components/BackgroundGif";
import VolumeControls from "./components/VolumeControls";
import MediaControls from "./components/MediaControls";
import Clock from "./components/Clock";
import LowPowerOverlay from "./components/LowPowerOverlay";
import useYouTubePlayer from "./hooks/useYouTubePlayer";
import useKeyboardControls from "./hooks/useKeyboardControls";

export default function App() {
  const player = useYouTubePlayer("K6qj09OHvjw");

  const [isGif, setIsGif] = useState(true);
  const [showClock, setShowClock] = useState(false);
  const [isLowPower, setIsLowPower] = useState(true);

  useKeyboardControls({
    toggleGif: () => setIsGif(v => !v),
    toggleClock: () => setShowClock(v => !v),
    toggleLowPower: () => setIsLowPower(v => !v),
    ...player,
  });

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black">

      {/*window */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       h-[100vh] w-[95vw] overflow-hidden rounded-xl">

        <VideoLayer containerRef={player.containerRef} />

        {/* shadow overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl 
        shadow-[inset_0_0_15px_180px_rgba(0,0,0,1)]"
        />

      </div>

      <BackgroundGif visible={isGif} />

      <VolumeControls
        volume={player.volume}
        onMute={player.mute}
        onVolumeChange={player.setVolume}
      />

      {isLowPower && <LowPowerOverlay />}

      {showClock && <Clock />}

      <MediaControls {...player}/>
      

    </div>
  );
}
