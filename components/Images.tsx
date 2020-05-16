import React, { useEffect } from 'react';
import { forceCheck } from 'react-lazyload';
import { Keycapset } from 'typings';
import ImageCard from './ImageCard';

interface ImagesProps {
    keycapsets: Keycapset[];
}

function Images({ keycapsets }: ImagesProps): JSX.Element {
    useEffect(() => {
        forceCheck();
    });

    return (
        <div className="images-container">
            {keycapsets.length > 0 ? (
                keycapsets.map((keycapset: Keycapset) => <ImageCard {...{ keycapset }} key={keycapset._id} />)
            ) : (
                <p>No keycapsets found...</p> // TODO cool illustration here
            )}
        </div>
    );
}

export default Images;
