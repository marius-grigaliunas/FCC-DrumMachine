import { useState, useEffect } from "react";
import { Recording } from './Types';

interface RecordedFieldProps {
    recordings: Recording[]
    setRecordings: (recordings: Recording[]) => void
}
export const RecordedField = ({ recordings, setRecordings }: RecordedFieldProps) => {

    const [recordingsArray, setRecordingsArray] = useState<Recording[]>(recordings)
    const [playingRecordings, setPlayingRecordings] = useState<{[key: string]: boolean}>({});

    useEffect(() => {
        setRecordingsArray(recordings);
    }, [recordings]);

    const playRecording = async (recording: Recording) => {

        if(playingRecordings[recording.id]) {
            return;
        }

        setPlayingRecordings(prev => ({...prev, [recording.id] : true}));

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

        setPlayingRecordings(prev => ({...prev, [recording.id]: false}));
    }

    const deleteRecording = (recording: Recording, recordingsArr: Recording[]) => {
        const index = recordingsArr.findIndex(r => r.id === recording.id)
        if(index > -1) {
            const updatedRecordings = [
                ...recordingsArr.slice(0, index),
                ...recordingsArr.slice(index + 1),
            ];

            setRecordingsArray(updatedRecordings)
            setRecordings(updatedRecordings)

        }
    }

    const updateRecordingTitle = (id: string, newTtitle: string) => {
        const updatedRecordings = recordingsArray.map((recording: Recording) => 
        recording.id === id ? {...recording, name:newTtitle} : recording
        );

        setRecordingsArray(updatedRecordings);
        setRecordings(updatedRecordings);
    }

    return (
        <div id='record-field-container' className='bg-zinc-900 border border-pink-950 h-96 w-lg rounded-2xl mt-3 p-3 overflow-y-auto scrollbar-custom'>
            <div className="text-white font-bold mb-4">Recordings</div>
            {recordingsArray.length === 0 ? (
                <p className="text-gray-400">No recordings yet</p>
            ) : (
                recordingsArray.map((recording : Recording) => (
                    <div key={recording.id} className="min-h-30 mb-4 p-4 rounded-2xl border-pink-950 border-2 ring ring-pink-900 
                        flex flex-row hover:border-pink-200">
                        <div key={`${recording.id}-info`} className="w-60">
                            <EditableTitle 
                                defaultTitle={recording.name} 
                                onTitleChange={(newTitle) => updateRecordingTitle(recording.id, newTitle)}
                            />
                            {recording.notes.map((sound, i) => (
                                <p key={i} className="text-gray-300 text-xs">
                                    {sound.letter} - {sound.sound} ({sound.time}ms)
                                </p>
                        ))}
                        </div>
                        <div key={`${recording.id}-controls`} className="flex flex-col justify-between items-center w-45">
                            <button
                                className="bg-pink-900 border-2 border-pink-950 ring ring-pink-900 text-white 
                                rounded-2xl w-30 p-1 hover:bg-pink-700"
                                onClick={() => playRecording(recording)}
                                disabled={!!playingRecordings[recording.id]}
                            >
                                Play
                            </button>
                            <button
                                className="bg-red-800 border-2 border-pink-950 ring ring-pink-900 text-white 
                                rounded-2xl w-30 p-1 hover:bg-red-500"
                                onClick={() => deleteRecording(recording, recordingsArray)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

interface EditableTitleProps {
    defaultTitle: string
    onTitleChange: (newTitle : string) => void 
} 

const EditableTitle = ({defaultTitle, onTitleChange}: EditableTitleProps) => {

    return (
    <input
        type="text"
        value={defaultTitle}
        onChange={(e) => onTitleChange(e.target.value)}
        className="text-white font-bold text-center rounded-2xl"
    />
  )
}
