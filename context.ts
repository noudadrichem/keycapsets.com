import { createContext } from 'react';
import moment from 'moment';
import { InititalState, Filters, Keycapset } from 'typings';

import { AVAILABILITY, TABS } from './constants';
import { getDayDifference } from './components/StatusLabel';
import { INTEREST_CHECK, WAITING_FOR_GROUPBUY, IN_GROUP_BUY, ENDED } from './constants';

function filterByAvailability(set: Keycapset, availability: string): boolean {
    if (availability === 'none') {
        return true;
    }
    const { groupbuyEndDate, groupbuyStartDate, isInterestCheck } = set;

    switch (availability) {
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

function handleFilters(keycapset: Keycapset, filters: Filters): boolean {
    if (filters.activeTab === 'all' && filters.availability === 'none') return true;
    if (filters.activeTab === 'all') return filterByAvailability(keycapset, filters.availability);
    return keycapset.type === filters.activeTab && filterByAvailability(keycapset, filters.availability);
}

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj,
    };
    const filteredReducedState = {
        ...reducedState,
        filteredSets: reducedState.keycapsets.filter((set) => handleFilters(set, reducedState.filters)),
    };
    if (process.env.NODE_ENV === 'development') {
        console.log(moment().format('hh:mm:ss') + '_STATE...', filteredReducedState);
    }
    return filteredReducedState;
}

export const INITITAL_STATE: InititalState = {
    filters: {
        activeTab: 'all',
        availability: 'none',
    },
    tabs: TABS,
    availability: AVAILABILITY,
    keycapsets: [],
    filteredSets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
    setGlobalState: () => {},
};

const Context = createContext(INITITAL_STATE);

export default Context;
