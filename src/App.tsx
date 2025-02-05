import { useState } from 'react'
import DrumPad from './components/DrumPad'
import './App.css'

function App() {
  const [currentSound, setCurrentSound] = useState("")


  return (
    <>
      <div id='drum-machine'>
        <div id='drum-pad-container'>
          <DrumPad 
          letter="Q" 
          audioFileName="Heater 1" 
          sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
          updateDisplay={setCurrentSound}
          />
        </div>
        <div id='display'>
          {currentSound}
        </div>
      </div>
    </>
  )
}

export default App
