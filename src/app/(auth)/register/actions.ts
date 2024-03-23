'use server';

import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function registerAction(currentState: any, formData: FormData) {
    const supabase = createClient();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email) {
        return { error: 'No email provided' };
    }

    if (!password) {
        return { error: 'No password provided' };
    }

    try {
        const res = await supabase.auth.signUp({
            email,
            password,
            // options: {
            //     emailRedirectTo: `${location.origin}/auth/callback`, // Use this if we use email verification. DO NOT REMOVE.
            // },
        });

        console.log(res);

        if (res.error) {
            return { error: res.error.message };
        }
    } catch (err) {
        console.log(err);
        throw err;
    }

    redirect('/dashboard');
}