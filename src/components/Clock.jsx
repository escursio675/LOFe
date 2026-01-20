import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const i = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="absolute top-1/30 flex flex-row gap-[3vh] 
      border-none text-white lg:text-4xl"
    style={{fontFamily: 'silkscreen'}}>
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}
