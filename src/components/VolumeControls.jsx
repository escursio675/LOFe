export default function VolumeControls({ volume, onMute, onVolumeChange }) {
  return (
    <div className="absolute top-1/30 left-1/35 flex flex-row gap-[3vh] border-none">
      <button onClick={onMute}>
        <img src="/mute.svg" className="filter invert lg:h-[4vh] lg:w-[4vw]" />
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={e => onVolumeChange(+e.target.value)}
        className="range-slider"
      />
    </div>
  );
}
