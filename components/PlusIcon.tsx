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
            xmlns="http://www.w3.org/2000/svg"
            style={{
                transform: `rotate(${rotation}deg)`,
            }}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    );
}
