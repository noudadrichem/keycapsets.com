import React, { useState, useRef, useEffect } from 'react';

interface InputProps {
    placeholder?: string;
    label?: string;
    type?: string;
    id?: string;
    defaultValue?: string;
    onChange?: Function;
    autoFocus?: boolean;
}

function useInput(props: InputProps): any[] {
    const { type = 'text', label, placeholder, id, defaultValue = '', autoFocus } = props;
    const [value, setValue] = useState(defaultValue);
    const input = useRef(null);

    function onInputChange(e) {
        if (type === 'checkbox') {
            setValue(e.target.checked);
        } else {
            setValue(e.target.value);
        }
    }

    useEffect(() => {
        if (autoFocus) {
            input.current.focus();
        }
    });

    const inputField: JSX.Element = (
        <div className={`input-wrapper ${type}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <input
                ref={input}
                onChange={onInputChange}
                defaultValue={value}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );

    return [value, inputField, setValue];
}

export default useInput;
