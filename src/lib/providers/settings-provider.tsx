'use client';

import { createContext } from 'react';

interface ISettingsContext {
    settings?: any;
}

export const SettingsContext = createContext<ISettingsContext>({
    settings: undefined,
});

export default function SettingsProvider({ settings, children }: any){
    return (
        <SettingsContext.Provider value={{settings: settings}}>
            {children}
        </SettingsContext.Provider>
    )
}