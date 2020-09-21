import create from 'zustand';

import { InititalState, Filters, User } from 'typings';

export const INITITAL_STATE: InititalState = {
    filters: {
        availability: 'none',
        name: '',
        brand: [],
        type: [],
        material: [],
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
    setUserWants: (userWants: any) => set({ userWants }),
    setFilters: (filters: Filters) => set({ filters }),
}));

// useStore.subscribe(console.log, (s) => s.filters);

export default useStore;
