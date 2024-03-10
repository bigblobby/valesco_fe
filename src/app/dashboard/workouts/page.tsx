import Workouts from '@/app/dashboard/workouts/workouts';
import { Suspense } from 'react';
import PageSpinner from '@/lib/components/ui/page-spinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workouts',
    description: 'Generated by create next app',
};

export default function DashboardWorkoutsPage() {
    return (
        <Suspense fallback={<PageSpinner />}>
            <Workouts />
        </Suspense>
    )
}