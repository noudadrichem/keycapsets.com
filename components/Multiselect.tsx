import React from 'react';
import Select from 'react-select';

/**
 * https://react-select.com
*/

interface MultiSelectProps {
    value?: any[];
    options: any[];
    onChange: Function;
}

function MultiSelect(props: MultiSelectProps): JSX.Element {
    const { value, options, onChange }: MultiSelectProps = props;

    const selectStyles = {
        control: (base: any) => ({
            ...base,
            fontSize: 12
        }),
        menu: (base: any) => ({
            ...base,
            fontSize: 12
        })
    }

    return (
        <div className="input-wrapper">
            <label className="label">Vendors</label>
            <Select
                className="select-control"
                styles={selectStyles}
                value={value}
                onChange={(selected: string[]) => onChange(selected)}
                options={options}
                isMulti
                isSearchable
            />
        </div>
    )
}

export default MultiSelect;
