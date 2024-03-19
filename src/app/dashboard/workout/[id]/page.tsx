'use client';

import Text from '@/lib/components/ui/text';
import { Button } from '@/lib/components/ui/button';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import { useRouter } from 'next/navigation';
import Timestamp from '@/lib/components/ui/timestamp';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';
import Card from '@/lib/components/ui/card';
import Heading from '@/lib/components/ui/heading';

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
        return new Promise((resolve, reject) => {
            mutate(void 0, {
                onSuccess: () => {
                    router.push('/dashboard/workouts');
                    resolve(void 0);
                },

                onError: () => {
                    reject();
                }
            });
        })
    }

    function handleDelete() {
        toast.promise(deleteWorkout(), {
            loading: 'Deleting...',
            error: 'There was a problem deleting this workout',
            success: 'Successfully deleted'
        });
    }

    return (
        <div>
            {(isLoading || isFetching) && (
                <span>Loading...</span>
            )}

            {!isLoading && !isFetching && data?.data ? (
                <Card>
                    <Heading as="h1" variant="h4">{data.data.name}</Heading>
                    <Text className="text-sm mb-4">
                        <Timestamp date={data.data.created_at} />
                    </Text>
                    <Markdown className="markdown text-gray-600 dark:text-gray-400">{data.data.content}</Markdown>
                    <div>
                        <Button onClick={handleDelete}>Delete</Button>
                    </div>
                </Card>
            ) : null}
        </div>
    )
}