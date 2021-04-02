import React, { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import LoadingKeyboard from './LoadingKeyboardIllustration';

interface ImageModalProps {
    src?: string;
    className?: string;
    isFullWidth?: boolean;
    alt?: string;
}

function ImageModal(props: ImageModalProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const [loaded, setLoading] = useState(false);
    const modalRef = useRef(null);
    const imageRef = useRef(null);
    const { src } = props;

    const getStylingData = ({ current }) => ({
        left: current.offsetLeft - current.parentElement.parentElement.offsetLeft,
        top: current.offsetTop,
        height: current.clientHeight,
        width: current.clientWidth,
        rect: current.getBoundingClientRect(),
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop: window.pageYOffset || document.documentElement.scrollTop,
    });

    useEffect(() => {
        if (open && loaded) {
            const { height, width, left, top, rect, scrollTop, scrollLeft } = getStylingData(imageRef);

            const { current: modalImage } = modalRef;

            document.body.style.position = 'relative';

            modalImage.style.transitionDuration = '0s';
            modalImage.style.width = width + 'px';
            modalImage.style.top = rect.top + scrollTop + 'px';
            modalImage.style.left = left + 'px';

            window.setTimeout(() => {
                modalImage.style.opacity = '1';
                modalImage.style.transitionDuration = '';
                modalRef.current.style.position = '';
                modalImage.style.width = '';
                modalImage.style.height = '';
                modalImage.style.left = '';
                modalImage.style.top = window.scrollY + 50 + 'px';
            }, 100);
        }
    }, [open, loaded]);

    const onClose = () => {
        console.log('heh?');
        const { height, width, left, top, rect, scrollLeft, scrollTop } = getStylingData(imageRef);
        const { current: modalImage } = modalRef;

        modalRef.current.style.width = width + 'px';
        modalRef.current.style.top = rect.top + scrollTop + 'px';
        modalRef.current.style.left = left + 'px';
        modalRef.current.style.position = 'absolute';
        document.body.style.position = 'relative';

        modalImage.addEventListener('transitionend', function transitionEnd() {
            if (!open) {
                return;
            }

            setOpen(false);
            setLoading(false);
            modalImage.removeEventListener('transitionend', transitionEnd);
        });
    };

    return (
        <div ref={imageRef} className="image-wrapper">
            {open
                ? createPortal(
                      <div className="image-modal" onClick={() => onClose()}>
                          {loaded ? <div className="image-modal__overlay" /> : null}
                          <div className="image-modal__container">
                              <img onLoad={() => setLoading(true)} src={src} ref={modalRef} alt={props.alt} />
                          </div>
                      </div>,
                      document.body
                  )
                : null}
            <img onClick={() => setOpen(true)} src={src} />
            {!loaded && open ? (
                <div className="image-wrapper--loading">
                    <LoadingKeyboard />
                </div>
            ) : null}
        </div>
    );
}

ImageModal.defaultProps = {};

export default ImageModal;
