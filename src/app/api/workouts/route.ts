import { createClient } from '@/lib/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

import { z } from "zod";

const createWorkoutSchema = z.object({
    name: z.string().min(1),
});

const openAi = new OpenAI({
    apiKey: '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'
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
        try {
            const completion = await openAi.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: `You are a helpful personal trainer that specialises in crossfit and will suggest a wide variety of exercises.`
                    },
                    {
                        role: "user",
                        content: `Create a crossfit workout. First a warm up (never running or jogging), then a skill/strength section, then a WOD, nothing else. Include scaled movements. Respond in markdown.`
                    }
                ],
                model: "gpt-3.5-turbo-0125",
            });

            const content = completion.choices[0].message.content;

            if (content) {
                const {data, error} = await supabase.from('workouts').insert({
                    user_id: user.id,
                    name: name,
                    content: content,
                }).select();

                if (error) {
                    return NextResponse.json({ error: error.message, message: '', data: null });
                }

                return NextResponse.json({ message: 'Workout created', error: '', data: data?.[0] });
            }
        } catch (e) {
            return NextResponse.json({ message: '', error: 'Something went wrong when generating your workout', data: null });
        }
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

        return NextResponse.json({ message: '', error: '', data: data });
    }

    revalidatePath('/dashboard');

    return NextResponse.json({message: 'Couldnt find user'});
}