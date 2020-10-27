import { useRef, useEffect, RefObject } from 'react';

function useClickOutside(elref: RefObject<HTMLElement>, callback: (e: React.MouseEvent<HTMLElement>) => void) {
    const callbackRef = useRef(null);
    callbackRef.current = callback;

    useEffect(() => {
        function handleClickOutSide(evt: MouseEvent) {
            if (!(elref?.current?.contains(evt.target as HTMLElement) && callbackRef.current)) {
                callbackRef.current(evt);
            }
        }
        document.addEventListener('click', handleClickOutSide, true);
        return () => document.removeEventListener('click', handleClickOutSide, true);
    }, [callbackRef, elref]);
}

export default useClickOutside;
