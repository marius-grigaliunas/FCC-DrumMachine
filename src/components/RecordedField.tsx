import { useRef, useState } from "react";

interface RecordedFieldProps {
    recordings: { letter: string; sound: string; time: number; sourceLink: string}[][];
}
export const RecordedField = ({ recordings }: RecordedFieldProps) => {
    const playButtonRef = useRef<HTMLButtonElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const playRecording = async (recording: { letter: string; sound: string; time: number; sourceLink: string }[]) => {
        console.log("Record started")
    
        if (playButtonRef.current) {
            playButtonRef.current.classList.add("disabled")
        }
        setIsPlaying(true)

        const playPromises = recording.map(({ time, sourceLink }) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
    
                    const audio = new Audio(sourceLink);
                    audio.play().then(() => {
                        resolve()
                    }).catch(err => {
                        console.error("Audio play error:", err)
                        resolve()
                    })
                }, time)
            })
        })
    
        await Promise.all(playPromises);
    
        if (playButtonRef.current) {
            playButtonRef.current.classList.remove("disabled");
        }
        setIsPlaying(false)
    }

    return (
        <div id='record-field-container' className='bg-zinc-900 border border-pink-950 h-96 rounded-2xl mt-3 p-3 overflow-y-auto'>
            <label className="text-white font-bold">Recordings</label>
            {recordings.length === 0 ? (
                <p className="text-gray-400">No recordings yet</p>
            ) : (
                recordings.map((recording, index) => (
                    <div key={index} className="p-2 border-b border-gray-700">
                        <p className="text-white">Recording {index + 1}</p>
                        {recording.map((sound, i) => (
                            <p key={i} className="text-gray-300">
                                {sound.letter} - {sound.sound} ({sound.time}ms)
                            </p>
                        ))}
                        <button
                            ref={playButtonRef}
                            className="mt-2 px-4 py-1 bg-pink-900 border-2 border-pink-950 ring ring-pink-900 text-white 
                            rounded-2xl"
                            onClick={() => playRecording(recording)}
                            disabled={isPlaying ? true : false}
                        >
                            Play
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

