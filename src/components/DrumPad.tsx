import { useRef } from 'react'
import { useEffect } from 'react'

interface DrumPadProps {
    letter: string,
    audioFileName: string
}

export default function DrumPad( {letter, audioFileName} : DrumPadProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const play = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0
            audioRef.current.play()
        }
    }

    useEffect(() => {
        const keyboardPlay = (event: KeyboardEvent) => {
            console.log(event)
            
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
            src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
            ref={audioRef}></audio>
        </button>
      )
}
