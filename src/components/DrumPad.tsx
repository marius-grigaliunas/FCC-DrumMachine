import { useRef, useEffect } from 'react'

interface DrumPadProps {
    letter: string,
    audioFileName: string
    sourceLink: string
    updateDisplay: FunctionStringCallback
}

export default function DrumPad({ letter, audioFileName, sourceLink, updateDisplay }: DrumPadProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            updateDisplay(audioFileName)
            
            // Add and remove class for animation
            if (buttonRef.current) {
                buttonRef.current.classList.add('playing')
                setTimeout(() => {
                    buttonRef.current?.classList.remove('playing')
                }, 200)
            }
        }
    }

    useEffect(() => {
        const keyboardPlay = (event: KeyboardEvent) => {   
            if(event.key.toUpperCase() === letter.toUpperCase()) {
                play()
            }
        }

        window.addEventListener('keydown', keyboardPlay)

        return () => {
            window.removeEventListener('keydown', keyboardPlay)
        }
    }, [letter])

    return (
        <button
            ref={buttonRef}
            className="drum-pad bg-oldschool-pad-bg p-3 text-oldschool-pink border-oldschool-amber
                border-1 transition-all duration-200"
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
    )
}