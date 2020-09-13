import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import Link from 'next/link';
import useIsInViewport from 'use-is-in-viewport';
import { AnimatePresence, motion } from 'framer-motion';

import { Keycapset, Brand, Context } from 'typings';
import StatusLabel from './StatusLabel';
import { BRAND_OPTIONS } from '../constants';
import LikeSet from './LikeSet';

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

    function getLabelByBrand(brandValue: any): string {
        const brand: Brand = BRAND_OPTIONS.find((brand: Brand) => brand.value === brandValue);
        if (brand) {
            return brand.label;
        }
    }

    useEffect(() => {
        if (isInViewport) {
            setWasInViewport(true);
        }
    }, [isInViewport]);

    return (
        // <AnimatePresence>
        <Link href="/set/[set]" as={`/set/${slug}`}>
            <a ref={containerRef}>
                {wasInViewport && (
                    // <motion.div
                    //     initial={{
                    //         opacity: 0,
                    //     }}
                    //     animate={{
                    //         opacity: 1,
                    //     }}
                    //     className={`image-card ${isTemplate ? 'disabled' : ''}`}
                    // >
                    <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
                        <div className="image">
                            <img
                                className="set"
                                src={
                                    coverImageUrl === undefined || coverImageUrl === ''
                                        ? '/images/empty-base-kit-illu.svg'
                                        : coverImageUrl
                                }
                            />
                        </div>
                        <div className="details">
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
                                {/*
                                <span>
                                    <LikeSet keycapset={keycapset} />
                                </span> */}
                            </div>
                        </div>
                    </div>
                )}
            </a>
        </Link>
        // </AnimatePresence>
    );
}

export default ImageCard;
