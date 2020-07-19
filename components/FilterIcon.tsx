import React from 'react';

interface FilterIconProps {
    width?: number;
    height?: number;
    isDisabled?: boolean;
}

function FilterIcon(props: FilterIconProps): JSX.Element {
    const { width = 12, height = 11, isDisabled } = props;
    return (
        <svg
            width={width}
            height={height}
            className={`filter-icon ${isDisabled ? 'disabled' : ''}`}
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0H12V1.71429H0V0Z" fill="#566073" />
            <path d="M2.57143 4.28571H9.42857V6H2.57143V4.28571Z" fill="#566073" />
            <path d="M4.28571 8.57143H7.71429V10.2857H4.28571V8.57143Z" fill="#566073" />
        </svg>
    );
}

export default FilterIcon;
