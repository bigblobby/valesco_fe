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
import { Dialog, DialogClose, DialogTrigger, DialogContent } from '@/lib/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/form/select';

const workoutFormSchema = z.object({
    name: z.string(),
    length: z.enum(['15', '20', '30', '45', '60', '120']).nullable(),
    type: z.enum(['gym_class', 'wod']),
});

type WorkoutFormInputs = z.infer<typeof workoutFormSchema>;

export default function CreateNewWorkoutForm() {
    const [ open, setOpen ] = useState<boolean>(false);
    const { createWorkout } = useWorkoutAPI();
    const { mutate, data, isPending } = createWorkout();
    const form = useForm<WorkoutFormInputs>({
        resolver: zodResolver(workoutFormSchema),
        defaultValues: {
            type: 'gym_class',
            length: '60'
        }
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
                            duration: 10000,
                            position: 'bottom-left',
                        });
                    }

                    setOpen(false);
                    form.reset();
                    resolve(void 0);
                },

                onError: () => {
                    reject();
                }
            });
        });
    }

    function onSubmit(data: WorkoutFormInputs) {
        toast.promise(create(data), {
            loading: 'Generating workout...',
            error: 'Can\'t generate workout',
            success: 'Workout generated!',
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="my-4 w-full">
                    <PlusIcon width={20} height={20} />
                    <span className="ml-2">New Workout</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input required autoComplete="off" data-1p-ignore {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Workout type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue="gym_class">
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a workout type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="gym_class">Gym class</SelectItem>
                                                    <SelectItem value="wod">WOD</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="length"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Length</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue="60">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the workout length" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="15">15 mins</SelectItem>
                                                <SelectItem value="20">20 mins</SelectItem>
                                                <SelectItem value="30">30 mins</SelectItem>
                                                <SelectItem value="45">45 mins</SelectItem>
                                                <SelectItem value="60">1 hour</SelectItem>
                                                <SelectItem value="120">2 hours</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <Button type="submit" disabled={isPending}>
                            Generate workout
                        </Button>
                    </form>
                </Form>

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