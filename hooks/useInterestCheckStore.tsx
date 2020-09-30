import { InterestCheck, Keycapset, Question } from '../types/interfaces';
import create from 'zustand';
import next from 'next';

export enum Status {
    Start,
    Ongoing,
    Done,
}

type State = {
    keycapset: Keycapset;
    interestCheck: InterestCheck;
    question: QuestionAction;
    status: Status;
};

type QuestionAction = {
    idx: number;
    question?: Question;
    next?: number;
    previous?: number;
};

type Actions = {
    setInterestCheck(interestCheck: InterestCheck): void;
    setKeycapset(keycapset: Keycapset): void;
    setQuestion(question: QuestionAction): void;
    setStatus(status: Status): void;
    setInStore(): void;
    getFromStore(): void;
};

export const INITITAL_IC_STATE: State = {
    interestCheck: null,
    keycapset: null,
    question: null,
    status: Status.Start,
};

const useInterestCheckStore = create<State & Actions>((set, get) => ({
    ...INITITAL_IC_STATE,
    setInterestCheck: (interestCheck: InterestCheck) => set({ interestCheck }),
    setKeycapset: (keycapset: Keycapset) => set({ keycapset }),
    setQuestion: (question: any) => set({ question }),
    setStatus: (status: Status) => set({ status }),
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
