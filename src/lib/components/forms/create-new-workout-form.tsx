'use client';

import { Button } from '@/lib/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/solid';
import Input from '@/lib/components/ui/form/input';
import Text from '@/lib/components/ui/text';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import Link from '@/lib/components/ui/link';
import { XMarkIcon } from '@heroicons/react/24/outline';
import * as z from 'zod';
import { useState } from 'react';
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTrigger, DialogContent } from '@/lib/components/ui/dialog';

const workoutFormSchema = z.object({
    name: z.string(),
});

type WorkoutFormInputs = z.infer<typeof workoutFormSchema>;

export default function CreateNewWorkoutForm() {
    const [open, setOpen] = useState<boolean>(false);
    const { createWorkout } = useWorkoutAPI();
    const { mutate, data, isPending } = createWorkout();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
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

                    setOpen(false);
                    reset();
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="my-4">
                    <PlusIcon width={20} height={20} />
                    <span className="ml-2">New Workout</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
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
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <Text>
                        <XMarkIcon width={20} height={20} />
                        <span className="sr-only">Close</span>
                    </Text>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}