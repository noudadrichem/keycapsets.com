import React, { useState } from 'react';
import '../assets/styles/input.scss';

interface InputProps {
    placeholder?: string;
    label?: string;
    type?: string;
    id?: string;
    defaultValue?: string;
    onChange?: Function | any;
    reference?: any;
    className?: string;
}

function Input(props: InputProps): JSX.Element {
    const { type = 'text', label, id, onChange, defaultValue, placeholder, reference, className } = props;
    return (
        <div className={`input-wrapper ${type} ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <input
                onChange={onChange}
                defaultValue={defaultValue}
                name={id}
                id={id}
                type={type}
                placeholder={placeholder}
                ref={reference}
            />
        </div>
    );
}

function useInput(props: InputProps): any[] {
    const { type = 'text', label, placeholder, id, defaultValue = '' } = props;
    const [value, setValue] = useState(defaultValue);

    function onInputChange(e) {
        if (type === 'checkbox') {
            setValue(e.target.checked);
        } else {
            setValue(e.target.value);
        }
    }

    // TODO refactor this to use upper compootje
    const inputField: JSX.Element = (
        <div className={`input-wrapper ${type}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <input
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
export { useInput, Input };
export default useInput;
