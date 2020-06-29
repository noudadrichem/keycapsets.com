import React, { Profiler } from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

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

    function getLabelByBrand(brandValue): string {
        const brand: Brand = BRAND_OPTIONS.find((brand: Brand) => brand.value === brandValue);
        if (brand) {
            return brand.label;
        }
    }

    return (
        <LazyLoad offset={400} height={400}>
            <Link href="/[type]/[set]" as={`/${type}/${slug}`}>
                <a>
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
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </LazyLoad>
    );
}

export default ImageCard;
