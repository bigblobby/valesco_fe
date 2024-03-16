'use client';

import { createContext, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';

export const SessionContext = createContext<{session: any}>({
    session: null,
});

export default function SessionProvider({
    children,
    session,
}: any) {
    const supabase = createClient();

    useEffect(() => {
        const { data: { subscription} } = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log('Event:', event);
                console.log('Session:', session);
            })

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <SessionContext.Provider value={{session: session}}>
            {children}
        </SessionContext.Provider>
    )
}