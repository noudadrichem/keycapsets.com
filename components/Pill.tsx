import React, { ReactNode } from 'react'

import '../assets/styles/pill.scss';

interface PillProps {
    className?: String;
    children?: ReactNode;
}

function Pill(props: PillProps): JSX.Element {
    const { children } = props;

    return (
        <div className={`pill ${true ? 'green' : 'red'}`}>
            Available for purchase
        </div>
    )
}

export default Pill
