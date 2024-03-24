'use client';

import PageSpinner from '@/lib/components/ui/page-spinner';
import Card from '@/lib/components/ui/card';
import useProfileApi from '@/lib/hooks/api/useProfileApi';
import ProfileForm from '@/lib/components/forms/profile-form';

export default function Profile() {
    const { getProfile } = useProfileApi();
    const { data, isLoading, isFetching } = getProfile();

    if (!data && isLoading && isFetching) return <PageSpinner />;

    if (data) {
        return (
            <Card className="p-5 max-w-[1200px] mx-auto">
                <ProfileForm profile={data.data} />
            </Card>
        );
    }
}