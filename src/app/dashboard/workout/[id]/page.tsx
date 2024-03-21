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
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Dialog, DialogClose, DialogTrigger, DialogContent } from '@/lib/components/ui/dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

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
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

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
                <>
                    <Button className="inline-flex items-center" variant="link" onClick={() => router.back()}>
                        <ArrowLeftIcon className="mr-2" width={16} height={16} />
                        <Text className="text-xs" variant="span">Back</Text>
                    </Button>
                    <Card className="mt-4">
                        <Heading as="h1" variant="h3">{data.data.name}</Heading>
                        <Text className="text-sm mb-4">
                            <Timestamp date={data.data.created_at} />
                        </Text>
                        <Markdown className="markdown text-gray-600 dark:text-gray-400">{data.data.content}</Markdown>

                        <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                            <DialogTrigger asChild>
                                <Button>Delete</Button>
                            </DialogTrigger>
                            <DialogContent>

                                <div className="max-w-80 mx-auto">
                                    <Heading as="h5" className="text-center">Are you sure you want to delete this workout?</Heading>
                                    <Text className="text-center mt-3">You won't be able to revert this action.</Text>

                                    <div className="flex justify-center gap-4 mt-5">
                                        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>No</Button>
                                        <Button onClick={handleDelete}>Yes</Button>
                                    </div>
                                </div>
                                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                    <Text>
                                        <XMarkIcon width={20} height={20} />
                                        <span className="sr-only">Close</span>
                                    </Text>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>

                    </Card>
                </>
            ) : null}
        </div>
    )
}