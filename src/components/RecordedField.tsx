import { useRef, useState, useEffect } from "react";
import { Note, Recording } from './Types';

interface RecordedFieldProps {
    recordings: Recording[]
    setRecordings: (recordings: Recording[]) => void
}
export const RecordedField = ({ recordings, setRecordings }: RecordedFieldProps) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [recordingsArray, setRecordingsArray] = useState<Recording[]>(recordings)

    useEffect(() => {
        setRecordingsArray(recordings);
    }, [recordings]);

    console.log(recordingsArray)

    const playRecording = async (recording: Recording) => {
        // const playButtonRef = useRef<HTMLButtonElement | null>(null)

        console.log("Record started")
    
        // if (playButtonRef.current) {
        //     playButtonRef.current.classList.add("disabled")
        // }

        setIsPlaying(true)

        
        const playPromises = recording.notes.map(({ time, sourceLink }) => {
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
    
        // if (playButtonRef.current) {
        //     playButtonRef.current.classList.remove("disabled");
        // }
        setIsPlaying(false)

        // plqying doesn't work properly need to fix
    }

    const deleteRecording = (record: Recording, recordingsArr: Recording[]) => {
        const index = recordingsArr.findIndex(r => r.id === record.id)
        if(index > -1) {
            const updatedRecordings = [
                ...recordingsArr.slice(0, index),
                ...recordingsArr.slice(index + 1),
            ];

            setRecordingsArray(updatedRecordings)
            setRecordings(updatedRecordings)

        }
    }

    return (
        <div id='record-field-container' className='bg-zinc-900 border border-pink-950 h-96 rounded-2xl mt-3 p-3 overflow-y-auto'>
            <label className="text-white font-bold">Recordings</label>
            {recordingsArray.length === 0 ? (
                <p className="text-gray-400">No recordings yet</p>
            ) : (
                recordingsArray.map((recording : Recording) => (
                    <div key={recording.id} className="p-2 border-b border-gray-700">
                        <p className="text-white">{recording.id}</p>
                        {recording.notes.map((sound, i) => (
                            <p key={i} className="text-gray-300 text-xs">
                                {sound.letter} - {sound.sound} ({sound.time}ms)
                            </p>
                        ))}
                        <button
                            className="mt-2 px-4 py-1 bg-pink-900 border-2 border-pink-950 ring ring-pink-900 text-white 
                            rounded-2xl"
                            onClick={() => playRecording(recording)}
                        >
                            {isPlaying ? "Playing" : "Play!"}
                        </button>
                        <button
                            className="mt-2 mx-2 px-4 py-1 bg-red-800 border-2 border-pink-950 ring ring-pink-900 text-white 
                            rounded-2xl"
                            onClick={() => deleteRecording(recording, recordingsArray)}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

