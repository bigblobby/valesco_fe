import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { z } from "zod";

const createWorkoutSchema = z.object({
    name: z.string().min(1),
});

export async function POST(request: Request) {
    const supabase = createClient();
    const data = await request.json();
    const name = data.name;

    const parsedData = createWorkoutSchema.safeParse({
        name: name,
    })

    if (!parsedData.success) {
        return NextResponse.json({ error: parsedData.error.message, message: '', data: null });
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return NextResponse.json({ error: userError.message, message: '', data: null });
    }

    if (user) {
        const {data, error} = await supabase.from('workouts').insert({
            user_id: user.id,
            name: name,
            content: 'Test content'
        }).select();

        if (error) {
            return NextResponse.json({ error: error.message, message: '', data: null });
        }

        return NextResponse.json({ message: 'Workout created', error: '', data: data?.[0] });
    }

    return NextResponse.json({ message: '', error: 'Something went wrong', data: null });
}

export async function GET(request: Request) {
    const supabase = createClient();

    const { data: userData, error } = await supabase.auth.getUser();

    if (userData.user) {
        const {data, error} = await supabase
            .from('workouts')
            .select('*')
            .eq('user_id', userData.user?.id)
            .order('created_at', {ascending: false});

        return NextResponse.json(data);
    }

    revalidatePath('/dashboard');

    return NextResponse.json({message: 'Couldnt find user'});
}