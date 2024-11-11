import React, { useState } from 'react'
import './../styles/Input.css'

function Input(props){
    const [inputValue, setInputValue] = useState('')
    const max = props.max === undefined ? 50 : props.max

    const handleInputChange = (event) => {
        const newValue = event.target.value
        if (/^\s/.test(newValue) || /\s{2,}/.test(newValue) || newValue.length > max) return
        setInputValue(newValue)
        props.onChange(newValue)
    }

    const handlePaste = (event) => {
        const pastedText = event.clipboardData.getData('text/plain')
        const cleanedText = pastedText.replace(/^\s+|\s{2,}/g, '').slice(0, max)
        setInputValue(cleanedText)
        event.preventDefault()
    }

    return (
        <input
            value={inputValue}
            className='input'
            type='text'
            placeholder={
                props.choosedMethod === 'email' ? 'Email address' :
                props.choosedMethod === 'whatsapp' ? 'Telephone number' :
                props.choosedMethod === 'telegram' ? 'User ID' :
                props.placeholder || 'Enter a value'}
            onChange={handleInputChange}
            onPaste={handlePaste}
            style={{
                padding: props.choosedMethod === null || props.choosedMethod === 'other' ? 0 : '0 24px'
            }}
            spellCheck="false"
        />
    )
}

export default Input