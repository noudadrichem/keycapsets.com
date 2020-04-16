import React, { SyntheticEvent } from 'react';

interface CheckboxProps {
    label?: string;
    checked: boolean;
    getVal: Function;
}

const Checkbox: React.ElementType = ({ checked, getVal }: CheckboxProps) => (
    <div className="input-checkbox-container">
        <input type="checkbox" className="input-checkbox-input" onChange={(e) => getVal(e.target.checked)} />
        <div className={`input-checkbox-styled ${checked ? 'checked' : ''}`}>
            <svg className={`input-checkbox-check-icon ${checked ? 'checked' : ''}`} viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
    </div>
);

function CheckboxContainer(props: CheckboxProps): JSX.Element {
    const { checked, getVal, label } = props;

    return (
        <div className="input-wrapper checkbox">
            <label className="label">
                <Checkbox checked={checked} getVal={(isChecked) => getVal(isChecked)} />
                {label}
            </label>
        </div>
    );
}

export default CheckboxContainer;
