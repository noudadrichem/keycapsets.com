import React, { createContext, useReducer } from 'react';
import { InititalState, Action, Context, Keycapset, Filters } from 'typings';
import moment from 'moment';

import { INTEREST_CHECK, WAITING_FOR_GROUPBUY, IN_GROUP_BUY, ENDED } from './constants';
import { getDayDifference } from './components/StatusLabel';

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

function filterByBrand(set: Keycapset, brandFilter: string[]): boolean {
    return brandFilter.length === 0 || brandFilter.includes(set.brand);
}
function filterByProfile(set: Keycapset, profileFilter: string[]): boolean {
    return profileFilter.length === 0 || profileFilter.includes(set.type);
}
function filterByMaterial(set: Keycapset, materialFilter: string[]): boolean {
    return materialFilter.length === 0 || materialFilter.includes(set.material);
}

function handleFilters(keycapset: Keycapset, filters: Filters): boolean {
    if (!filterByAvailability(keycapset, filters.availabilityFilter)) {
        return false;
    }
    if (!filterByBrand(keycapset, filters.brandFilter)) {
        return false;
    }
    if (!filterByProfile(keycapset, filters.profileFilter)) {
        return false;
    }
    if (!filterByMaterial(keycapset, filters.materialFilter)) {
        return false;
    }
    return true;
}

export const INITITAL_STATE: InititalState = {
    filters: {
        availabilityFilter: 'none',
        brandFilter: [],
        profileFilter: [],
        materialFilter: [],
    },
    // availability: AVAILABILITY,
    // brands: BRAND_OPTIONS,
    // profiles: PROFILE_OPTIONS,
    // materials: MATERIAL_OPTIONS,
    keycapsets: [],
    filteredSets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
};

const context = createContext<any>(INITITAL_STATE);
const StateProvider = ({ children }) => {
    let [state, dispatch]: any[] = useReducer((state: InititalState, action: Action) => {
        switch (action.type) {
            case 'set':
                const newState: InititalState = {
                    ...state,
                    ...action.payload,
                };
                return newState;
            default:
                return state;
        }
    }, INITITAL_STATE);
    if (process.env.NODE_ENV === 'development') {
        console.log(moment().format('hh:mm:ss') + '_STATE...', state);
    }

    // TODO: This way to add filtered sets might be a bit ugly, yes?
    state = {
        ...state,
        filteredSets: state.keycapsets.filter((set: Keycapset) => handleFilters(set, state.filters)),
    };
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export { context, StateProvider };
export default context;
