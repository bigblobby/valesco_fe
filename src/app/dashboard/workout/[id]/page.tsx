'use client';

import Text from '@/app/components/ui/text';
import Button from '@/app/components/ui/button';
import { useWorkoutAPI } from '@/app/hooks/api/useWorkoutApi';
import { useRouter } from 'next/navigation';
import Timestamp from '@/app/components/ui/timestamp';

interface WorkoutPageProps {
    params: {
        id: string;
    }
}

export default function WorkoutPage({
    params
}: WorkoutPageProps){
    const router = useRouter();
    const { getWorkoutById, deleteWorkoutById } = useWorkoutAPI();
    const { data, isLoading, isFetching } = getWorkoutById(params.id);
    const { mutate, error, isError } = deleteWorkoutById(params.id);

    async function deleteWorkout() {
        mutate(void 0, {
            onSuccess: () => {
                router.push('/dashboard/workouts');
            }
        });
    }

    return (
        <div>
            {(isLoading || isFetching) && (
                <span>Loading...</span>
            )}

            {!isLoading && !isFetching && data?.data ? (
                <>
                    <Text component="h1" variant="h4">{data.data.name}</Text>
                    <Text className="text-sm">
                        <Timestamp date={data.data.created_at} />
                    </Text>
                    <Text>{data.data.content}</Text>
                    <div>
                        <Button onClick={deleteWorkout}>Delete</Button>
                    </div>
                </>
            ) : null}
        </div>
    )
}