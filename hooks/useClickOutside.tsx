import { useRef, useEffect } from 'react';

function useClickOutside(elref: any, callback: any) {
    const callbackRef = useRef(null);
    callbackRef.current = callback;

    useEffect(() => {
        function handleClickOutSide(evt: any) {
            if (!(elref?.current?.contains(evt.target) && callbackRef.current)) {
                callbackRef.current(evt);
            }
        }
        document.addEventListener('click', handleClickOutSide, true);
        return () => document.removeEventListener('click', handleClickOutSide, true);
    }, [callbackRef, elref]);
}

export default useClickOutside;
