import { createContext } from 'react';
import moment from 'moment';
import content from './content.js';
console.log(content)

export function reduceState(state, obj) {
    const reducedState = {
        ...state,
        ...obj
    }
    console.log(moment().format('hh:mm:ss') + '_STATE...', reducedState)
    return reducedState;
}

export const INITITAL_STATE = {
    activeTab: 'gmk',
    ...content
}

const Context = createContext(undefined);

export default Context;
