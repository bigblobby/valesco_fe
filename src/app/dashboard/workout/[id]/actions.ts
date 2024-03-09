'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function getWorkout(id: string) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return { error: userError.message };
    }

    const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('id', id);

    if (!data || !data.length) {
        return { error: 'No workout found' };
    }

    if (error) {
        //@ts-ignore
        return { error: error.message };
    }

    return { message: '', error: '', data: data[0] };
}