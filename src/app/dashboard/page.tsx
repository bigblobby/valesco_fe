import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import DashboardHome from '@/app/dashboard/dashboard-home';

export default async function DashboardHomePage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session?.user?.id);

    return (
        <>
            {session?.user ? (
                <>
                    <DashboardHome user={session.user} userProfile={profile?.[0]} />
                </>
            ) : null}
        </>
    );
}