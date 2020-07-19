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
            {/* <select className="input" onChange={(e: any) => onSelectChange(e.target.value)}>
                <option value="">{name}</option>
                {!!values &&
                    values.map((value: any) => (
                        <option key={value.id} value={value.id}>
                            {value.name}
                        </option>
                    ))}
            </select> */}
        </div>
    );
}

export default Heading;
