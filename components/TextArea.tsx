import React, { HTMLProps, LegacyRef } from 'react';

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    reference?: LegacyRef<HTMLTextAreaElement>;
    autoFocus?: boolean;
}

function TextArea(props: TextAreaProps): JSX.Element {
    const { label, id, onChange, defaultValue, placeholder, reference, className } = props;
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
            />
        </div>
    );
}

export default TextArea;
