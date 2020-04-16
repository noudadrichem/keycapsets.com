import React, { useContext } from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';
import { getDayDifference } from './StatusLabel';

import Tabs from './Tabs';
import moment from 'moment';
import {
    INTEREST_CHECK,
    WAITING_FOR_GROUPBUY,
    IN_GROUP_BUY,
    ENDED,
} from '../constants';

interface ImagesProps {
  keycapsets: Array<Keycapset>,
  activeTab?: String,
  searchQuery?: String,
  filter?: Boolean
}

function Images(props: ImagesProps): JSX.Element {
    const {
        filters: { activeTab, availabilityFilter },
        keycapsets,
        searchQuery,
    } = useContext(Context);

    function filterByAvailability(set: Keycapset): boolean {
        if (availabilityFilter === 'none') {
            return true;
        }
        const { groupbuyEndDate, groupbuyStartDate, isInterestCheck } = set;

        switch (availabilityFilter) {
            case INTEREST_CHECK:
                return isInterestCheck;
            case WAITING_FOR_GROUPBUY:
                return (
                    moment().diff(groupbuyStartDate, 'days') < 0 &&
                    !isInterestCheck
                );
            case IN_GROUP_BUY:
                return (
                    getDayDifference(groupbuyEndDate) > 0 && !isInterestCheck
                );
            case ENDED:
                return (
                    !isInterestCheck &&
                    !(getDayDifference(groupbuyEndDate) > 0) &&
                    !(moment().diff(groupbuyStartDate, 'days') < 0)
                );
            default:
                return false;
        }
    }

    function handleFilters(keycapset: Keycapset): boolean {
        if (activeTab === 'all' && availabilityFilter === 'none') return true;
        if (activeTab === 'all') return filterByAvailability(keycapset);
        return keycapset.type === activeTab && filterByAvailability(keycapset);
    }

    return (
        <>
            <Tabs />
            <div className="images-container">
                {keycapsets.length > 0 ? (
                    keycapsets
                        .filter(handleFilters)
                        .map((keycapset: Keycapset) => (
                            <ImageCard {...{ keycapset }} key={keycapset._id} />
                        ))
                ) : (
                    <p>No keycapsets found...</p>
                )}
            </div>
        </>
    );
}

export default Images;
