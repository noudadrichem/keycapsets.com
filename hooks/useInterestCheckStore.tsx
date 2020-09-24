import { InterestCheck, Keycapset } from 'typings';
import create from 'zustand';

type State = {
    keycapset: Keycapset;
    interestCheck: InterestCheck;
    nextQuestionId: string;
    previousQuestionId: string;
    currentIdx: number;
};

type Actions = {
    setInterestCheck(interestCheck: InterestCheck): void;
    setKeycapset(keycapset: Keycapset): void;
    setNextQuestionId(nextQuestionId: string): void;
    setPrevQuestionId(previousQuestionId: string): void;
    setInStore(): void;
    getFromStore(): void;
    setQuestionIdx(idx: number): void;
};

export const INITITAL_IC_STATE: State = {
    interestCheck: null,
    keycapset: null,
    currentIdx: 0,
    nextQuestionId: null,
    previousQuestionId: null,
};

const useInterestCheckStore = create<State & Actions>((set, get) => ({
    ...INITITAL_IC_STATE,
    setInterestCheck: (interestCheck: InterestCheck) => set({ interestCheck }),
    setKeycapset: (keycapset: Keycapset) => set({ keycapset }),
    setNextQuestionId: (nextQuestionId: string) => set({ nextQuestionId }),
    setPrevQuestionId: (previousQuestionId: string) => set({ previousQuestionId }),
    setQuestionIdx: (idx: number) => set({ currentIdx: idx }),
    getFromStore: () => {
        const hasPersistedStore = window.localStorage.getItem('IC');
        if (hasPersistedStore) {
            const deserialized = JSON.parse(hasPersistedStore);
            console.log('set in store...', deserialized);
            set({ ...deserialized });
        }
    },
    setInStore: () => {
        const serializedStore = JSON.stringify(get());
        window.localStorage.setItem('IC', serializedStore);
    },
}));

export default useInterestCheckStore;
