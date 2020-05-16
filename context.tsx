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
    user: {
        _id: null,
        name: null,
        email: null,
        locked: true,
        geekhackUserName: null,
        redditUserName: null,
        avatar: null,
        locale: null,
        slug: null,
        isVendor: false,
        isDesigner: false,
    },
};

const context = createContext<any>(INITITAL_STATE);
const StateProvider = ({ children }) => {
    const isBrowser: boolean = typeof window !== `undefined`;
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

    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export { context, StateProvider };
export default context;
