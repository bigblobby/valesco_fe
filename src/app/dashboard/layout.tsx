import type { Metadata } from 'next';
import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardNav from '@/lib/components/dashboard/dashboard-nav';
import DashboardSidebar from '@/lib/components/dashboard/dashboard-sidebar';
import SessionProvider from '@/lib/providers/session-provider';
import SidebarProvider from '@/lib/providers/sidebar-provider';
import SettingsProvider from '@/lib/providers/settings-provider';
import ProfileProvider from '@/lib/providers/profile-provider';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const supabase = createClient();

    const {
        data: { session },
        error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
        redirect('/login');
    }

    if (session) {
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user?.id)
            .single();

        const { data: settings, error: settingsError } = await supabase
            .from('settings')
            .select('*')
            .eq('id', session.user?.id)
            .single();

        if (error || !session?.user) {
            redirect('/login');
        }

        return (
            <SessionProvider session={session}>
                <ProfileProvider profile={profile}>
                    <SettingsProvider settings={settings}>
                        <section className="bg-gray-50 dark:bg-gray-900">
                            <div className="min-h-screen overflow-hidden">
                                <div className="text-gray-900 dark:text-white">
                                    <SidebarProvider>
                                        <div className="relative">
                                            <DashboardSidebar />
                                            <main className="md:pl-72">
                                                <DashboardNav />
                                                <div className="p-5 h-[calc(100vh-65px)] overflow-auto">
                                                    {children}
                                                </div>
                                            </main>
                                        </div>
                                    </SidebarProvider>
                                </div>
                            </div>
                        </section>
                    </SettingsProvider>
                </ProfileProvider>
            </SessionProvider>
        );
    }

    return null;
}
