import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ScreenWidthContextProps {
    width: number;
}

const ScreenWidthContext = createContext<ScreenWidthContextProps | undefined>(undefined);

export const useScreenWidth = () => {
    const context = useContext(ScreenWidthContext);
    if (!context) {
        throw new Error('useScreenWidth must be used within a ScreenWidthProvider');
    }
    return context;
};

interface ScreenWidthProviderProps {
    children: ReactNode;
}

export const ScreenWidthProvider: React.FC<ScreenWidthProviderProps> = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenWidthContext.Provider value={{ width }}>
            {children}
        </ScreenWidthContext.Provider>
    );
};