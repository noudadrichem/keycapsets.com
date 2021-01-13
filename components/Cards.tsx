import React, { useEffect, useState } from 'react';
import { forceCheck } from 'react-lazyload';
import { Waypoint } from 'react-waypoint';

import ImageCard from './ImageCard';
import { useQuery, NetworkStatus } from '@apollo/client';
import { FETCH_KEYCAPSET_QUERY } from '../queries';
import LoadingKeyboardIllustration from './LoadingKeyboardIllustration';
import { Keycapset } from '../types/types';

interface CardsProps {
    keycapsets: Keycapset[];
}

function Cards(props: CardsProps): JSX.Element {
    const { keycapsets } = props;

    return (
        <div className="images-container">
            {keycapsets.length > 0 ? (
                keycapsets.map((keycapset: Keycapset, idx: number) => (
                    <ImageCard {...{ keycapset }} key={keycapset._id} />
                ))
            ) : (
                <p>No keycapsets found...</p> // TODO cool illustration here
            )}
        </div>
    );
}

export default Cards;
