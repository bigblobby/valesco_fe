'use client';

import { createContext } from 'react';

interface IProfileContext {
    profile?: any;
}

export const ProfileContext = createContext<IProfileContext>({
    profile: undefined,
});

export default function ProfileProvider({ profile, children }: any){
    return (
        <ProfileContext.Provider value={{profile: profile}}>
            {children}
        </ProfileContext.Provider>
    )
}