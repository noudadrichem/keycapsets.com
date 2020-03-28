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
    const [evt, setEvt] = useState({});

    function onInputChange(e) {
        setValue(e.target.value)
        setEvt(e);
    }

    const inputField: JSX.Element = (
        <div className="input-wrapper">
            { label && <label className="label">{ label }</label>}
            <input
                value={value}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onInputChange}
            />
        </div>
    )

    return [value, inputField, setValue, evt]
}

export default useInput;
