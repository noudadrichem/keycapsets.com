import React, { useEffect, useState } from 'react';
import '../assets/styles/input.scss';
import Button from './Button';

interface InputProps {
    label?: string;
    onChange: Function;
    shouldReset?: boolean;
}

const GET_INPUT_TEMPLATE = (id: Number) => ({
    type: 'text',
    placeholder: 'https://....',
    id,
});

function multipleInputsHook(props: InputProps): JSX.Element {
    const { label, onChange, shouldReset = false } = props;
    const [inputs, setInputs] = useState([GET_INPUT_TEMPLATE(0)]);
    const [inputValues, setInputValues] = useState(['']);

    useEffect(() => {
        if (shouldReset) {
            resetInputs();
        }
    }, [shouldReset]);

    function addInput() {
        setInputs([...inputs, GET_INPUT_TEMPLATE(inputs.length)]);
    }

    function getAllInputValues(id, e) {
        const tempValues: string[] = [];
        document.querySelectorAll('.multiple-inputs-input').forEach((input: any) => {
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
            {inputs.map((inputProps: any) => (
                <input
                    key={inputProps.id}
                    className="multiple-inputs-input"
                    onChange={(e: any) => getAllInputValues(e.target.id, e)}
                    {...inputProps}
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
