import React, { createContext, useReducer } from 'react';
import create from 'zustand';

import { InititalState, Action, Context, Keycapset, Filters, User } from 'typings';

export const INITITAL_STATE: InititalState = {
    filters: {
        availabilityFilter: 'none',
        brandFilter: [],
        profileFilter: [],
        materialFilter: [],
    },
    keycapsets: [],
    searchQuery: '',
    allKeycapsetsCount: 0,
    userWants: [],
    isLoggedIn: false,
    user: null,
};

const useStore = create((set) => ({
    ...INITITAL_STATE,
    setUser: (user: User) => set({ user, isLoggedIn: true }),
    setUserWants: (wants: any) => set({ userWants: wants }),
}));

export default useStore;
