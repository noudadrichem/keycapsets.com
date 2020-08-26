import React, { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageModalProps {
    src?: String;
    className?: String;
    isFullWidth?: boolean;
}

function ImageModal(props: ImageModalProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const modalRef = useRef(null);
    const imageRef = useRef(null);
    const { src } = props;

    const getStylingData = ({ current }) => ({
        position: current.getBoundingClientRect(),
        height: current.clientHeight,
        width: current.clientWidth,
    });

    useEffect(() => {
        if (open) {
            const { height, width, position } = getStylingData(imageRef);
            const { current: modalImage } = modalRef;

            modalImage.style.transitionDuration = '0s';
            modalImage.style.width = width + 'px';
            modalImage.style.top = position.y + 'px';
            modalImage.style.left = position.x + 'px';

            window.setTimeout(() => {
                modalImage.style.opacity = '1';
                modalImage.style.transitionDuration = '';
                modalImage.style.width = '';
                modalImage.style.height = '';
                modalImage.style.left = '';
                modalImage.style.top = '';
            }, 100);
        }
    }, [open]);

    const onClose = () => {
        const { height, width, position } = getStylingData(imageRef);
        const { current: modalImage } = modalRef;

        modalRef.current.style.width = width + 'px';
        modalRef.current.style.top = position.y + 'px';
        modalRef.current.style.left = position.x + 'px';

        modalImage.addEventListener('transitionend', function transitionEnd() {
            if (!open) {
                return;
            }

            setOpen(false);
            modalImage.removeEventListener('transitionend', transitionEnd);
        });
    };

    return (
        <React.Fragment>
            {open
                ? createPortal(
                      <div className="image-modal" onClick={() => onClose()}>
                          <img src={src} ref={modalRef} />
                      </div>,
                      document.body
                  )
                : null}
            <img ref={imageRef} onClick={() => setOpen(true)} src={src} />
        </React.Fragment>
    );
}

ImageModal.defaultProps = {};

export default ImageModal;
