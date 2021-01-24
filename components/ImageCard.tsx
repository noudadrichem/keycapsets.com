import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import useIsInViewport from 'use-is-in-viewport';

import { Keycapset } from '../types/types';
import StatusLabel from './StatusLabel';
import LikeSet from './LikeSet';
import { getLabelByBrand } from '../utils/labels';
import CollectionHandler from './collections/CollectionHandler';

export interface ImageCardProps {
    keycapset: Keycapset;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { keycapset } = props;
    const { name, coverImageUrl, type, brand, slug, groupbuyStartDate, groupbuyEndDate, isInterestCheck } = keycapset;
    const isTemplate: boolean = !keycapset.hasOwnProperty('_id');

    const [wasInViewport, setWasInViewport] = useState(false);
    const [isInViewport, containerRef] = useIsInViewport({ threshold: 5 });

    useEffect(() => {
        if (isInViewport) {
            setWasInViewport(true);
        }
    }, [isInViewport]);

    return (
        <a ref={containerRef}>
            {wasInViewport && (
                <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
                    <div className="image-card-image">
                        <Link href={`/set/${slug}`}>
                            <img
                                className="image-card-image-set"
                                src={
                                    coverImageUrl === undefined || coverImageUrl === '' ? '/images/empty-base-kit-illu.svg' : coverImageUrl
                                }
                            />
                        </Link>
                    </div>
                    <div className="image-card-details">
                        <Link href={`/set/${slug}`}>
                            <div className="top">
                                <h4 className="set-title">{name || 'Title goes here'}</h4>
                                <StatusLabel
                                    groupbuyStartDate={groupbuyStartDate}
                                    groupbuyEndDate={groupbuyEndDate}
                                    isIc={isInterestCheck}
                                />
                            </div>
                        </Link>

                        <div className="bottom">
                            <span className="bold">
                                <span>
                                    {getLabelByBrand(brand)} {type && type.toUpperCase()}
                                </span>
                                <span>{moment(groupbuyStartDate).format('YYYY')}</span>
                            </span>
                            <span className="actions">
                                <CollectionHandler setId={keycapset._id} />
                                <LikeSet keycapset={keycapset} />
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </a>
    );
}

export default ImageCard;
