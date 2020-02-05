import React from 'react';
import Context from '../context'
import ImageCard from './ImageCard'
import { Keycapset } from 'typings';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;

    return (
        <Context.Consumer>
            {
                (state) => {
                    return (
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
                    )
                }
            }
        </Context.Consumer>
    )
}

export default Images;
