import React, { useEffect, useState } from 'react';
import Button from './Button';

interface InputProps {
    label?: string;
    onChange: Function;
    shouldReset?: boolean;
}

interface InputTemplate {
    type: string;
    placeholder: string;
    id: number;
}

const GET_INPUT_TEMPLATE = (id: number): InputTemplate => ({
    type: 'text',
    placeholder: 'https://....',
    id,
});

function multipleInputsHook(props: InputProps): JSX.Element {
    const { label, onChange, shouldReset = false } = props;
    const [inputs, setInputs] = useState<InputTemplate[]>([GET_INPUT_TEMPLATE(0)]);
    const [inputValues, setInputValues] = useState(['']);

    useEffect(() => {
        if (shouldReset) {
            resetInputs();
        }
    }, [shouldReset]);

    function addInput() {
        setInputs((prev) => [...prev, GET_INPUT_TEMPLATE(prev.length)]);
    }

    function getAllInputValues(id: string, e: React.ChangeEvent) {
        const tempValues: string[] = [];
        document.querySelectorAll<HTMLInputElement>('.multiple-inputs-input').forEach((input) => {
            tempValues.push(input.value);
        });
        setInputValues(tempValues);
        onChange(inputValues);
    }

    function resetInputs() {
        setInputs([]);
        setTimeout(() => {
            // what is this? It works loll
            setInputs([GET_INPUT_TEMPLATE(0)]);
        });
    }

    return (
        <div className="input-wrapper-multiple">
            <label className="label">{label}</label>
            {inputs.map(({ id, ...rest }) => (
                <input
                    key={id}
                    className="multiple-inputs-input"
                    onChange={(e: React.ChangeEvent) => getAllInputValues(e.target.id, e)}
                    {...rest}
                />
            ))}
            {inputs.length < 11 && (
                <Button onClick={addInput} variant="primary" size="sm" className="primary">
                    +
                </Button>
            )}
        </div>
    );
}

export default multipleInputsHook;
