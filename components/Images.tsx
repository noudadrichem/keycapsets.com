import React from 'react';
import Context from '../context'
import ImageCard from './ImageCard'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FETCH_KEYCAPSET_QUERY = gql`
query FETCH_KEYCAPSET_QUERY {
  keycapsets {
     _id
    name
    type
    coverImageUrl
    slug
  }
}`;

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
                                .map((keycapset) => {
                                    const { coverImageUrl, name, type, slug } = keycapset;

                                    return <ImageCard slug={slug} type={type} src={coverImageUrl} name={name} key={slug} />
                                })}
                        </div>
                    )
                }
            }
        </Context.Consumer>
    )
}

export default Images;
