import { createContext } from 'react';
import moment from 'moment';
import { InititalState } from 'typings';
import {
    PROFILE_OPTIONS,
    INTEREST_CHECK,
    WAITING_FOR_GROUPBUY,
    IN_GROUP_BUY,
    ENDED
} from './constants';

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj,
    };
    if (process.env.NODE_ENV === 'development') {
        console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState);
    }
    return reducedState;
}

export const INITITAL_STATE: InititalState = {
    filters: {
        activeTab: 'all',
        availabilityFilter: 'none',
    },
    tabs: ['all', 'gmk', 'pbt', 'sa', 'dsa', 'kat', 'jtk', 'kam', 'dcs'],
    availability: [INTEREST_CHECK, WAITING_FOR_GROUPBUY, IN_GROUP_BUY, ENDED],
    // tabs: PROFILE_OPTIONS.map(o => o.label),
    keycapsets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
    setGlobalState: () => {},
};

const Context = createContext(INITITAL_STATE);

export default Context;
