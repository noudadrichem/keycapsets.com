import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Link from 'next/link';

import ButtonLink from '../components/ButtonLink';
import Pill from '../components/Pill';
import { Keycapset, InititalState } from 'typings';
import Context from '../context';
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
        isInterestCheck
    } = keycapset;

    const state = useContext<InititalState>(Context);
    const isInFuture: boolean = moment().diff(groupbuyStartDate, 'days') < 0;
    const isTemplate = !keycapset.hasOwnProperty('_id');

    useEffect(() => {
        if (!isTemplate) {
            forceCheck();
        }
    }, [state.searchQuery])

    const [ isHovered, setHover ] = useState(false)

    return (
        <LazyLoad offset={200} height={400} once>
            <Link href="/[type]/[set]" as={`/${type}/${slug}`}>
                <div className={`image-card ${isTemplate ? 'disabled' : ''}`} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div className="image">
                        <img src={coverImageUrl === undefined || coverImageUrl === '' ? '/images/empty-base-kit-illu.svg' : coverImageUrl} />

                        <StatusLabel
                            groupbuyStartDate={groupbuyStartDate}
                            groupbuyEndDate={groupbuyEndDate}
                            isIc={isInterestCheck}
                        />
                    </div>

                    <div className="details">
                        <div className="top">
                            <h4 className="set-title"><span className="small">{type}</span> {name || 'Title goes here'}</h4>
                            <p className="light">{moment(groupbuyStartDate).format('YYYY')}</p>
                        </div>

                        <div className="bottom">
                            <p className="light">
                                {
                                    isInterestCheck ? (
                                        <>Awaiting interest check </>
                                    ) : (
                                        <>
                                            {
                                                isInFuture
                                                    ? <> Starting in <span className="bold"> {getDayDifference(groupbuyStartDate)} </span> days </>
                                                    : <>{
                                                        getDayDifference(groupbuyEndDate) > 0
                                                            ? (<>Ending in <span className="bold"> {getDayDifference(groupbuyEndDate)} </span> days</>)
                                                            : 'Ended.'
                                                    }</>
                                            }
                                        </>
                                    )
                                }
                            </p>
                            <ButtonLink isHovered={isHovered}>View this set</ButtonLink>
                        </div>
                    </div>
                </div>
            </Link>
        </LazyLoad>
    )
}

export default ImageCard;
