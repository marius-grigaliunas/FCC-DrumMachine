import { useState } from 'react';
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

  const toggleRecording = () => {
    console.log(`Toggling recording. Current state:`, recordingState.isRecording);
    
    if (!recordingState.isRecording) {
      // Starting recording
      const startTime = new Date().getTime();
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
        const random = Math.random().toFixed(2)
        setRecordings(prev => [...prev, { id: `Recording ${prev.length + random}`, notes: currentRecording }]);
      }
      setRecordingState({
        isRecording: false,
        startTime: null
      });
    }
  };

  const handleDrumPadPress = (letter: string, sound: string, sourceLink: string) => {
    setCurrentSound(sound);
    console.log("Current recording state:", recordingState);
    
    if (recordingState.isRecording && recordingState.startTime !== null) {
      const timestamp = Date.now() - recordingState.startTime;
      console.log(`Adding to recording: ${letter}, ${sound}, timestamp: ${timestamp}`);
      setCurrentRecording(prev => [...prev, { letter, sound, time: timestamp, sourceLink }]);
    } else {
      console.log("Not recording, ignoring...");
    }
  };

  return (
    <>
      <div id='drum-machine' className='flex flex-row items-center justify-center w-fit self-center bg-zinc-900 p-10 rounded-2xl border border-pink-950'>
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