import { useState } from 'react'
import DrumPad from './components/DrumPad'
import './App.css'

function App() {

  return (
    <>
      <div id='drum-machine'>
        <div id='drum-pad-container'>
          <DrumPad 
            letter="Q"
            audioFileName="Heater 1"
          />
        </div>
        <div id='display'>
        </div>
      </div>
    </>
  )
}

export default App
