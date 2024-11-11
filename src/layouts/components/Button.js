import './../styles/Button.css'

function Button({ value, onClick }){
    return (
        <button onClick={e => {
            e.preventDefault()
            onClick()
        }} className='button'>{ value }</button>
    )
}

export default Button