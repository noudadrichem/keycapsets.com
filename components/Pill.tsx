import React, { ReactNode } from 'react'

import '../assets/styles/pill.scss';

interface PillProps {
    children?: ReactNode;
    className?: string;
    color: string;
}

function Pill(props: PillProps): JSX.Element {
    const { children, color } = props;

    return (
        <div className={`pill ${color}`}>
            {
                color === 'green'
                ? 'Available for purchase right now!'
                : 'Not available for purchase'
            }
        </div>
    )
}

export default Pill
