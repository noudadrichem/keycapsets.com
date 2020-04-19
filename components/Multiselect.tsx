import React from 'react';
import Select from 'react-select';

/**
 * https://react-select.com
 */

interface MultiSelectProps<T> {
    value?: T[];
    options: T[];
    onChange: Function;
    isMulti?: boolean;
    label: String;
    defaultValue?: T;
}

function MultiSelect<T>(props: MultiSelectProps<T>): JSX.Element {
    const { value, options, onChange, isMulti, label, defaultValue }: MultiSelectProps<T> = props;

    const SELECT_STYLES = {
        control: (base: any) => ({
            ...base,
            fontSize: 12,
            borderColor: '#e2e5eb',
        }),
        menu: (base: any) => ({
            ...base,
            fontSize: 12,
        }),
    };

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
                defaultValue={isMulti ? defaultValue : defaultValue || options[0]}
            />
        </div>
    );
}

export default MultiSelect;
