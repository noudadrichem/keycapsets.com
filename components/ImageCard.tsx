import React from 'react';
import moment from 'moment';
import LazyLoad from 'react-lazyload';

import ButtonLink from '../components/ButtonLink';
import Pill from '../components/Pill';
import { Keycapset } from 'typings';

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
        groupbuyEndDate
    } = keycapset;

    const isInFuture: Boolean = moment().diff(groupbuyStartDate, 'days') < 0;

    return (
        <LazyLoad offset={100}>
            <div className="image-card">
                <div className="image">
                    <img src={coverImageUrl === undefined || coverImageUrl === '' ? '/images/empty-base-kit-illu.svg' : coverImageUrl} />
                    {!isInFuture && <Pill color='green' />}
                </div>

                <div className="details">

                    <div className="horizontal">
                        <div className="left">
                        <div className="title-container">
                                <h4 className="">{name || 'Title goes here'}</h4>
                                <p className="light">{ moment(groupbuyStartDate).format('YYYY') }</p>
                            </div>

                            <p className="light">
                                {
                                    isInFuture
                                    ? <> Starting in <span className="bold"> {getDayDifference(groupbuyStartDate)} </span> days </>
                                    : <>{
                                        getDayDifference(groupbuyEndDate) > 0
                                        ? (<>
                                            Ending in <span className="bold"> {getDayDifference(groupbuyEndDate)} </span> days
                                        </>)
                                        : 'Ended.'
                                    }</>
                                }
                            </p>
                        </div>

                        <div className="right">
                            <ButtonLink href="/[type]/[set]" as={`/${type}/${slug}`}>View this set</ButtonLink>
                        </div>
                    </div>

                </div>
            </div>
        </LazyLoad>
    )
}

export default ImageCard;
