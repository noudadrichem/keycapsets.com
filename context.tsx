import React, { createContext, useReducer } from 'react';
import { InititalState, Action, Context, Keycapset, Filters } from 'typings';

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

const context = createContext<Context>({ state: null, dispatch: null });
const StateProvider = ({ me, children }) => {
    console.log('hello from state prov', { user: me !== null ? me : {} });
    const [state, dispatch]: any[] = useReducer((state: InititalState, action: Action) => {
        switch (action.type) {
            case 'set':
                const setNewState: InititalState = {
                    ...state,
                    user: me !== null ? me : {},
                    isLoggedIn: me !== null,
                    ...action.payload,
                };
                return setNewState;
            case 'user':
                const withUserState: InititalState = {
                    ...state,
                    isLoggedIn: true,
                    user: action.payload.user,
                };
                return withUserState;
            default:
                return state;
        }
    }, INITITAL_STATE);

    return <context.Provider value={{ state, dispatch }}>{children}</context.Provider>;
};

export { context, StateProvider };
export default context;
