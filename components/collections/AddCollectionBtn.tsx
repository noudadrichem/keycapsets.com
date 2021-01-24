import React from 'react';
import useModalStore, { Modals } from '../../hooks/useModalStore';
import Plus from '../PlusIcon';

export type AddCollectionBtnProps = {
    className?: string;
};

export default function AddCollectionBtn(props: AddCollectionBtnProps) {
    const openModal = useModalStore((state) => state.openModal);

    return (
        <span className={`add-collection-btn ${props.className}`} onClick={() => openModal(Modals.CreateCollection)}>
            <Plus size={11} color="#364154" rotation={45} />
            Add collection
        </span>
    );
}
