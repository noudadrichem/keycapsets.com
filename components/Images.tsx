import React, { useContext, useEffect } from 'react';
import { forceCheck } from 'react-lazyload';
import { Keycapset, Context } from 'typings';
import context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Filters';

interface ImagesProps {
    keycapsets: Keycapset[];
}

function Images({ keycapsets }: ImagesProps): JSX.Element {
    useEffect(() => {
        forceCheck();
    });

    return (
        <>
            <Tabs />
            <div className="images-container">
                {keycapsets.length > 0 ? (
                    keycapsets.map((keycapset: Keycapset) => <ImageCard {...{ keycapset }} key={keycapset._id} />)
                ) : (
                    <p>No keycapsets found...</p>
                )}
            </div>
        </>
    );
}

export default Images;
