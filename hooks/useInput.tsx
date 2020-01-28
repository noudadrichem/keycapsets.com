import React, { useState } from 'react'
import '../assets/styles/input.scss';

interface InputProps {
    placeholder?: string;
    label?: string;
    type?: string;
    id?: string;
    defaultValue?: string;
}

function useInput(props: InputProps): any[] {
    const {
        type = 'text',
        label,
        placeholder,
        id,
        defaultValue
    } = props
    const [value, setValue] = useState(defaultValue)

    const inputField: JSX.Element = (
        <div className="input">
            <div className="input-wrapper">
                <label className="label">{ label }</label>
                <input
                    value={value}
                    name={id}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        </div>
    )

    return [value, inputField, setValue]
}

export default useInput;
