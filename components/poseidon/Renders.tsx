import React, { ReactNode } from 'react';
import ImageModal from '../ImageModal';

interface Renders {
    renders: string[];
}

function Renders(props: Renders): JSX.Element {
    const { renders } = props;

    return (
        <div className="renders">
            {renders.map((render) => (
                <ImageModal src={render} />
            ))}
        </div>
    );
}

export default Renders;
