import React, { useState, useRef, useEffect, HTMLProps, LegacyRef, ChangeEvent } from 'react';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    reference?: LegacyRef<HTMLInputElement>;
    autoFocus?: boolean;
    icon?: any;
    errorMessage?: string;
}

function Input(props: InputProps & HTMLProps<HTMLInputElement>): JSX.Element {
    const { type = 'text', label, id, onChange, defaultValue, placeholder, reference, className, errorMessage, ...otherProps } = props;
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
                    {...otherProps}
                />
            </div>
            {errorMessage && <p className="error-message red">{errorMessage}</p>}
        </div>
    );
}

function useInput(props: InputProps) {
    const { type = 'text', label, placeholder, id, defaultValue = '', autoFocus, icon } = props;
    const [value, setValue] = useState(defaultValue);
    let inputRef = useRef(null);

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'checkbox') {
            setValue((e.target.checked as any) as typeof defaultValue);
        } else {
            setValue(e.target.value);
        }
    }

    useEffect(() => {
        if (autoFocus) {
            if (window.innerWidth > 768) {
                setTimeout(() => {
                    console.log('focus....', inputRef);
                    inputRef.current.focus();
                }, 500);
            }
        }
    }, [autoFocus]);

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
                    ref={inputRef}
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
