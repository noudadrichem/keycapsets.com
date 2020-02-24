import React from 'react';
import '../assets/styles/input.scss';

interface HeadingProps {
    onSelectChange?: Function;
    values: { id, name }[];
    label?: string;
    name?: string;
}

function Heading(props: HeadingProps): JSX.Element {
    const { onSelectChange, values, label, name } = props;

    return (
        <div className="input-wrapper-select">
            { !!label && <label className="label">{label}</label>}
            <select className="input" onChange={(e: any) => onSelectChange(e.target.value)}>
                <option value="">{name}</option>
                { !!values &&
                    values.map((value: any) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Heading;
