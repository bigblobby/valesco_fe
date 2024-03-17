import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNav from '@/app/dashboard/(components)/dashboard-nav';
import DashboardSidebar from '@/app/dashboard/(components)/dashboard-sidebar';
import SessionProvider from '@/lib/providers/session-provider';
import SidebarProvider from '@/lib/providers/sidebar-provider';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { session },
        error: sessionError
    } = await supabase.auth.getSession();

    console.log('layout session:', session);
    console.log('layout session error:', sessionError);

    if (sessionError || !session) {
        redirect('/login');
    }

    if (session) {
        const { data: profile, error } = await supabase.from('profiles').select('*').eq('id', session.user?.id);

        console.log('layout profile:', profile);
        console.log('layout profile error:', error);

        if (error || !session?.user) {
            redirect('/login');
        }

        return (
            <SessionProvider session={session}>
                <section className="bg-gray-50 dark:bg-gray-900">
                    <div className="min-h-screen">
                        <div className="text-gray-900 dark:text-white">
                            <SidebarProvider>
                                <div className="relative">
                                    <DashboardSidebar />
                                    <main className="md:pl-72">
                                        <DashboardNav user={session.user} userProfile={profile[0]} />
                                        <div className="p-4 h-[calc(100vh-65px)] overflow-auto">
                                            {children}
                                        </div>
                                    </main>
                                </div>
                            </SidebarProvider>
                        </div>
                    </div>
                </section>
            </SessionProvider>
        );
    }

    return null;
}
