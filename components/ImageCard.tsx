import React, { useEffect, useState } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';
import useIsInViewport from 'use-is-in-viewport';
import { AnimatePresence, motion } from 'framer-motion';

import ButtonLink from '../components/ButtonLink';
import { Keycapset, Brand } from 'typings';
import StatusLabel from './StatusLabel';
import { BRAND_OPTIONS } from '../constants';

interface ImageCardProps {
    keycapset: Keycapset;
}

const getDayDifference = (date: any) => moment(date).diff(moment(), 'days');

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
        material,
    }: Keycapset = keycapset;
    const awaitingGroupBuy: boolean = moment().diff(groupbuyStartDate, 'days') < 0;
    const isTemplate: boolean = !keycapset.hasOwnProperty('_id');

    const [wasInViewport, setWasInViewport] = useState(false);

    const [isInViewport, containerRef] = useIsInViewport({ threshold: 1 });

    function getLabelByBrand(brandValue): string {
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
        <AnimatePresence>
            <LazyLoad offset={400} height={400} once>
                <Link href="/[type]/[set]" as={`/${type}/${slug}`}>
                    <a ref={containerRef}>
                        {wasInViewport && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`image-card ${isTemplate ? 'disabled' : ''}`}
                            >
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
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </a>
                </Link>
            </LazyLoad>
        </AnimatePresence>
    );
}

export default ImageCard;
