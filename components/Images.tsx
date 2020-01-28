import React from 'react';
import Context from '../context'
import ImageCard from './ImageCard'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FETCH_KEYCAPSET_QUERY = gql`query {
  keycapsetMany {
    _id
    name
		type
    coverImageUrl
  }
}`;

interface ImagesProps {
}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;
    const { loading, error, data } = useQuery(FETCH_KEYCAPSET_QUERY);

    if(loading || error ) return <div>error or loading</div>

    console.log( data )

    return (
        <Context.Consumer>
            {
                (state) => (
                    <div className="container images-container">
                        {data.keycapsetMany
                            .filter((keycapset) => {
                                if(state.activeTab === 'all') return true;
                                return keycapset.type === state.activeTab;
                            })
                            .map((keycapset) => {
                            const { coverImageUrl, name } = keycapset;

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

export default Images;
