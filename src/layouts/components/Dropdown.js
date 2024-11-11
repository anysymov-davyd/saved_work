import React, { useState } from 'react'
import './../styles/Dropdown.css'

function Dropdown({ placeholder, optionSet = [], onChoosedMethod, onChange }){
    const ITEM_HEIGHT = 56 // in pixels
    const [isOpened, handleIsOpened] = useState(false)
    const [currentOption, handleCurrenOption] = useState('')

    const setCurrentOption = value => {
        handleCurrenOption(value)
        onChange(value)
        if(onChoosedMethod !== undefined) onChoosedMethod(value)
        handleIsOpened(false)
    }

    return (
        <div className='dropdown'>
            <input type='hidden' value={currentOption}/>
            <label
                onClick={() => handleIsOpened(!isOpened)}
                style={{ color: currentOption.length > 0 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'}}
                className={`dropdown__value ${isOpened ? '--opened' : null}`}
            >{ currentOption.length > 0 ? currentOption : placeholder }</label>
            {optionSet.length > 0 && (
                <div
                    style={{
                        maxHeight: isOpened ? `${ITEM_HEIGHT * optionSet.length}px` : 0,
                        overflowY: optionSet.length > 3 ? 'auto' : 'hidden'
                    }}
                    className='dropdown__options'
                >
                    { optionSet.map((option, index) => 
                        <div
                            key={index}
                            className='dropdown__option'
                            style={{ minHeight: `${ITEM_HEIGHT}px` }}
                            onClick={() => setCurrentOption(option)}
                        >
                            { option }
                        </div>
                    ) }
                </div>
            )}
        </div>
    )
}

export default Dropdown