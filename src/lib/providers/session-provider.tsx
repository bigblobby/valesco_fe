'use client';

import { createContext, useEffect } from 'react';
import { createClient } from '@/lib/utils/supabase/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { Session } from '@supabase/gotrue-js/src/lib/types';

export interface ISessionContextState {
    session?: Session,
    supabase?: SupabaseClient;
}

export const SessionContext = createContext<ISessionContextState>({
    session: undefined,
    supabase: undefined,
});

export default function SessionProvider({
    children,
    session,
}: any) {
    const supabase = createClient();

    useEffect(() => {
        const { data: { subscription} } = supabase.auth.onAuthStateChange(
            (event, session) => {
                // console.log(new Date())
                // console.log('Event:', event);
                // console.log('Session:', session);
            })

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <SessionContext.Provider value={{session: session, supabase: supabase}}>
            {children}
        </SessionContext.Provider>
    )
}