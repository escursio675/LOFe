import {useState, useEffect} from 'react';
import sound from '../assets/sound.gif';

export default function Listening(){

    const [index, setindex] = useState(0);

    const listenVals = ["Listening in.", "Listening in..", "Listening in..."];

    useEffect(() => {
        const timer = setInterval(()=>{
            if (!listenVals.length) return;

            setindex(prev => (prev + 1) % listenVals.length);

        }, 1000);

        return ()=> clearInterval(timer);
    }, []);

    return(
        <div className="absolute bottom-1/20 left-1/35 text-2xl text-[#B4182D]
        drop-shadow-[0_0_2px_#d4243c]"
              style={{fontFamily: 'silkscreen'}}>
                <img src={sound} className="lg:w-[5vh] lg:h-[5vh]"  />
                {listenVals[index]}
        </div>
    )
}