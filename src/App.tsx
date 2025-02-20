import { useState, useCallback } from 'react';
import './App.css';
import { DrumPadContainer } from './components/DrumPadContainer';
import { Display } from './components/Display';
import { RecordedField } from './components/RecordedField';
import { Note, Recording } from './components/Types';

function App() {
  const [currentSound, setCurrentSound] = useState("Display");
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [currentRecording, setCurrentRecording] = useState<Note[]>([]);
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    startTime: null as number | null
  });

  const { isRecording, startTime } = recordingState;

  const toggleRecording = useCallback(() => {
    console.log(`Toggling recording. Current state:`, isRecording);
    
    if (!isRecording) {
      // Starting recording
      const startTime = Date.now();
      setRecordingState({
        isRecording: true,
        startTime: startTime
      });
      setCurrentRecording([]);
      console.log("Starting recording with time:", startTime);
    } else {
      // Stopping recording
      console.log("Recording stopped. Captured sequence:", currentRecording);
      if (currentRecording.length > 0) {
        const random = Math.random().toFixed(2);
        setRecordings(prev => [...prev, { id: `${prev.length + random}`, name: `Recording`, notes: currentRecording }]);
      }
      setRecordingState({
        isRecording: false,
        startTime: null
      });
    }
  }, [isRecording, currentRecording]);

  const handleDrumPadPress = useCallback((letter: string, sound: string, sourceLink: string) => {
    setCurrentSound(sound);
    console.log("Current recording state:", recordingState);
    
    if (isRecording && startTime !== null) {
      const timestamp = Date.now() - startTime;
      console.log(`Adding to recording: ${letter}, ${sound}, timestamp: ${timestamp}`);
      setCurrentRecording(prev => [...prev, { letter, sound, time: timestamp, sourceLink }]);
    } else {
      console.log("Not recording, ignoring...");
    }
  }, [isRecording, startTime, recordingState]);

  return (
    <>
      <div id='drum-machine' className='flex flex-row items-center justify-center w-lg self-center bg-zinc-900 p-10 rounded-2xl border border-pink-950'>
        <DrumPadContainer setDisplay={setCurrentSound} handleDrumPadPress={handleDrumPadPress} />
        <Display 
          soundToDisplay={currentSound} 
          toggleRecording={toggleRecording} 
          isRecording={recordingState.isRecording} 
        />
      </div>
      <RecordedField 
          recordings={recordings}
          setRecordings={setRecordings} />
    </>
  );
}

export default App;