import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

interface GETProps {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: GETProps) {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return NextResponse.json({ error: userError.message });
    }

    const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('id', params.id);

    if (!data || !data.length) {
        return NextResponse.json({ error: 'No workout found' });
    }

    if (error) {
        //@ts-ignore
        return NextResponse.json({ error: error.message });
    }

    return NextResponse.json({ message: '', error: '', data: data[0] });
}

export async function DELETE(request: Request, { params }: GETProps) {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return NextResponse.json({ error: userError.message });
    }

    const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('user_id', user?.id)
        .eq('id', params.id)
        .single();

    // TODO handle errors properly
    console.log(error);

    if (error) {
        //@ts-ignore
        return NextResponse.json({ error: error.message }, {status: 400});
    }

    return NextResponse.json({ message: 'Successfully deleted workout', error: '', data: null });
}

export async function PUT(request: Request, { params }: GETProps) {
    console.log(params);

    return NextResponse.json({});
}