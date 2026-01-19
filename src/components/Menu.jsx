import {useState} from 'react';

export default function Menu({visible, onToggle}){

    const [isMailModel, setisMailModel] = useState(false);

    return(
        <div className="flex"
        style={{fontFamily: 'silkscreen'}}>
            <div className="absolute top-1/30 right-1/40 flex flex-row gap-[3vh] border-none">
                <button className ="text-[#811dc3] lg:text-3xl
                focus:outline-none" onClick={()=> onToggle(!visible)}
                >
                    MENU
                </button>
            </div>

            {visible &&(
                <div className={`text-[#811dc3] absolute top-1/2 left-1/2 bg-black
                lg:h-[70vh] lg:w-[60vh] -translate-x-1/2 -translate-y-1/2 border-solid
                border-8 border-[#811dc3] rounded flex flex-col gap-[3vh]
                ${isMailModel ? "brightness-50" : "brightness-100"}`}>

                    <div className="flex flex-row-reverse">
                        <button onClick={()=> onToggle(!visible)} 
                        className="lg:text-4xl">
                            X
                        </button>
                    </div>

                    <div className="flex justify-center lg:text-3xl">
                        <u>Controls</u>
                    </div>

                    <div className="flex items-center flex-col lg:text-2xl gap-[1vh]">

                        <p>Mute: <span className="text-[#B4182D]">M</span></p>
                        <p>LOW POWER MODE: <span className="text-[#B4182D]">L</span></p>
                        <p>VIDEO: <span className="text-[#B4182D]">V</span></p>

                        <p>CLOCK: <span className="text-[#B4182D]">T</span></p>
                        <p>SWITCH GIF: <span className="text-[#B4182D]">G</span></p>

                        <p>FULLSCREEN: <span className="text-[#B4182D]">F11</span></p>
                        <p>HIDE/UNHIDE UI: <span className="text-[#B4182D]">H</span></p>

                    </div>

                    <div className="flex justify-center">
                        <p>───────────────────────────────────────────</p>
                    </div>

                    <div className="flex justify-center lg:text-3xl"
                    style={{fontFamily: 'doto'}}
                    >
                        <u>Made with &#9825; by yu!</u>
                    </div>

                    <div className="flex justify-center">
                        <button onClick={() => setisMailModel(true)}>
                            <img src="/src/assets/mail.png" alt="Mail" 
                            className="filter invert lg:h-[7vh] lg:w-[7vh]" />
                        </button>

                        <a href="https://github.com/escursio675" target="_blank" 
                        rel="noopener noreferrer">
                            <img src="src/assets/github.png" alt="Github" 
                            className="filter invert lg:h-[7vh] lg:w-[7vh]" />
                        </a>

                        <a href="https://www.linkedin.com/in/abhimanyu-saikia/" target="_blank"
                        rel="noopener noreferrer">
                            <img src="src/assets/linkedin.png" alt="LinkedIn" 
                            className="filter invert lg:h-[7vh] lg:w-[7vh]" />
                        </a>

                        <a href="https://x.com/yu_workss" target="_blank"
                        rel="noopener noreferrer">
                            <img src="src/assets/twitter.png" alt="Twitter" 
                            className="filter invert lg:h-[7vh] lg:w-[7vh]" />
                        </a>
                    </div>

                </div>
            )}

            {isMailModel &&
                    <div className="bg-black lg:h-[12vh] lg:w-[50vh] brightness-100 text-white
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-white rounded"
                    style={{fontFamily: 'doto'}}>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        flex items-center flex-col gap-[1vh] lg:text-xl">
                            <p>Shoot me a mail at: abhisaikia675@gmail.com</p>
                            <button onClick={() => setisMailModel(false)}
                            className="border-2 border-white rounded lg:w-[10vh]">
                                GOT IT!
                            </button>
                        </div>


                    </div>}
        </div>
    );
}