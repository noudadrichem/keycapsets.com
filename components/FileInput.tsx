import React from 'react';

interface FileInputProps {
    label?: string;
    onChange: Function;
    hideInput?: boolean;
}

function FileInput(props: FileInputProps) {
    const { label, onChange, hideInput = false } = props;

    return (
        <div className="input-wrapper">
            <label htmlFor="fileInput" className="label">{ label && label }</label>
            <input
                style={{ display: hideInput && 'none'}}
                id="fileInput"
                type="file"
                onChange={e => {
                    onChange(e.target.files);
                }}
            />
        </div>
    )
}

export default FileInput;
