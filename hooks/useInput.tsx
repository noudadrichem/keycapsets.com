import React, { useState, useRef, useEffect, HTMLProps, LegacyRef, ChangeEvent } from 'react';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    reference?: LegacyRef<HTMLInputElement>;
    autoFocus?: boolean;
    icon: any;
}

function Input(props: InputProps & HTMLProps<HTMLInputElement>): JSX.Element {
    const { type = 'text', label, id, onChange, defaultValue, placeholder, reference, className } = props;
    return (
        <div className={`input-wrapper ${type} ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}

            <div>
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
        </div>
    );
}

function useInput(props: InputProps) {
    const { type = 'text', label, placeholder, id, defaultValue = '', autoFocus, icon } = props;
    const [value, setValue] = useState(defaultValue);
    const input = useRef(null);

    console.log('use input icon...', icon);

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'checkbox') {
            setValue((e.target.checked as unknown) as typeof defaultValue);
        } else {
            setValue(e.target.value);
        }
    }

    useEffect(() => {
        if (autoFocus) {
            const isBrowser = typeof window !== `undefined`;
            if (window.innerWidth > 768) {
                input.current.focus();
            }
        }
    });

    const inputField: JSX.Element = (
        <div className={`input-wrapper ${type}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}

            <div className="input-container">
                {icon}
                <input
                    className={icon !== undefined ? 'has-icon' : ''}
                    ref={input}
                    onChange={onInputChange}
                    defaultValue={value}
                    name={id}
                    id={id}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    return [value, inputField, setValue];
}
export { useInput, Input };
export default useInput;
