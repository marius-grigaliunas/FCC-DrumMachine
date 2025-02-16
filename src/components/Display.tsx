
interface DisplayProps {
    soundToDisplay : string
}

export const Display = ({soundToDisplay}:DisplayProps) => {
  
  
    return (
        <div>
            <div id='display'
            className='w-40 h-20 m-4 bg-gray-950 text-oldschool-green flex 
                   items-center justify-center rounded-2xl border-pink-950 border-2 ring ring-pink-900'>
                {soundToDisplay}
            </div>
            <div>
                <button id="record-button" 
                className="w-40 h-10 mx-4 text-white cursor-pointer bg-gray-950 flex items-center
                    justify-center rounded-2xl border-pink-950 border-2 ring ring-pink-900">
                    record
                </button>
            </div>
        </div>
    )
}
