import React from 'react';
import MultiSelect from './Multiselect';

interface HeadingProps {
    onSelectChange?: Function;
    values: { value; label }[];
    label?: string;
    name?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { onSelectChange, values, label, name } = props;

    return (
        <div className="input-wrapper-select">
            <MultiSelect label={label} options={values} onChange={onSelectChange} />
        </div>
    );
}

export default Heading;
