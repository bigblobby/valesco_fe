'use client';

import { getWorkout } from '@/app/dashboard/workout/[id]/actions';
import Text from '@/app/components/ui/text';
import TimeAgo from 'react-timeago';
import { useEffect, useState } from 'react';

interface WorkoutPageProps {
    params: {
        id: string;
    }
}

export default function WorkoutPage({
    params
}: WorkoutPageProps){
    const [workout, setWorkout] = useState<any>();

    useEffect(() => {
        async function init(){
            const workout = await getWorkout(params.id);

            setWorkout(workout);
        }

        init();
    }, []);

    return (
        <div>
            {workout?.data ? (
                <>
                    <Text component="h1" variant="h4">{workout.data.name}</Text>
                    <Text className="text-sm">
                        <TimeAgo date={workout.data.created_at} title={(new Date(workout.data.created_at)).toUTCString()}/>
                    </Text>
                    <Text>{workout.data.content}</Text>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}