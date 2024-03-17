'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface SidebarState {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarState>({
    active: false,
    setActive: () => {}
});

export default function SidebarProvider({
    children,
}: any) {
    const [active, setActive] = useState<boolean>(false);
    return (
        <SidebarContext.Provider value={{active: active, setActive: setActive}}>
            {children}
        </SidebarContext.Provider>
    )
}