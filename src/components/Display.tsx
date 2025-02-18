interface DisplayProps {
    soundToDisplay: string;
    toggleRecording: () => void;
    isRecording: boolean;
}

export const Display = ({ soundToDisplay, toggleRecording, isRecording }: DisplayProps) => {
    return (
        <div>
            <div id='display'
                className='w-40 h-20 m-4 bg-gray-950 text-oldschool-green flex 
                   items-center justify-center rounded-2xl border-pink-950 border-2 ring ring-pink-900'>
                {soundToDisplay}
            </div>
            <div>
                <button id="record-button"
                    className={`w-40 h-10 mx-4 text-white cursor-pointer bg-gray-950 flex items-center
                        justify-center rounded-2xl border-pink-950 border-2 ring ring-pink-900
                        ${isRecording ? 'bg-red-600' : ''}`}
                    onClick={toggleRecording}
                >
                    {isRecording ? "Stop Recording" : "Start Recording"}
                </button>
            </div>
        </div>
    );
};

