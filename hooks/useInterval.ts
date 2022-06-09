import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
    const callbackRef = useRef<Function>();

    useEffect( ()=> {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(()=> {
        const interval = setInterval(()=> {
            if (callbackRef.current) {
                callbackRef.current();
            }
        }, delay);
        return ()=> clearInterval(interval);
    }, [delay]);
}