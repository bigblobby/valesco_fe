'use client';

import { UserContext } from '@/app/providers/user-provider';
import useSWR from 'swr';
import Text from '@/app/components/ui/text';
import DumbbellIcon from '@/app/components/icons/dumbbell-icon';
import { PlusIcon } from '@heroicons/react/24/solid';

interface DashboardHomeProps {
    user: any;
    userProfile: any;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function DashboardHome({user, userProfile}: DashboardHomeProps) {
    const {data, error, isLoading, mutate} = useSWR('/api/workouts', fetcher);

    async function generateWorkout() {
        async function generateNewWorkout() {
            const res = await fetch('/api/workouts', {
                method: 'POST'
            });

            return await res.json();
        }

        await mutate(generateNewWorkout, {
            populateCache: (newWorkout: any, workouts: any) => {
                return [...workouts, newWorkout];
            },
            revalidate: false,
        });
    }

    return (
        <UserContext.Provider value={{user: user, userProfile: userProfile}}>
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col items-center justify-center text-center">
                    <DumbbellIcon />
                    <Text component="h1" variant="h6">No workouts</Text>
                    <Text>Get started by generating a new workout</Text>
                    <button onClick={generateWorkout} className="inline-flex text-white bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-6 text-center transition-colors">
                        <PlusIcon width={20} height={20} />
                        <span className="ml-2">New Workout</span>
                    </button>
                </div>
            </div>
        </UserContext.Provider>
    );
}