import React, { useContext } from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Tabs';

interface ImagesProps {
  keycapsets: Array<Keycapset>,
  activeTab?: String,
  searchQuery?: String,
  filter?: Boolean
}

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
    );2
}

export default Images;
