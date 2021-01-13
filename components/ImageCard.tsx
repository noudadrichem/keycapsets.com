import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Link from 'next/link';
import useIsInViewport from 'use-is-in-viewport';

import { Keycapset } from '../types/types';
import { SelectOption } from '../types/interfaces';
import StatusLabel from './StatusLabel';
import { BRAND_OPTIONS } from '../constants';
import LikeSet from './LikeSet';
import { getLabelByBrand } from '../utils/labels';

export interface ImageCardProps {
    keycapset: Keycapset;
}

function ImageCard(props: ImageCardProps): JSX.Element {
    const { keycapset } = props;
    const {
        name,
        coverImageUrl,
        type,
        brand,
        slug,
        groupbuyStartDate,
        groupbuyEndDate,
        isInterestCheck,
    }: Keycapset = keycapset;
    const isTemplate: boolean = !keycapset.hasOwnProperty('_id');

    const [wasInViewport, setWasInViewport] = useState(false);
    const [isInViewport, containerRef] = useIsInViewport({ threshold: 5 });

    useEffect(() => {
        if (isInViewport) {
            setWasInViewport(true);
        }
    }, [isInViewport]);

    return (
        <Link href={`/set/${slug}`}>
            <a ref={containerRef}>
                {wasInViewport && (
                    <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
                        <div className="image-card-image">
                            <img
                                className="image-card-image-set"
                                src={
                                    coverImageUrl === undefined || coverImageUrl === ''
                                        ? '/images/empty-base-kit-illu.svg'
                                        : coverImageUrl
                                }
                            />
                        </div>
                        <div className="image-card-details">
                            <div className="top">
                                <h4 className="set-title">{name || 'Title goes here'}</h4>
                                <StatusLabel
                                    groupbuyStartDate={groupbuyStartDate}
                                    groupbuyEndDate={groupbuyEndDate}
                                    isIc={isInterestCheck}
                                />
                            </div>

                            <div className="bottom">
                                <span className="bold">
                                    <span>
                                        {getLabelByBrand(brand)} {type && type.toUpperCase()}
                                    </span>
                                    <span>{moment(groupbuyStartDate).format('YYYY')}</span>
                                </span>
                                <span>
                                    <LikeSet keycapset={keycapset} />
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </a>
        </Link>
    );
}

export default ImageCard;
