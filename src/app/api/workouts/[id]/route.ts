import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

interface GETProps {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params }: GETProps) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return Response.json({ error: userError.message });
    }

    const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('id', params.id);

    if (!data || !data.length) {
        return Response.json({ error: 'No workout found' });
    }

    if (error) {
        //@ts-ignore
        return Response.json({ error: error.message });
    }


    return Response.json({ message: '', error: '', data: data[0] });
}

export async function DELETE(request: Request, { params }: GETProps) {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return Response.json({ error: userError.message });
    }

    const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('user_id', user?.id)
        .eq('id', params.id);

    if (error) {
        //@ts-ignore
        return Response.json({ error: error.message });
    }

    return Response.json({ message: 'Successfully deleted workout', error: '', data: null });
}

export async function PUT(request: Request, { params }: GETProps) {
    console.log(params);

    return Response.json({});
}