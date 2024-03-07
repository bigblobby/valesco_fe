'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function upsertProfile(currentState: any, formData: FormData) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return { error: userError.message };
    }

    const username = formData.get('username');
    const firstName = formData.get('first_name');
    const lastName = formData.get('last_name');
    const website = formData.get('website');

    const { data, error } = await supabase.from('profiles').upsert({
        id: user?.id,
        username: username,
        first_name: firstName,
        last_name: lastName,
        website: website,
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/profile');

    return { message: 'Profile updated' };
}