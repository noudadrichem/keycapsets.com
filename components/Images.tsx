import React from 'react';
import Context from '../context'
import ImageCard from './ImageCard'

interface ImagesProps {
}

function Tab(props: ImagesProps): JSX.Element {
    const {} = props;

    return (
        <Context.Consumer>
            {
                (state) => (
                    <div className="images-container">
                        {state.keycapsets.map((keycapset) => {
                            const { coverImageUrl, name } = keycapset

                            return (
                                <ImageCard src={coverImageUrl} name={name} />
                            )
                        })}
                    </div>
                )
            }
        </Context.Consumer>
    )
}

export default Tab;
