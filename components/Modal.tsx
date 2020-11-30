import React, { ReactChildren, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import useModalStore from '../hooks/useModalStore';

ReactModal.setAppElement('#__next');

export default function Modal() {
    const current = useModalStore((s) => s.current);
    const { open, close } = useModalStore((s) => s.controls);
    const isOpen = useModalStore((s) => s.isOpen);

    useEffect(() => {
        if (current !== null) {
            open();
        } else {
            close();
        }
    }, [current]);

    function afterOpen() {
        console.log('modal is openend...');
    }

    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={afterOpen}
            onRequestClose={close}
            className="modal"
            overlayClassName="modal-overlay"
        >
            {current}
        </ReactModal>
    );
}
