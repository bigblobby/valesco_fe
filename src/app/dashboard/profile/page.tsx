import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ProfileForm from '@/app/dashboard/profile/profile-form';

export default async function Page(){
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session?.user?.id);

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <ProfileForm user={session?.user} profile={profile?.[0]} />
        </div>
    )
}