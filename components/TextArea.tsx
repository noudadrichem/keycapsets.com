import React, { HTMLProps, LegacyRef } from 'react';

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    reference?: LegacyRef<HTMLTextAreaElement>;
    autoFocus?: boolean;
    errorMessage?: string;
}

function TextArea(props: TextAreaProps): JSX.Element {
    const {
        label,
        id,
        onChange,
        defaultValue,
        placeholder,
        reference,
        className,
        autoFocus = false,
        errorMessage,
    } = props;
    return (
        <div className={`input-wrapper textarea ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <textarea
                className="input"
                onChange={onChange}
                defaultValue={defaultValue}
                name={id}
                id={id}
                placeholder={placeholder}
                ref={reference}
                autoFocus={autoFocus}
            />

            {errorMessage && <p className="error-message red">{errorMessage}</p>}
        </div>
    );
}

export default TextArea;
