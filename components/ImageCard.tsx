import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
import Link from 'next/link';

import ButtonLink from '../components/ButtonLink';
import { Keycapset } from 'typings';
import StatusLabel from './StatusLabel';

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
        slug,
        groupbuyStartDate,
        groupbuyEndDate,
        isInterestCheck,
    }: Keycapset = keycapset;
    const isInFuture: boolean = moment().diff(groupbuyStartDate, 'days') < 0;
    const isTemplate: boolean = !keycapset.hasOwnProperty('_id');

    return (
        <LazyLoad offset={400} height={400}>
            <Link href="/set/[set]" as={`/set/${slug}`}>
                <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
                    <div className="image">
                        <img
                            src={
                                coverImageUrl === undefined || coverImageUrl === ''
                                    ? '/images/empty-base-kit-illu.svg'
                                    : coverImageUrl
                            }
                        />
                        <StatusLabel
                            groupbuyStartDate={groupbuyStartDate}
                            groupbuyEndDate={groupbuyEndDate}
                            isIc={isInterestCheck}
                        />
                        ß
                    </div>

                    <div className="details">
                        <div className="top">
                            <h4 className="set-title">
                                <span className="small">{type}</span>
                                {name || 'Title goes here'}
                            </h4>
                            <p className="light">{moment(groupbuyStartDate).format('YYYY')}</p>
                        </div>

                        <div className="bottom">
                            <p className="light">
                                {isInterestCheck ? (
                                    <></>
                                ) : (
                                    <>
                                        {isInFuture ? (
                                            <>
                                                Starting in{' '}
                                                <span className="bold">{getDayDifference(groupbuyStartDate)}</span> days
                                            </>
                                        ) : (
                                            <>
                                                {getDayDifference(groupbuyEndDate) > 0 ? (
                                                    <>
                                                        Ending in{' '}
                                                        <span className="bold">
                                                            {getDayDifference(groupbuyEndDate)}
                                                        </span>{' '}
                                                        days
                                                    </>
                                                ) : (
                                                    'Ended.'
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </p>
                            <ButtonLink href="/[type]/[set]" as={`/${type}/${slug}`}>
                                View this set
                            </ButtonLink>
                        </div>
                    </div>
                </div>
            </Link>
        </LazyLoad>
    );
}

export default ImageCard;
