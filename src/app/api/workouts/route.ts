import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: userData, error } = await supabase.auth.getUser();

    if (userData.user) {
        const {data, error} = await supabase.from('workouts').insert({
            user_id: userData.user.id,
            name: 'Just a name',
            content: 'Test content'
        }).select();

        return Response.json(data?.[0]);
    }

    // revalidatePath('/dashboard');
    return Response.json({message: 'Couldnt create workout'});
}

export async function GET(request: Request) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: userData, error } = await supabase.auth.getUser();

    if (userData.user) {
        const {data, error} = await supabase.from('workouts').select('*').eq('user_id', userData.user?.id);

        console.log(data);
        console.log(error)
        return Response.json(data);
    }

    revalidatePath('/dashboard');

    return Response.json({message: 'Couldnt find user'});
}