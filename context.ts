import { createContext } from 'react';
import moment from 'moment';
import { InititalState, Filters, Keycapset } from 'typings';

import { AVAILABILITY, TABS, BRAND_OPTIONS } from './constants';
import { getDayDifference } from './components/StatusLabel';
import { INTEREST_CHECK, WAITING_FOR_GROUPBUY, IN_GROUP_BUY, ENDED } from './constants';

function filterByAvailability(set: Keycapset, availabilityFilter: string): boolean {
    if (availabilityFilter === 'none') {
        return true;
    }
    const { groupbuyEndDate, groupbuyStartDate, isInterestCheck } = set;

    switch (availabilityFilter) {
        case INTEREST_CHECK:
            return isInterestCheck;
        case WAITING_FOR_GROUPBUY:
            return moment().diff(groupbuyStartDate, 'days') < 0 && !isInterestCheck;
        case IN_GROUP_BUY:
            return getDayDifference(groupbuyEndDate) > 0 && !isInterestCheck;
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

function filterByBrand(set: Keycapset, brandFilter: string[] = []): boolean {
    return brandFilter.length === 0 || brandFilter.includes(set.brand);
}

function handleFilters(keycapset: Keycapset, filters: Filters): boolean {
    // This part is just an old way of filtering, should be dismissed
    if (filters.activeTab !== 'all' && keycapset.type !== filters.activeTab) {
        return false;
    }

    // Check for availability filter
    if (!filterByAvailability(keycapset, filters.availabilityFilter)) {
        return false;
    }

    // Check for brand filter
    if (!filterByBrand(keycapset, filters.brandFilter)) {
        return false;
    }

    return true;
}

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj,
    };
    if (process.env.NODE_ENV === 'development') {
        console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState);
    }
    return {
        ...reducedState,
        filteredSets: reducedState.keycapsets.filter((set) => handleFilters(set, reducedState.filters)),
    };
}

export const INITITAL_STATE: InititalState = {
    filters: {
        activeTab: 'all',
        availabilityFilter: 'none',
        brandFilter: [],
    },
    tabs: TABS,
    availability: AVAILABILITY,
    brand: BRAND_OPTIONS,
    keycapsets: [],
    filteredSets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
    setGlobalState: () => {},
};

const Context = createContext(INITITAL_STATE);

export default Context;
