import React, { useContext, useEffect } from 'react';
import { forceCheck } from 'react-lazyload';
import { Keycapset, Context } from 'typings';
import context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Filters';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const { state } = useContext<Context>(context);
    const { filteredSets } = state;

    useEffect(() => {
        forceCheck();
    });

    return (
        <>
            <Tabs />
            <div className="images-container">
                {filteredSets.length > 0 ? (
                    filteredSets.map((keycapset: Keycapset) => <ImageCard {...{ keycapset }} key={keycapset._id} />)
                ) : (
                    <p>No keycapsets found...</p>
                )}
            </div>
        </>
    );
}

export default Images;
