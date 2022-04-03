import {useEffect, useState} from "react";

export const useScrollY = ():number => {
    const [positionY, setPositionY] = useState<number>(0);

    useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        const handleScroll = (): void => {
            setPositionY(isBrowser ? window.scrollY : 0);
        };
        
        window.addEventListener('scroll', handleScroll, {passive: true});
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return positionY;
};