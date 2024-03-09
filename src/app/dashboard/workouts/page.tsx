import Workouts from '@/app/dashboard/workouts/workouts';
import { Suspense } from 'react';
import PageSpinner from '@/app/components/ui/page-spinner';

export default function DashboardWorkoutsPage() {
    return (
        <Suspense fallback={<PageSpinner />}>
            <Workouts />
        </Suspense>
    )
}