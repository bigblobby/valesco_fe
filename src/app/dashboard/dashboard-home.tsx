'use client';

import Text from '@/lib/components/ui/text';
import DumbbellIcon from '@/lib/components/icons/dumbbell-icon';
import { PlusIcon } from '@heroicons/react/24/solid';
import Link from '@/lib/components/ui/link';

export default function DashboardHome() {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center justify-center text-center">
                <DumbbellIcon />
                <Text component="h1" variant="h6">No workouts</Text>
                <Text className="mb-6">Get started by generating a new workout</Text>
                <Link href="/dashboard/create-workout" variant="button">
                    <PlusIcon width={20} height={20} />
                    <span className="ml-2">New Workout</span>
                </Link>
            </div>
        </div>
    );
}