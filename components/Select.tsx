import React from 'react';

interface HeadingProps {
    onSelectChange?: Function
    values: string[]
}

function Heading(props: HeadingProps): JSX.Element {
    const { onSelectChange, values } = props;

    function selectedValues(value) {
        onSelectChange([value])
    }

    return (
        <div className="select-container">
            <select onChange={(e: any) => selectedValues(e.target.value)}>
                <option value="">Select vendors</option>
                { !!values &&
                    values.map((value: any) => (
                        <option value={value._id}>{value.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Heading;
