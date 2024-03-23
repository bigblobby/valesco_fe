'use client';

import Card from '@/lib/components/ui/card';
import useSettingsApi from '@/lib/hooks/api/useSettingsApi';
import SettingsForm from '@/app/dashboard/settings/settings-form';
import PageSpinner from '@/lib/components/ui/page-spinner';

export default function Settings() {
    const { getSettings } = useSettingsApi();
    const { data, isLoading, isFetching, isSuccess } = getSettings();

    if (!data && isLoading && isFetching) return <PageSpinner />;

    if (data) {
        return (
            <Card className="sm:max-w-md">
                <SettingsForm settings={data.data} />
            </Card>
        );
    }
}