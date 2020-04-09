import React, { useContext } from 'react';
import { Keycapset } from 'typings';
import Context from '../context';
import ImageCard from './ImageCard';
import { getDayDifference } from './StatusLabel'

import Tabs from './Tabs';
import moment from 'moment';

interface ImagesProps {}

function Images(props: ImagesProps): JSX.Element {
    const {} = props;
    const {
        filters: {
            activeTab,
            availabilityFilter,
        },
        keycapsets,
        searchQuery
    } = useContext(Context);

    const filterByAvailability = (set: Keycapset): boolean => {
        if(availabilityFilter === 'none') {
            return true
        }
        const {groupbuyEndDate, groupbuyStartDate, isInterestCheck} = set;

        switch (availabilityFilter){
        case 'ic':
            return isInterestCheck;
        case 'waiting':
            return moment().diff(groupbuyStartDate, 'days') < 0 && !isInterestCheck;
        case 'gb':
            return getDayDifference(groupbuyEndDate) > 0 && !isInterestCheck;
        case 'ended':
            return !isInterestCheck 
                && !(getDayDifference(groupbuyEndDate) > 0) 
                &&  !(moment().diff(groupbuyStartDate, 'days') < 0) 
        default:
            return false
        }
    }

    return (
        <>
            <Tabs />
            <div className="images-container">
                { keycapsets.length > 0 ?
                    (
                    keycapsets
                        .filter((keycapset: Keycapset) => {
                            if (activeTab === 'all' && availabilityFilter === 'none') return true;
                            if(activeTab === 'all') return filterByAvailability(keycapset);
                            return keycapset.type === activeTab && filterByAvailability(keycapset);
                        })
                        // .filter((keycapset: Keycapset) => keycapset.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((keycapset: Keycapset) =>
                            <ImageCard {...{ keycapset }} key={keycapset._id} />
                        )
                    )
                    : <p>No keycapsets found...</p>
                }
            </div>
        </>
    )
}

export default Images;
