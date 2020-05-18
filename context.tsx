import React, { createContext, useReducer } from 'react';
import { InititalState, Action, Context, Keycapset, Filters } from 'typings';
import { useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';

export const INITITAL_STATE: InititalState = {
    filters: {
        availabilityFilter: 'none',
        brandFilter: [],
        profileFilter: [],
        materialFilter: [],
    },
    keycapsets: [],
    fetchedKeycapsetsLength: 0,
    searchQuery: '',
    allKeycapsetsCount: 0,
    isLoggedIn: false,
    userWants: [],
};

const context = createContext<any>(INITITAL_STATE);
const StateProvider = ({ children }) => {
    const isBrowser: boolean = typeof window !== `undefined`;
    const [state, dispatch]: any[] = useReducer((state: InititalState, action: Action) => {
        switch (action.type) {
            case 'set':
                // console.log('set...', action.payload)
                const setNewState: InititalState = {
                    ...state,
                    ...action.payload,
                };
                return setNewState;
            case 'user':
                const withUserState: InititalState = {
                    ...state,
                    isLoggedIn: true,
                    user: action.payload.user,
                };
                console.log('trigger user actions');
                return withUserState;
            default:
                return state;
        }
    }, INITITAL_STATE);

    // if (isBrowser) {
    //     if (process.env.NODE_ENV === 'development') {
    //         console.log(moment().format('hh:mm:ss') + '_STATE...', state);
    //     }
    // }
    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export { context, StateProvider };
export default context;
