import React, { useEffect, useState } from 'react'
import '../assets/styles/input.scss';
import useInput from '../hooks/useInput';
import Button from './Button';

interface InputProps {
    label?: string;
    onChange: Function;
}

const GET_INPUT_TEMPLATE = (id: Number) => ({ type: 'text', placeholder: 'https://....', id });

function multipleInputsHook(props: InputProps): JSX.Element {
    const { label, onChange } = props;
    const [inputs, setInputs] = useState([GET_INPUT_TEMPLATE(0)])

    function addInput() {
        setInputs([...inputs, GET_INPUT_TEMPLATE(inputs.length)]);
    }

    function getAllInputValues(id, e) {
        const inputValues: string[] = []
        document.querySelectorAll('.multiple-inputs-input').forEach((input: any) => {
            inputValues.push(input.value)
        })
        onChange(inputValues)
    }

    return (
        <div className="input-wrapper-multiple">
            <label className="label">{label}</label>
            {
                inputs.map((inputProps: any) => <input className="input" onChange={(e: any) => getAllInputValues(e.target.id, e)} {...inputProps} /> )
            }
            {inputs.length < 11 && (
                <Button
                    onClick={addInput}
                    variant="primary"
                    size="sm"
                    className='primary'
                >
                    +
                </Button>
            )}
        </div>
    )
}

export default multipleInputsHook;
