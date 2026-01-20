import VolumeIcon from "./icons/VolumeIcon";

export default function VolumeControls({ volume, onMute, onVolumeChange}) {
  return (
    <div className="absolute top-1/30 left-1/35 flex flex-row gap-[3vh] border-none">
      <button onClick={onMute}>
        <VolumeIcon className="h-[5vh] w-auto text-[#811dc3] focus:outline-none" />
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => onVolumeChange(+e.target.value)}
        className="range-slider text-[#811dc3] hover:brightness-150"
      />
    </div>
  );
}
