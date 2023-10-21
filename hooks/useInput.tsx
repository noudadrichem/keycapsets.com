import React, { useState, useRef, useEffect, HTMLProps, LegacyRef, ChangeEvent } from 'react';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    reference?: LegacyRef<HTMLInputElement>;
    autoFocus?: boolean;
    icon?: any;
    errorMessage?: string;
}

function Input(props: InputProps & HTMLProps<HTMLInputElement>): JSX.Element {
    const { type = 'text', label, id, onChange, defaultValue, placeholder, reference, className, errorMessage } = props;
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
            {errorMessage && <p className="error-message red">{errorMessage}</p>}
        </div>
    );
}

function useInput(props: InputProps) {
    const { type = 'text', label, placeholder, id, defaultValue = '', autoFocus, icon } = props;
    const [value, setValue] = useState(defaultValue);
    const input = useRef(null);

    function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (type === 'checkbox') {
            setValue((e.target.checked as any) as typeof defaultValue);
        } else {
            setValue(e.target.value);
        }
    }

    useEffect(() => {
        if (autoFocus) {
            //FIXME: IF isBrowser is not used is best to remove it
            // const isBrowser = typeof window !== `undefined`;
            if (window.innerWidth > 768) {
                input.current.focus();
            }
        }
    }, []);

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
