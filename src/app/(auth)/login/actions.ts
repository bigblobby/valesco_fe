'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';


export async function loginAction(currentState: any, formData: FormData) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
        return { error: 'No email provided' };
    }

    if (!password) {
        return { error: 'No password provided' };
    }

    try {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log(res.error);

        if (res.error) {
            return { error: res.error.message };
        }
    } catch (err) {
        console.log(err);
        throw err;
    }

    redirect('/dashboard');
}