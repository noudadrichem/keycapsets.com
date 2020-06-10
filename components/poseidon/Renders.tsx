import React, { ReactNode } from 'react';

interface Renders {
    renders: string[];
}

function Renders(props: Renders): JSX.Element {
    const { renders } = props;

    return (
        <div className="renders">
            {renders.map((render) => (
                <img src={render} />
            ))}
        </div>
    );
}

export default Renders;
