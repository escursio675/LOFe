import { useEffect } from "react";

export default function useKeyboardControls(actions) {
  useEffect(() => {
    const onKey = e => {
      switch (e.key) {
        case " ":
          e.preventDefault();
          actions.togglePlay();
          break;
        case "ArrowRight":
          actions.skip5();
          break;
        case "ArrowLeft":
          actions.prev5();
          break;
        case "m":
          actions.mute();
          break;
        case "v":
          actions.toggleGif();
          break;
        case "t":
          actions.toggleClock();
          break;
        case "l":
          actions.toggleLowPower();
          break;
        case 'g':
          actions.toggleChangeGif();
          break;
        case 'h':
          actions.toggleUI();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [actions]);
}
