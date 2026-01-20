import { useEffect, useState } from "react";
import VideoLayer from "./components/VideoLayer";
import BackgroundGif from "./components/BackgroundGif";
import VolumeControls from "./components/VolumeControls";
import MediaControls from "./components/MediaControls";
import Clock from "./components/Clock";
import Menu from "./components/Menu";
import Listening from "./components/Listening";
import VideoList from "./components/VideoList"
import LowPowerOverlay from "./components/LowPowerOverlay";
import useYouTubePlayer from "./hooks/useYouTubePlayer";
import useKeyboardControls from "./hooks/useKeyboardControls";

export default function App() {

  const SONGS =[
    "ZJ7zLGzA9hg",
    "jfKfPfyJRdk",
    "jhIctzgP7vA",
    "4xDzrJKXOOY",
    "D5bqo8lcny4",
    "whtudvOvI84",
    "WGfMj5o4s1k",
    "tWjnf4hWWgs",
    "vYIYIVmOo3Q",
    "Vdems5SuChM",
    "xp_mUmwU9VA",
  ];

  const [isGif, setIsGif] = useState(true);
  const [changeGif, setchangeGif] = useState(0);
  const [showClock, setShowClock] = useState(false);
  const [isLowPower, setIsLowPower] = useState(true);
  const [ismenuModel, setismenuModel] = useState(false);
  const [showVidList, setshowVidList] = useState(false);
  const [showUi, setshowUi] = useState(true);
  const [songIndex, setsongIndex] = useState(0);
  const player = useYouTubePlayer(SONGS[songIndex]);
  const [data, setdata] = useState(null);

  useEffect(() => {
    
    const updateAndFetch = async () =>{
      try{

        const response = await fetch("/api/visitors");
        const result = await response.json();
        setdata(result.data.up_count);

      } catch(error){
        console.error("Error fetching visitor count:", error);
      }
    };

    updateAndFetch();

  }, []);


  useKeyboardControls({
    toggleGif: () => setIsGif(v => !v),
    toggleClock: () => setShowClock(v => !v),
    toggleLowPower: () => setIsLowPower(v => !v),
    toggleChangeGif: () => setchangeGif(v => v+1),
    toggleUI: () => setshowUi(v => !v),
    ...player,
  });

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black">

      {/*window */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       h-[100vh] w-[95vw] overflow-hidden rounded-xl
       ${!ismenuModel? "brightness-100" : "brightness-50"}`}>

        <VideoLayer containerRef={player.containerRef} />

        {/* shadow overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-xl 
        shadow-[inset_0_0_15px_180px_rgba(0,0,0,1)]"
        />

      </div>

      <BackgroundGif visible={isGif} gifChange={changeGif} isBright={!ismenuModel && !showVidList} />

      {showUi && 
      <VolumeControls
        volume={player.volume}
        onMute={player.mute}
        onVolumeChange={player.setVolume}
      />}

      {isLowPower && <LowPowerOverlay />}

      {showClock && <Clock />}

      {showUi && <Menu visible={ismenuModel} onToggle={setismenuModel} count={data}/>}

      {player.isPlaying && <Listening {...player} />}

      {showUi && <MediaControls {...player}/>}

      {showUi && <VideoList visible={showVidList} onToggle={setshowVidList}
      currSong={setsongIndex} />}
      
    </div>
  );
}
