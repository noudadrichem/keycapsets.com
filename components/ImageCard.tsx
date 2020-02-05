import React from 'react';
import moment from 'moment';

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
        <div className="image-card">
            <div className="image">
                <img src={coverImageUrl} />
                <Pill color={isInFuture ? 'red' : 'green'} />
            </div>

            <div className="details">

                <div className="horizontal">
                    <div className="left">
                        <h4 className="">{name}</h4>

                        <div>
                            {
                                isInFuture
                                ? <>
                                    Starting in
                                    <span className="bold"> {getDayDifference(groupbuyStartDate)} </span>
                                    days
                                </>
                                : <>
                                    Ending in
                                    <span className="bold"> {getDayDifference(groupbuyEndDate)} </span>
                                    days
                                </>
                            }
                        </div>
                    </div>

                    <div className="right">
                        <ButtonLink href="/[type]/[set]" as={`/${type}/${slug}`}>View this set</ButtonLink>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ImageCard;
