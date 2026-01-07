import {useRef, useEffect, useState} from 'react';

export default function App(){

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  /* states to check whether video is currently playing, duration of current video,
  current timestamp in the video, current volume gif mode and current time respectively */
  const [isPlaying, setisPlaying] = useState(false);
  const [totalSeconds, settotalSeconds] = useState(0);
  const [secondsNow, setsecondsNow] = useState(0);
  const [vol, setvol] = useState(50);
  const [isGif, setisGif] = useState(true);
  const [timeNow, settimeNow] = useState(new Date());
  const [showtimeNow, setshowtimeNow] = useState(false);
  const [isLowPower, setisLowPower] = useState(true);


  // maintain the current time
  useEffect(()=>{
    const timeInt = setInterval(()=>settimeNow(new Date()), 60000);

    return ()=>clearInterval(timeInt);
  }, []);
  
  // set event listerners for keyboard events
  useEffect(() =>{
    const onKey =(e) =>{
      switch(e.key){
        case 'v':
          setisGif(n => !n);
          break;
        case 'ArrowRight':
          handleSkip5();
          break;
        case 'ArrowLeft':
          handlePrev5();
          break;
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'm':
          handleMute();
          break;
        case 't':
          setshowtimeNow(n =>  !n);
          break;
        case 'l':
          setisLowPower(n => !n);
          break;
      };
    }
    window.addEventListener('keydown', onKey);

    return ()=>{
      window.removeEventListener('keydown', onKey);
    }
  }, []);


  {/* Move the progress bar thumb  */}
  useEffect(()=>{

    const timer = setInterval(()=>{

      if(playerRef.current.getPlayerState() === 1)
         setsecondsNow(playerRef.current.getCurrentTime());

    }, 1000);   

    return ()=>{
      clearInterval(timer);
    }

  }, []);

  const handleMute = ()=>{
    if(!playerRef.current || !window.YT){
      console.log("Player is not ready");
      return;
    }

    if(playerRef.current.isMuted()){
      playerRef.current.unMute();
    }
    else
      playerRef.current.mute();
  }

  const handleStart = ()=>{

    if(!playerRef.current || !window.YT){
      console.log("Player is not ready");
      return;
    }

    playerRef.current.seekTo(0, true);
  }

  const handleEnd = ()=>{

    if(!playerRef.current || !window.YT){
      console.log("Player is not ready");
      return;
    }

    const duration = playerRef.current.getDuration();

    playerRef.current.seekTo(duration-0.25, true);

  }


  const handlePlayPause = ()=>{

    if(!playerRef.current || !window.YT){
      console.log("Player not ready!");
      return
    }

    const state = playerRef.current.getPlayerState();

    if(state === 1){
      playerRef.current.pauseVideo();
    }
    else if(state === -1 || state === 2){
      playerRef.current.playVideo();
    }
      
}

const handleSkip5 = () => {
  const player = playerRef.current;
  if (!player || !window.YT) return;

  const state = player.getPlayerState();
  if (
    state !== 1 && state !== 2
  ) return;

  const time = player.getCurrentTime();
  const duration = player.getDuration();

  const nextTime = Math.min(time + 5, duration - 0.25);
  player.seekTo(nextTime, true);
};


const handlePrev5 = () => {
  if (!playerRef.current || !window.YT) return;

  const state = playerRef.current.getPlayerState();
  if (
    state !== 1 && state !== 2
  ) {
    return;
  }

  const currentTime = playerRef.current.getCurrentTime();
  const newTime = Math.max(currentTime - 5, 0);

  playerRef.current.seekTo(newTime, true);
};

  {/* create the youtube player object */}
  useEffect(()=>{
    if(!window.YT){
      const script=document.createElement('script');
      script.src='https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = ()=>{
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '300',
        width: '600',
        videoId: "K6qj09OHvjw",
        playerVars: {
          autoplay: 1,
          controls: 0,
          rel: 0
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    return ()=>{
      if(playerRef.current) playerRef.current.destroy();
    };
  }, [])

  function onPlayerReady(event){
    console.log("Player is Ready!");
    settotalSeconds(event.target.getDuration());
  }

  function onPlayerStateChange(event){
    switch (event.data) {
    case window.YT.PlayerState.PLAYING:
      setisPlaying(true);
      break;

    case window.YT.PlayerState.PAUSED:
    case window.YT.PlayerState.ENDED:
      setisPlaying(false);
      break;

    default:
      break;
  }
  }

  return(
    <div className="fixed inset-0 flex items-center justify-center bg-black">

      
      {/*window */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
       h-[100vh] w-[95vw] overflow-hidden rounded-xl">
        {/* Iframe layer */}
        <div
          ref={containerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    lg:h-screen lg:w-screen"
        />
        {/* shadow overlay */}
        <div
          className="pointer-events-none absolute inset-0
                    rounded-xl
                    shadow-[inset_0_0_15px_180px_rgba(0,0,0,1)]"
        />
      </div>

      {/* background GIF layer */}
      <img
        src="/tenor3.gif" alt="background gif"
        className={`fixed inset-0 h-screen w-screen ${isGif ? `opacity-100` : `opacity-0`}`}
      />

      {/* volumecontrols */}
      <div className="absolute top-1/30 left-1/35 flex flex-row gap-[3vh] border-none">
        <button onClick={handleMute}>
          <img src='../public/mute.svg' className="filter invert lg:h-[4vh] lg:w-[4vw]"></img>
        </button>
        <input type='range' min='0' max='100' value={vol}
        onChange={(e)=>{

          playerRef.current.setVolume(e.target.value);
          setvol(e.target.value);

        }}  
         className="range-slider"></input>
      </div>

      {isLowPower === true && <div className='crt crt-strong crt-curve crt-glow'></div>}
      
      {/* clock */}
      {showtimeNow === true && <div className="absolute top-1/30 flex flex-row gap-[3vh] 
      border-none text-white lg:text-2xl">
        {timeNow.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
      </div>}

      {/* media controls */}
      <div className="absolute bottom-1/25 flex-row items-center justify-center gap-[5vh] 
      border-none">

        <div className="flex flex-row gap-[5vh]">
          <button onClick={handleStart}>
            <img src='../public/end.svg' className="filter invert lg:h-[5vh] scale-x-[-1]"></img>
          </button>
          <button onClick={handlePrev5}>
            <img src='../public/prev5.svg' className="filter invert lg:h-[5vh] "></img>
          </button>
          <button onClick={handlePlayPause}>
            <img src={isPlaying ? '../public/pause.svg' : '../public/play.svg'}
             id='play-button'
            className="filter invert lg:h-[5vh] "></img>
          </button>
          <button onClick={handleSkip5}>
            <img src='../public/skip5.svg' className="filter invert lg:h-[5vh] "></img>
          </button>
          <button onClick={handleEnd}>
            <img src='../public/end.svg' className="filter invert lg:h-[5vh] "></img>
          </button>
        </div>

        <input type='range' min='0' max={totalSeconds} value={secondsNow}
        onChange={(e)=>{
          playerRef.current.seekTo(Number(e.target.value), true);
          setsecondsNow(e.target.value);
        }}
        className="w-full range-slider"></input>
        
      </div>

    </div>

  )

}