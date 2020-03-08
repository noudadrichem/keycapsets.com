import React, { useContext } from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Tabs';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;
    const {
        keycapsets,
        activeTab,
        searchQuery
    } = useContext(Context);

    return (
        <>
            <Tabs />

            <div className="images-container">
                {
                    keycapsets
                    .filter((keycapset: Keycapset) => {
                        if (activeTab === 'all') return true;
                        return keycapset.type === activeTab;
                    })
                    .filter((keycapset: Keycapset) => keycapset.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((keycapset: Keycapset) =>
                        <ImageCard {...{keycapset}} key={keycapset._id} />
                    )
                }
            </div>
        </>
    )
}

export default Images;
