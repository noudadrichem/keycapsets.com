import create from 'zustand';

import { InititalState, Filters } from './types/interfaces';
import { User, Keycapset } from './types/types';

interface Actions {
    setUser(user: User): void;
    setUserWants(userWants: Keycapset[]): void;
    setFilters(filters: Filters): void;
    setDarkMode(darkmode: boolean): void;
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
    isDarkMode: null,
};

const useStore = create<InititalState & Actions>((set) => ({
    ...INITITAL_STATE,
    setUser: (user: User) => set({ user, isLoggedIn: true }),
    setUserWants: (userWants: Keycapset[]) => set({ userWants }),
    setFilters: (filters: Filters) => set({ filters }),
    setDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
}));

export default useStore;
