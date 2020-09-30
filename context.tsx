import create from 'zustand';

import { InititalState, Filters, User, Keycapset } from './types/interfaces';

interface Actions {
    setUser(user: User): void;
    setUserWants(userWants: Keycapset[]): void;
    setFilters(filters: Filters): void;
}

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

const useStore = create<InititalState & Actions>((set) => ({
    ...INITITAL_STATE,
    setUser: (user: User) => set({ user, isLoggedIn: true }),
    setUserWants: (userWants: Keycapset[]) => set({ userWants }),
    setFilters: (filters: Filters) => set({ filters }),
}));

// useStore.subscribe(console.log, (s) => s.filters);

export default useStore;
