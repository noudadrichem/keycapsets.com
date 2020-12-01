import React from 'react';
import create from 'zustand';
import ContactForm from '../components/ContactForm';

type State = {
    current: JSX.Element;
    isOpen: boolean;
};

export enum Modals {
    Contact,
}

type Actions = {
    openModal(key: Modals): void;
    controls: {
        open(): any;
        close(): any;
        toggle(): any;
    };
};

const INITITAL_MODAL_STATE: State = {
    current: null,
    isOpen: false,
};

const useModalStore = create<State & Actions>((set, get) => ({
    ...INITITAL_MODAL_STATE,
    openModal: (key: Modals) => {
        const current = {
            [Modals.Contact]: <ContactForm />,
        }[key];

        set({ current, isOpen: true });
    },
    controls: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false, current: null }),
        toggle: () => set({ isOpen: !get().isOpen }),
    },
}));

export default useModalStore;
