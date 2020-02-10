import React from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';

import Tabs from './Tabs';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;

    return (
        <Context.Consumer>
            {
                (state) => {
                    return (
                        <>
                            <Tabs />

                            <div className="images-container">

                                {state.keycapsets
                                    .filter((keycapset: Keycapset) => {
                                        if (state.activeTab === 'all') return true;
                                        return keycapset.type === state.activeTab;
                                    })
                                    .filter((keycapset: Keycapset) => {
                                        return keycapset.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                                    })
                                    .map((keycapset: Keycapset) => <ImageCard {...{keycapset}} key={keycapset._id} />)}

                            </div>
                        </>
                    )

                }
            }

        </Context.Consumer>
    )
}

export default Images;
