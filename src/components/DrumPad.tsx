import { useRef, useState } from 'react'
import { useEffect } from 'react'

interface DrumPadProps {
    letter: string,
    audioFileName: string
    sourceLink: string
    updateDisplay: FunctionStringCallback
}

export default function DrumPad( {letter, audioFileName, sourceLink, updateDisplay} : DrumPadProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            updateDisplay(audioFileName)
            setIsPlaying(true)
        }
    }

    if(audioRef.current) {
        audioRef.current.onended = () => {
            setIsPlaying(false)
        }
    }

    useEffect(() => {
        const keyboardPlay = (event: KeyboardEvent) => {   
            if(event.key.toUpperCase() == letter.toUpperCase()) {
                play()
            }
        }

        window.addEventListener('keydown', keyboardPlay)

        return () => {
          window.removeEventListener('keydown', keyboardPlay)
        }
    },[])

  
    return (
        <button
        className={`drum-pad bg-amber-600 p-4 text-red-200 border-amber-300 border-1
            ${isPlaying ? `bg-amber-400` : ``}`}
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
