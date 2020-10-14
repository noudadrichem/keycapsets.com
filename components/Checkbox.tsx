import React, { SyntheticEvent } from 'react';

export type CheckboxValue = {
    id?: string;
    label?: string;
    checked: boolean;
};

interface CheckboxProps {
    label?: string;
    checked: boolean;
    getVal(val: CheckboxValue): void | CheckboxValue;
    id?: string | number;
    className?: string;
    size?: 's' | 'm' | 'l';
}

const Checkbox: React.ElementType = ({ checked, getChecked, size = 'm' }: any) => (
    <div className="input-checkbox-container">
        <input type="checkbox" className={`input-checkbox-input`} onChange={(e) => getChecked(e.target.checked)} />
        <div className={`input-checkbox-styled ${checked ? 'checked' : ''} ${size}`}>
            <svg className={`input-checkbox-check-icon ${checked ? 'checked' : ''} ${size}`} viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        </div>
    </div>
);

export default function CheckboxContainer(props: CheckboxProps): JSX.Element {
    const { checked, getVal, label, id, className, size } = props;

    function getResponse(checked: boolean) {
        return getVal({
            id,
            label,
            checked,
        });
    }

    return (
        <div className={`input-wrapper checkbox ${className}`}>
            <label className="label">
                <Checkbox size={size} checked={checked} getChecked={(isChecked: boolean) => getResponse(isChecked)} />
                <span className="text">{label}</span>
            </label>
        </div>
    );
}
