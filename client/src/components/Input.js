import React from 'react'

export const Input = ({ name, handleInput, placeholder }) => {
    return (
        <div>
            <input className='border-2 border-secondary py-2 px-6 w-full rounded-lg' placeholder={placeholder} name={name} onChange={handleInput} />
        </div>
    )
}
