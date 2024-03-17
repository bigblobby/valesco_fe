'use client';

import Text from '@/lib/components/ui/text';
import DumbbellIcon from '@/lib/components/icons/dumbbell-icon';
import Link from '@/lib/components/ui/link';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import Card from '@/lib/components/ui/card';
import CreateNewWorkoutForm from '@/lib/components/create-new-workout-form';

export default function DashboardHome() {
    const { getWorkoutCount } = useWorkoutAPI();
    const { isLoading, isFetching, data } = getWorkoutCount();

    if(isLoading || isFetching) {
        return <span>Loading...</span>
    }

    if(!data?.data) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center justify-center text-center">
                    <DumbbellIcon />
                    <Text component="h1" variant="h6">No workouts</Text>
                    <Text className="mb-6">Get started by generating a new workout</Text>
                    <CreateNewWorkoutForm />
                </div>
            </div>
        );
    }

    if (data?.data) {
        return (
            <div className="flex">
                <Link asWrapper href="/dashboard/workouts" className="basis-full sm:basis-1/2 md:basis-1/3 border rounded shadow dark:shadow-none dark:border-slate-50/[0.16]">
                    <Card className="flex flex-col justify-center items-center">
                        <Text className="text-2xl text-gray-800 font-medium">Workouts</Text>
                        <Text className="text-xs">(Total generated)</Text>
                        <Text className="text-3xl mt-3">{data.data}</Text>
                    </Card>
                </Link>
            </div>
        );
    }
}