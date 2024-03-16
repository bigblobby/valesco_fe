import { useContext } from 'react';
import { SessionContext } from '@/lib/providers/session-provider';

export function useSession() {
    const context = useContext<any>(SessionContext);

    return context;
}