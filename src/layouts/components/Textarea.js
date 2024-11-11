import React, { useEffect, useRef, useState } from 'react'
import './../styles/Textarea.css'

function Textarea(props) {
    const max = props.max === undefined ? 150 : props.max

    const [inputValue, setInputValue] = useState('')
    const [isDroppingFile, setIsDroppingFile] = useState(false)
    const [fileSet, setFileSet] = useState([])
    const [fileBarWidth, setFileBarWidth] = useState(0)

    const barRef = useRef()
    
    const handleInputChange = (event) => {
        const newValue = event.target.value
        if (/^\s/.test(newValue) || /\s{2,}/.test(newValue) || newValue.length > max) return
        setInputValue(newValue)
        props.onChange(newValue)
    }

    const handlePaste = (event) => {
        const pastedText = inputValue + event.clipboardData.getData('text/plain')
        const cleanedText = pastedText.replace(/^\s+|\s{2,}/g, '').slice(0, max)
        setInputValue(cleanedText)
        event.preventDefault()
    }

    const disableEnter = (event) => {
        if (event.keyCode === 13) return
    }

    const handleDragOver = (event) => {
        event.preventDefault()
    }

    const handleDrop = event => {
        event.preventDefault()
        setFileSet(event.dataTransfer.files)
        props.onFilesDrop(event.dataTransfer.files)
        setIsDroppingFile(false)
    }

    const handleFileBarWidth = () => {
        setFileBarWidth(barRef.current ? barRef.current.getBoundingClientRect().width - 85 : 0)
    }

    window.onresize = () => handleFileBarWidth()

    useEffect(() => {
        handleFileBarWidth()
    }, [barRef])

    return (
        <div className='textarea__container'>
            <div className='textarea__field-set'>
                <textarea
                    className='textarea__input'
                    style={{
                        opacity: isDroppingFile ? 0 : 1,
                        zIndex: isDroppingFile ? 0 : 1,
                    }}
                    placeholder={props.placeholder || 'Type a value'}
                    value={inputValue}
                    onChange={handleInputChange}
                    onPaste={handlePaste}
                    onKeyDown={disableEnter}
                    spellCheck="false"
                />
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{
                        opacity: isDroppingFile ? 1 : 0,
                        zIndex: isDroppingFile ? 1 : 0,
                    }}
                    className='textarea__filedrop-area'
                >
                    <input id='file-input' type='file' multiple/>
                    <label className='textarea__filedrop-input' htmlFor='file-input'>{props.dropFilesLabel}</label>
                </div>
            </div>
            <div className='textarea__bottom' ref={barRef}>
                <div
                    className='textarea__icon-buttons'
                    onClick={() => setIsDroppingFile(!isDroppingFile)}
                >
                    <div style={{ opacity: isDroppingFile ? 0 : 1 }} className='textarea__icon-button --clip' />
                    <div style={{ opacity: isDroppingFile ? 1 : 0 }} className='textarea__icon-button --close' />
                </div>
                <div className='textarea__files' style={{ maxWidth: isDroppingFile ? 0 : `${fileBarWidth}px`}}>
                    {Object.values(fileSet).map((file, index) => (
                        <div key={index} className='textarea__file'>
                            <div className='textarea__file-icon'/>
                            <div className='textarea__file-name caps3'>{ file.name }</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Textarea