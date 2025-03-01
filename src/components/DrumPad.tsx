import { useRef, useEffect, useCallback } from 'react';

interface DrumPadProps {
    letter: string;
    audioFileName: string;
    sourceLink: string;
    updateDisplay: (sound: string) => void;
    handleDrumPadPress: (letter: string, sound: string, sourceLink:string) => void;  // Receive this function
}

export default function DrumPad({ letter, audioFileName, sourceLink, updateDisplay, handleDrumPadPress }: DrumPadProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);


    const play = useCallback(() => {
        if (audioRef.current) {
            console.log(`DrumPad ${letter} pressed`);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            updateDisplay(audioFileName);
            handleDrumPadPress(letter, audioFileName, sourceLink);

            if (buttonRef.current) {
                buttonRef.current.classList.add('playing');
                setTimeout(() => {
                    buttonRef.current?.classList.remove('playing');
                }, 200);
            }
        }
    }, [letter, audioFileName, sourceLink, updateDisplay, handleDrumPadPress]);

    useEffect(() => {
        const keyboardPlay = (event: KeyboardEvent) => {   
            if(event.key.toUpperCase() === letter.toUpperCase()) {
                play();
            }
        };

        window.addEventListener('keydown', keyboardPlay);
        return () => {
            window.removeEventListener('keydown', keyboardPlay);
        };
    }, [letter, play]);

    return (
        <button
            ref={buttonRef}
            className="drum-pad bg-zinc-800 p-3 text-oldschool-green font-mono border-oldschool-green
                border-1 transition-all duration-200 flex justify-center items-center ring"
            id={audioFileName}
            onClick={play}
        >
            {letter}
            <audio 
                id={letter}
                className='clip' 
                src={sourceLink}
                ref={audioRef}
            ></audio>
        </button>
    );
}
