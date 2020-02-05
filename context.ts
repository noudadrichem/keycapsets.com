import { createContext } from 'react';
import moment from 'moment';

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj
    }
    console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState)
    return reducedState;
}

export const INITITAL_STATE: any = {
    activeTab: 'all',
    tabs: [],
    keycapsets: [],
    searchQuery: ''
}

const Context = createContext(undefined);

export default Context;
