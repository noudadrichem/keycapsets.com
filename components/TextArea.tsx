import React from 'react';
import { InputProps } from '../hooks/useInput';

interface TextAreaProps extends InputProps {}

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
