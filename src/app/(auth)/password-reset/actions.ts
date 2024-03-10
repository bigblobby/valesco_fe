'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';

export async function resetPasswordAction(currentState: any, formData: FormData) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const email = formData.get('email') as string;

    if (!email) {
        return { error: 'No email provided' };
    }

    await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/change-password'
    });
}