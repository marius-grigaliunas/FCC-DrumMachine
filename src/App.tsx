import { useState } from 'react'
import './App.css'
import { DrumPadContainer } from './components/DrumPadContainer'

function App() {
  const [currentSound, setCurrentSound] = useState("Display")

  //make a midi board funtionality, where you can record the sounds you made and let them play on loop.
  //in the display you can see all the recordings and you can individually turn them off or delete


  return (
    <>
      <div id='drum-machine'
      className='flex flex-row items-center justify-center w-fit self-center'
      >
        <DrumPadContainer
          setDisplay={setCurrentSound}
        />
        <div id='display'
        className='w-40 h-20 m-4 bg-green-900 flex items-center justify-center rounded-2xl border-2 '
        >
          {currentSound}
        </div>
      </div>
    </>
  )
}

export default App
