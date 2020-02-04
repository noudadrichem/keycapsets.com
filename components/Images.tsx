import React from 'react';
import Context from '../context'
import ImageCard from './ImageCard'

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;

    return (
        <Context.Consumer>
            {
                (state) => {

                    return (
                        <div className="container images-container">
                            {state.keycapsets
                                .filter((keycapset) => {
                                    if (state.activeTab === 'all') return true;
                                    return keycapset.type === state.activeTab;
                                })
                                .map((keycapset) => <ImageCard {...{keycapset}} key={keycapset._id} />)}
                        </div>
                    )
                }
            }
        </Context.Consumer>
    )
}

export default Images;
