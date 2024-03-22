import { Metadata } from 'next';
import Settings from '@/app/dashboard/settings/settings';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/utils/supabase/server';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Generated by create next app',
};

export default async function SettingsPage() {
    const cookiesStore = cookies();
    const supabase = createClient(cookiesStore);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        return (
            <Settings />
        )
    }
}