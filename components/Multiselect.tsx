import React, { CSSProperties, useEffect, useState } from 'react';
import Select from 'react-select';
import { SelectOption } from '../types/interfaces';

/**
 * https://react-select.com
 */

interface MultiSelectProps<T> {
    value?: T[];
    options: T[];
    onChange: Function;
    isMulti?: boolean;
    label: string;
    defaultValue?: T[];
}

function MultiSelect<T>(props: MultiSelectProps<T>): JSX.Element {
    const { value, options, onChange, isMulti, label, defaultValue }: MultiSelectProps<T> = props;
    const [val, setVal] = useState(value);

    useEffect(() => {
        setVal(defaultValue);
    }, [defaultValue]);

    const SELECT_STYLES = {
        control: (base: CSSProperties) => ({
            ...base,
            fontSize: 12,
            borderColor: '#e2e5eb',
        }),
        menu: (base: CSSProperties) => ({
            ...base,
            fontSize: 12,
        }),
    };

    return (
        <div className="input-wrapper">
            {label && <label className="label">{label}</label>}
            <Select
                isSearchable
                id={label}
                instanceId={label}
                className="select-control"
                styles={SELECT_STYLES}
                value={val}
                onChange={(selected: SelectOption[]) => onChange(selected || [])}
                options={options}
                isMulti={isMulti}
                defaultValue={defaultValue || options[0]}
            />
        </div>
    );
}

export default MultiSelect;
