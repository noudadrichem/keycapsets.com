import React, { HTMLProps, LegacyRef } from 'react';

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    reference?: LegacyRef<HTMLTextAreaElement>;
    autoFocus?: boolean;
    onChange: any;
}

function TextArea(props: TextAreaProps): JSX.Element {
    const { label, id, onChange, defaultValue, placeholder, reference, className, autoFocus } = props;
    return (
        <div className={`input-wrapper textarea ${className}`}>
            {label && (
                <label htmlFor={id} className="label">
                    {label}
                </label>
            )}
            <textarea
                className="input"
                onChange={(e) => onChange(e.target.value as any)}
                defaultValue={defaultValue}
                name={id}
                id={id}
                placeholder={placeholder}
                ref={reference}
                autoFocus
            />
        </div>
    );
}

export default TextArea;
