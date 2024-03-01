import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileForm from '@/app/profile/profile-form';

export default async function Page(){
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const { data: {user}, error: userError } = await supabase.auth.getUser();
    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', user?.id);

    console.log(await supabase.auth.getSession());

    return (
        <ProfileForm user={user} profile={profile?.[0]} />
    )
}