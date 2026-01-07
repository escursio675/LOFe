export default function MediaControls({
  isPlaying,
  duration,
  currentTime,
  togglePlay,
  start,
  end,
  prev5,
  skip5,
  seek,
}) {
  return (
    <div className="absolute bottom-1/25 flex-row items-center justify-center gap-[5vh] 
      border-none">
      <div className="flex flex-row gap-[5vh]">
        <button onClick={start}>
          <img src='../public/end.svg' className="filter invert lg:h-[5vh] scale-x-[-1]"></img>
        </button>
        <button onClick={prev5}>
          <img src='../public/prev5.svg' className="filter invert lg:h-[5vh] "></img>
        </button>
        <button onClick={togglePlay}>
          <img src={isPlaying ? '../public/pause.svg' : '../public/play.svg'}
            className="filter invert lg:h-[5vh] "></img>
        </button>
        <button onClick={skip5}>
          <img src='../public/skip5.svg' className="filter invert lg:h-[5vh] "></img>
        </button>
        <button onClick={end}>
          <img src='../public/end.svg' className="filter invert lg:h-[5vh] "></img>
        </button>
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={e => seek(e.target.value)}
        className="w-full range-slider"
      />
    </div>
  );
}
