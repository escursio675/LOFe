import {useState} from 'react';

export default function VideoList({visible, onToggle, currSong}){
    
    return(
        <div>
            <div className="absolute bottom-1/20 right-1/35 text-2xl text-[#811dc3]"
            style={{fontFamily: 'silkscreen'}}>
                <button onClick={() => onToggle(!visible)} className="hover:brightness-150">
                    <u>VIDEOS</u>
                </button>
            </div>

            {visible && 

            <div className={`text-[#811dc3] absolute top-1/2 left-1/2 bg-[#00000099]
            h-screen w-screen -translate-x-1/2 -translate-y-1/2
            flex flex-col gap-[3vh]`}
            style={{fontFamily: 'silkscreen'}}>

                <div className="flex flex-row-reverse">
                    <button onClick={()=> onToggle(!visible)} 
                    className="lg:text-3xl mt-[3vh] mr-[3vh] hover:brightness-150">
                        CLOSE
                    </button>
                </div>

                <div className="flex flex-col items-start gap-[4vh] lg:text-3xl
                h-screen w-screen">

                    <button onClick={()=>currSong(0)}
                    className="hover:brightness-150"><u>1. Lofi Jazz Lounge Music</u></button>
                    <button onClick={()=>currSong(1)}
                    className="hover:brightness-150"><u>2. Lofi Hip-Hop Radio</u></button>
                    <button onClick={()=>currSong(2)}
                    className="hover:brightness-150"><u>3. “That Japanese Math Rock Sound”</u></button>
                    <button onClick={()=>currSong(3)}
                    className="hover:brightness-150"><u>4. Synthwave Radio Beats</u></button>
                    <button onClick={()=>currSong(4)}
                    className="hover:brightness-150"><u>5. 24/7 Lofi Hip-Hop Radio</u></button>
                    <button onClick={()=>currSong(5)}
                    className="hover:brightness-150"><u>6. Chill Radio 24/7</u></button>
                    <button onClick={()=>currSong(6)}
                    className="hover:brightness-150"><u>7. Video Game Beats</u></button>
                    <button onClick={()=>currSong(7)}
                    className="hover:brightness-150"><u>8. Retro Lofi</u></button>
                    <button onClick={()=>currSong(8)}
                    className="hover:brightness-150"><u>9. Calming Rain</u></button>
                    <button onClick={()=>currSong(9)}
                    className="hover:brightness-150"><u>10. Japanese Alternative Rock</u></button>
                    <button onClick={()=>currSong(10)}
                    className="hover:brightness-150"><u>11. Japanese Alternative Rock[remake]</u></button>
                        
                 </div>

            </div>
            
            }
            


        </div>

    )
}
