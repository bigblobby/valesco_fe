import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

import { z } from "zod";

const createWorkoutSchema = z.object({
    name: z.string().min(1),
});

export async function POST(request: Request) {
    const data = await request.json();
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);
    const name = data.name;

    const parsedData = createWorkoutSchema.safeParse({
        name: name,
    })

    if (!parsedData.success) {
        return Response.json({ error: parsedData.error.message, message: '', data: null });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return Response.json({ error: userError.message, message: '', data: null });
    }

    if (user) {
        const {data, error} = await supabase.from('workouts').insert({
            user_id: user.id,
            name: name,
            content: 'Test content'
        }).select();

        if (error) {
            return Response.json({ error: error.message, message: '', data: null });
        }

        return Response.json({ message: 'Workout created', error: '', data: data?.[0] });
    }


    return Response.json({ message: '', error: 'Something went wrong', data: null });
}

export async function GET(request: Request) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: userData, error } = await supabase.auth.getUser();

    if (userData.user) {
        const {data, error} = await supabase
            .from('workouts')
            .select('*')
            .eq('user_id', userData.user?.id)
            .order('created_at', {ascending: false});

        return Response.json(data);
    }

    revalidatePath('/dashboard');

    return Response.json({message: 'Couldnt find user'});
}