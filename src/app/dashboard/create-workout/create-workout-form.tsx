'use client';

import Text from '@/lib/components/ui/text';
import Input from '@/lib/components/forms/input';
import { Button } from '@/lib/components/ui/button';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Card from '@/lib/components/ui/card';
import Link from '@/lib/components/ui/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

const workoutFormSchema = z.object({
    name: z.string(),
});

type WorkoutFormInputs = z.infer<typeof workoutFormSchema>;

export default function CreateWorkoutForm() {
    const { createWorkout } = useWorkoutAPI();
    const { mutate, data, isPending } = createWorkout();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<WorkoutFormInputs>({
        resolver: zodResolver(workoutFormSchema),
    });

    function create(formInputs: WorkoutFormInputs) {
        return new Promise((resolve, reject) => {
            mutate(formInputs, {
                onSuccess: (data) => {
                    if (data) {
                        toast((t) => (
                            <div className="relative pr-4">
                                <Text>Your workout has been generated</Text>
                                <Link className="underline" href={`/dashboard/workout/${data.data.id}`}>Go to workout</Link>
                                <button className="absolute -top-1.5 -right-3 text-gray-500 dark:text-gray-400" onClick={() => toast.dismiss(t.id)}>
                                    <XMarkIcon width={20} height={20}/>
                                </button>
                            </div>
                        ), {
                            duration: 100000,
                            position: 'bottom-left',
                        });
                    }

                    resolve(void 0);
                },

                onError: () => {
                    reject();
                }
            });
        });
    }

    function onSubmit(d: WorkoutFormInputs) {
        toast.promise(create(d), {
            loading: 'Generating workout...',
            error: 'Can\'t generate workout',
            success: 'Workout generated!',
        });
    }

    console.log('errors', errors);

    return (
        <Card className="sm:max-w-md shadow-none">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div>
                    <Input
                        {...register('name')}
                        withLabel={true}
                        labelText="Name"
                        id="name"
                        required
                    />
                </div>
                <Button type="submit" disabled={isPending} showSpinnerOnDisabled>
                    Generate workout
                </Button>
                {data?.error && (
                    <Text className="text-red-500 text-sm dark:text-red-500">{data?.error}</Text>
                )}
            </form>
        </Card>
    );
}