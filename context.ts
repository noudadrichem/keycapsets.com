import { createContext } from 'react';
import moment from 'moment';
import { InititalState } from 'typings';

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj
    }
    if (process.env.NODE_ENV === 'development') {
        console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState)
    }
    return reducedState;
}

export const INITITAL_STATE: InititalState = {
    activeTab: 'all',
    tabs: ['all', 'gmk', 'pbt', 'sa', 'dsa', 'kat', 'jtk', 'kam'],
    keycapsets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
    setGlobalState: () => {}
}

const Context = createContext(INITITAL_STATE);

export default Context;
