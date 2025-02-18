
interface RecordedFieldProps {
    recordings: { letter: string; sound: string; time: number; sourceLink: string}[][];
}
export const RecordedField = ({ recordings }: RecordedFieldProps) => {
    const playRecording = (recording: { letter: string; sound: string; time: number; sourceLink: string }[]) => {
        recording.forEach(({ sound, time, sourceLink }) => {
            setTimeout(() => {
                console.log(`Playing: ${sound} at ${time}ms`);
                const audio = new Audio(sourceLink);
                audio.play().catch(err => console.error("Audio play error:", err));
            }, time);
        });
    };

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
                            className="mt-2 px-4 py-1 bg-pink-600 text-white rounded"
                            onClick={() => playRecording(recording)}
                        >
                            ▶ Play
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

