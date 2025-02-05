import { useRef } from 'react'
import { useEffect } from 'react'

interface DrumPadProps {
    letter: string,
    audioFileName: string
    sourceLink: string
    updateDisplay: FunctionStringCallback
}

export default function DrumPad( {letter, audioFileName, sourceLink, updateDisplay} : DrumPadProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            updateDisplay(audioFileName)
        }
    }

    useEffect(() => {
        const keyboardPlay = (event: KeyboardEvent) => {   
            event.key.toUpperCase() == letter.toUpperCase() && play() 
        }

        window.addEventListener('keydown', keyboardPlay)

        return () => {
          window.removeEventListener('keydown', keyboardPlay)
        }
    },[])

  
    return (
        <button
        className='drum-pad'
        id={audioFileName}
        onClick={play}
        >
            {letter}
            <audio 
            id={letter}
            className='clip' 
            src={sourceLink}
            ref={audioRef}></audio>
        </button>
      )
}
