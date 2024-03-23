import { Metadata } from 'next';
import Settings from '@/app/dashboard/settings/settings';

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Generated by create next app',
};

export default async function SettingsPage() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-full lg:py-0">
            <Settings />
        </div>
    );
}