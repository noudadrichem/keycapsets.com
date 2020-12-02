import React from 'react';

export interface PlusProps {
    rotation?: number;
    size?: number;
    color?: string;
}

export default function Plus(props: PlusProps) {
    const { rotation = 0, size = 16, color = '#566073' } = props;
    return (
        <svg
            className="icon plus"
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.7002 3.70018L10.2999 10.2998"
                stroke="#566073"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.7002 10.2998L10.2999 3.70018"
                stroke="#566073"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
