import { createClient } from '@/lib/utils/supabase/server';
import { cookies } from 'next/headers';
import DashboardHome from '@/app/dashboard/dashboard-home';
import { Suspense } from 'react';
import PageSpinner from '@/lib/components/ui/page-spinner';

export default async function DashboardHomePage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session?.user?.id);

    return (
        <Suspense fallback={<PageSpinner />}>
            {session?.user ? (
                <DashboardHome user={session.user} userProfile={profile?.[0]} />
            ) : null}
        </Suspense>
    );
}