import React, { ReactNode } from 'react';

import '../assets/styles/pill.scss';

interface PillProps {
    children?: ReactNode;
    className?: string;
    color: string;
    text?: string;
}

function Pill(props: PillProps): JSX.Element {
    const { children, text, color = 'gray' } = props;

    return (
        <div className={`pill ${color}`}>
            {children}
            <span className="bold">{text}</span>
        </div>
    );
}

export default Pill;
