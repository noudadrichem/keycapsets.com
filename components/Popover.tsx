import React, { ReactElement, ReactNode, useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export interface PopoverProps {
    clickTarget: ReactElement;
    children: ReactNode;
}

export default function Popover(props: PopoverProps): JSX.Element {
    const [isPopoverShown, setIspopoverShown] = useState<boolean>(false);
    const popup = useRef<HTMLDivElement | null>();

    useClickOutside(popup, handleClickOutside);

    function handleClickOutside(e: React.MouseEvent<HTMLElement>) {
        setIspopoverShown(false);
    }

    function open(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        setIspopoverShown(!isPopoverShown);
    }

    return (
        <div className="popover-target">
            <div className="popover-target-wrapper" onClick={open}>
                {props.clickTarget}
            </div>
            <div className={`popover ${isPopoverShown ? 'shown' : 'hidden'} show`} ref={popup}>
                <div className="popover-container center">{props.children}</div>
            </div>
        </div>
    );
}
