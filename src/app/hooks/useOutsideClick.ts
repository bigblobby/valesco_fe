import { useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClick(ref: any, callback: any) {
    useEffect(() => {
        /**
         * Invoke Function onClick outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        // Bind
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // dispose
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}