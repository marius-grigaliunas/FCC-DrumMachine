import { useState } from 'react'
import './App.css'
import { DrumPadContainer } from './components/DrumPadContainer'
import { Display } from './components/Display'
import { RecordedField } from './components/RecordedField'

function App() {
  const [currentSound, setCurrentSound] = useState("Display")

  //make a midi board funtionality, where you can record the sounds you made and let them play on loop.
  //in the display you can see all the recordings and you can individually turn them off or delete


  return (
    <>
      <div id='drum-machine'
      className='flex flex-row items-center justify-center w-fit self-center
        bg-zinc-900 p-10 rounded-2xl border border-pink-950'
      >
        <DrumPadContainer
          setDisplay={setCurrentSound}
        />
        <Display
          soundToDisplay={currentSound}
        />
      </div>
      <RecordedField/>
    </>
  )
}

export default App
