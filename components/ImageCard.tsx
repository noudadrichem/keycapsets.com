import React, { useEffect, useContext } from 'react';
import moment from 'moment';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Link from 'next/link';

import ButtonLink from '../components/ButtonLink';
import Pill from '../components/Pill';
import { Keycapset, InititalState, Vendor } from 'typings';
import Context from '../context';
import StatusLabel from './StatusLabel';
import vendor from '../pages/upload/vendor';

interface ImageCardProps {
    title: string;
    coverImageUrl: string;
    link: string;
    type: 'vendor' | 'keycapset';
    brand?: string;
    status?: string;
    timeslot?: string;
    isTemplate?: boolean;
}

const getDayDifference = (date: any) => moment(date).diff(moment(), 'days');

function ImageCard(props: ImageCardProps): JSX.Element {
    const { title, coverImageUrl, link, type, brand, status, timeslot, isTemplate = false } = props;

    const state = useContext<InititalState>(Context);

    const isKeycapset: boolean = type === 'keycapset';
    const isVendor: boolean = type === 'vendor';
    // const isInFuture: boolean = moment().diff(groupbuyStartDate, 'days') < 0;

    useEffect(() => {
        if (!isTemplate) {
            forceCheck();
        }
    }, [state.searchQuery]);

    return (
        <LazyLoad offset={400} height={400} once>
            <Link href="/[type]/[set]" as={link}>
                <div className={`image-card ${isTemplate ? 'disabled' : ''}`}>
                    <div className="image">
                        <img className={isVendor ? 'logo' : 'set'} src={coverImageUrl} />

                        {/* <StatusLabel
                            groupbuyStartDate={groupbuyStartDate}
                            groupbuyEndDate={groupbuyEndDate}
                            isIc={isInterestCheck}
                        /> */}
                    </div>

                    <div className="details">
                        <div className="top">
                            <h4 className="set-title">
                                <span className="small">{brand}</span> {title || 'Title goes here'}
                            </h4>
                            <p className="light">{moment(timeslot).format('YYYY')}</p>
                        </div>

                        <div className="bottom">
                            <p className="light">
                                {/* {isInterestCheck ? (
                                    <></>
                                ) : (
                                    <>
                                        {isInFuture ? (
                                            <>
                                                {' '}
                                                Starting in{' '}
                                                <span className="bold">
                                                    {' '}
                                                    {getDayDifference(
                                                        groupbuyStartDate
                                                    )}{' '}
                                                </span>{' '}
                                                days{' '}
                                            </>
                                        ) : (
                                            <>
                                                {getDayDifference(
                                                    groupbuyEndDate
                                                ) > 0 ? (
                                                    <>
                                                        Ending in{' '}
                                                        <span className="bold">
                                                            {' '}
                                                            {getDayDifference(
                                                                groupbuyEndDate
                                                            )}{' '}
                                                        </span>{' '}
                                                        days
                                                    </>
                                                ) : (
                                                    'Ended.'
                                                )}
                                            </>
                                        )}
                                    </>
                                )} */}
                            </p>
                            <ButtonLink isNotALink>{isKeycapset ? 'View this set' : 'Go to vendor'}</ButtonLink>
                        </div>
                    </div>
                </div>
            </Link>
        </LazyLoad>
    );
}

export default ImageCard;
