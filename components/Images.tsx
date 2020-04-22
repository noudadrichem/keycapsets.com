import React, { useContext } from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Filters';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const { filteredSets } = useContext(Context);

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
