import React, { useEffect, useState } from 'react'
import '../assets/styles/input.scss';
import useInput from '../hooks/useInput';

interface InputProps {
    label?: string;
    onChange: Function;

}

function multipleInputsHook(props: InputProps): JSX.Element {
    const { label, onChange } = props;
    const [inputs, setInputs] = useState([{ type: 'text', id: 0 }, { type: 'text', id: 1 }])

    function addInput() {
        setInputs([...inputs, { type: 'text', id: inputs.length }]);
    }

    function getAllInputValues(id, e) {
        const inputValues: string[] = []
        document.querySelectorAll('.multiple-inputs-input').forEach((input: any) => {
            inputValues.push(input.value)
        })
        onChange(inputValues)
    }

    return (
        <div className="multiple-input-container">
            <label>{label}</label>
            { inputs.length < 11 && <button onClick={addInput}>+</button>}
            {
                inputs.map((inputProps: any) => (
                    <>
                        <input className="multiple-inputs-input" onChange={(e: any) => getAllInputValues(e.target.id, e)} {...inputProps} />
                        <br/
                    ></>
                ))
            }
        </div>
    )
}

export default multipleInputsHook;
