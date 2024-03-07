'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { z } from "zod";

const createWorkoutSchema = z.object({
    name: z.string().min(1),
});

export async function createWorkout(currentState: any, formData: FormData){
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);
    const name = formData.get('name');

    const parsedData = createWorkoutSchema.safeParse({
        name: name,
    })

    if (!parsedData.success) {
        console.log(parsedData.error)
        return { error: parsedData.error.message, message: '', data: null };
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return { error: userError.message, message: '', data: null };
    }

    if (user) {
        const {data, error} = await supabase.from('workouts').insert({
            user_id: user.id,
            name: name,
            content: 'Test content'
        }).select();

        if (error) {
            return { error: error.message, message: '', data: null };
        }

        return { message: 'Workout created', error: '', data: data?.[0] };
    }


    return { message: '', error: 'Something went wrong', data: null };
}