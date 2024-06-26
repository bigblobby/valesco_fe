'use client';

import { createContext, useEffect } from 'react';

interface ISettingsContext {
    settings?: any;
}

export const SettingsContext = createContext<ISettingsContext>({
    settings: undefined,
});

export default function SettingsProvider({ settings, children }: any){
    useEffect(() => {
        localStorage.setItem('theme', settings.theme);
    }, [settings.theme]);

    return (
        <SettingsContext.Provider value={{settings: settings}}>
            {children}
        </SettingsContext.Provider>
    )
}