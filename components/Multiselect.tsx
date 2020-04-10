import React from 'react';
import Select from 'react-select';

/**
 * https://react-select.com
*/

interface MultiSelectProps {
    value?: any[];
    options: any[];
    onChange: Function;
    isMulti?: boolean;
    label: String
    defaultValue?: any;
}

function MultiSelect(props: MultiSelectProps): JSX.Element {
    const {
        value,
        options,
        onChange,
        isMulti,
        label,
        defaultValue
    }: MultiSelectProps = props;

    const SELECT_STYLES = {
        control: (base: any) => ({
            ...base,
            fontSize: 12,
            borderColor: '#e2e5eb'
        }),
        menu: (base: any) => ({
            ...base,
            fontSize: 12
        })
    }

    return (
        <div className="input-wrapper">
            <label className="label">{label}</label>
            <Select
                id={label}
                className="select-control"
                styles={SELECT_STYLES}
                value={value}
                onChange={(selected: string[]) => onChange(selected)}
                options={options}
                isMulti={isMulti}
                isSearchable
                defaultValue={defaultValue || options[0]}
            />
        </div>
    )
}

export default MultiSelect;
