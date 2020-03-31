import React, { useState } from 'react'
import '../assets/styles/input.scss';

interface InputProps {
    placeholder?: string;
    label?: string;
    type?: string;
    id?: string;
    defaultValue?: string;
    onChange?: Function;
}

function useInput(props: InputProps): any[] {
    const {
        type = 'text',
        label,
        placeholder,
        id,
        defaultValue
    } = props;
    const [value, setValue] = useState(defaultValue);

    function onInputChange(e) {
        if (type === 'checkbox') {
            setValue(e.target.checked)
        } else {
            setValue(e.target.value)
        }
    }

    const inputField: JSX.Element = (
        <div className={`input-wrapper ${type}`}>
            {label && <label htmlFor={id} className="label">{ label }</label>}
            <input
                // value={value}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onInputChange}
            />
        </div>
    )

    return [value, inputField, setValue]
}

export default useInput;
