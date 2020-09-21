import { InterestCheck, Keycapset } from 'typings';
import create from 'zustand';

export type ICStore = {
    keycapset: Keycapset;
    interestCheck: InterestCheck;
    nextQuestionId: string;
    setInterestCheck?(interestCheck: InterestCheck): void;
    setKeycapset?(keycapset: Keycapset): void;
    setNextQuestionId?(nextQuestionId: string): void;
};

export const INITITAL_IC_STATE: ICStore = {
    interestCheck: null,
    keycapset: null,
    nextQuestionId: null,
};

const useInterestCheckStore = create((set) => ({
    ...INITITAL_IC_STATE,
    setInterestCheck: (interestCheck: InterestCheck) => set({ interestCheck }),
    setKeycapset: (keycapset: Keycapset) => set({ keycapset }),
    setNextQuestionId: (nextQuestionId: string) => set({ nextQuestionId }),
}));

export default useInterestCheckStore;
