'use client';

import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/gotrue-js';

export default function DashboardHome() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<User|null>({} as User)


    useEffect(() => {
        async function getAndSetUser(){
            const { data, error } = await supabase.auth.getUser();

            if(data.user){
                setUser(data.user);
            }
        }

        getAndSetUser()
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <>
            {user ? (
                <p>Hello {user.email}</p>
            ) : null}
            <button onClick={handleSignOut}>Sign out</button>
        </>
    );
}