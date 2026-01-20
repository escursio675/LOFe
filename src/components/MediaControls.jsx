import StartIcon from "./icons/StartIcon";
import PrevIcon from "./icons/PrevIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import EndIcon from "./icons/EndIcon";


export default function MediaControls({
  isPlaying,
  duration,
  currentTime,
  togglePlay,
  title,
  url,
  start,
  end,
  prev5,
  skip5,
  seek,
}) {
  return (
    <div className="absolute bottom-1/25 flex-row items-center justify-center gap-[5vh] 
      border-none">
      
      <div className="text-[#811dc3] flex justify-center lg:pb-4 lg:text-xl">
        <a href={url} rel="noopener noreferrer" target="_blank"
        className="hover:brightness-150">
          {title}
        </a>
      </div>


      <div className="flex flex-row gap-[5vh] focus:outline-none">
        <button onClick={start}>
          
          <StartIcon className="lg:h-[5vh] scale-x-[-1] text-[#811dc3]" />

        </button>

        <button onClick={prev5}>
          
          <PrevIcon className="lg:h-[5vh] text-[#811dc3]" />

        </button>

        <button onClick={togglePlay}>

          {isPlaying ? (
              /* PAUSE ICON */
              <PauseIcon className="lg:h-[5vh] w-auto text-[#811dc3]" />
            ) : (
              /* PLAY ICON */
              <PlayIcon className="lg:h-[5vh] w-auto text-[#811dc3]" />

            )
          }


        </button>
        <button onClick={skip5}>
          
          <NextIcon className="lg:h-[5vh] text-[#811dc3]" />

        </button>

        <button onClick={end}>

          <EndIcon className="lg:h-[5vh] text-[#811dc3]" />

        </button>
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={e => seek(e.target.value)}
        className="w-full range-slider text-[#811dc3] hover:brightness-150"
      />
    </div>
  );
}
