import create from 'zustand';

import { InititalState, Filters } from './types/interfaces';
import { User, Keycapset, Want, Collection } from './types/types';

interface Actions {
    setUser(user: User): void;
    setUserWants(userWants: Want[]): void;
    setFilters(filters: Filters): void;
    setUserCollections(collections: Collection[]): void;
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
    collections: [],
    isLoggedIn: false,
    user: null,
};

const useStore = create<InititalState & Actions>((set) => ({
    ...INITITAL_STATE,
    setUser: (user: User) => set({ user, isLoggedIn: true }),
    setUserWants: (userWants: Want[]) => set({ userWants }),
    setFilters: (filters: Filters) => set({ filters }),
    setUserCollections: (collections: Collection[]) => set({ collections }),
}));

// useStore.subscribe(console.log, (s) => s.filters);

export default useStore;
