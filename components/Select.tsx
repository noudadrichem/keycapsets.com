import React from 'react';
import '../assets/styles/input.scss';

interface HeadingProps {
    onSelectChange?: Function;
    values: string[];
    label?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { onSelectChange, values, label } = props;

    function selectedValues(value) {
        onSelectChange([value])
    }

    return (
        <div className="input-wrapper-select">
            <label className="label">{label}</label>
            <select className="input" onChange={(e: any) => selectedValues(e.target.value)}>
                <option value="">Select vendors</option>
                { !!values &&
                    values.map((value: any) => (
                        <option key={value._id} value={value._id}>{value.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Heading;
