import DrumPad from './DrumPad';

interface DrumPadContainerProps {
    setDisplay: (sound: string) => void;
    handleDrumPadPress: (letter: string, sound: string, sourceLink: string) => void;  // Pass this function
}

export const DrumPadContainer = ({ setDisplay, handleDrumPadPress }: DrumPadContainerProps) => {
  return (
    <div 
      id='drum-pad-container'
      className='grid grid-cols-3 gap-3 w-fit mx-auto p-2 border-2 bg-gray-950
        rounded-md border-pink-950 ring ring-pink-900'
    >
      <DrumPad 
        letter="Q" 
        audioFileName="Heater 1" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3'
        updateDisplay={setDisplay} 
        handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="W" audioFileName="Heater 2" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="E" audioFileName="Heater 3" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="A" audioFileName="Heater 4" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="S" audioFileName="Heater 5" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="D" audioFileName="Heater 6" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="Z" audioFileName="Heater 7" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="X" audioFileName="Heater 8" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
      <DrumPad letter="C" audioFileName="Heater 9" 
        sourceLink='https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
        updateDisplay={setDisplay} handleDrumPadPress={handleDrumPadPress} />
    </div>
  )
}
