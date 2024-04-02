'use client';

import Heading from '@/lib/components/ui/heading';
import { ParseContent } from '@/app/dashboard/test/parse-content';
import { usePreMadeWorkoutsAPI } from '@/lib/hooks/api/usePreMadeWorkoutsApi';
import PageSpinner from '@/lib/components/ui/page-spinner';
import { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/ui/form/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/ui/form/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/lib/components/ui/button';

interface Workout {
    title: string;
    content: string;
}

const workoutPreMadeFormSchema = z.object({
    collection: z.enum([
        'crossfit-main-daily-wods-archive-2001',
        'crossfit-main-daily-wods-archive-2002',
        'crossfit-main-daily-wods-archive-2003',
        'crossfit-main-daily-wods-archive-2004',
        'crossfit-main-daily-wods-archive-2005',
        'crossfit-main-daily-wods-archive-2006',
        'crossfit-main-daily-wods-archive-2007',
        'crossfit-main-daily-wods-archive-2008',
        'crossfit-main-daily-wods-archive-2009',
        'crossfit-main-daily-wods-archive-2010',
        'crossfit-main-daily-wods-archive-2011',
        'crossfit-main-daily-wods-archive-2012',
        'crossfit-main-daily-wods-archive-2013',
        'crossfit-main-daily-wods-archive-2014',
        'crossfit-main-daily-wods-archive-2015',
        'crossfit-main-daily-wods-archive-2016',
        'crossfit-main-daily-wods-archive-2017',
        'crossfit-main-daily-wods-archive-2018',
        'crossfit-main-daily-wods-archive-2019',
        'crossfit-main-daily-wods-archive-2020',
        'crossfit-main-daily-wods-archive-2021',
        'crossfit-main-daily-wods-archive-2022',
        'crossfit-main-daily-wods-archive-2023',
        'crossfit-main-daily-wods-archive-2024',
        'crossfit-main-hero-wods',
        'crossfit-linchpin-daily-wods',
        'crossfit-linchpin-monster-mash-wods',
        'crossfit-mayhem-daily-wods',
        'push-herk-wods',
    ]),
});

type WorkoutPreMadeFormInputs = z.infer<typeof workoutPreMadeFormSchema>;

const DEFAULT_COLLECTION = 'crossfit-main-daily-wods-archive-2001';

export default function Test() {
    const preMadeWorkouts = usePreMadeWorkoutsAPI();
    const [collection, setCollection] = useState<string>(DEFAULT_COLLECTION);
    const form = useForm<WorkoutPreMadeFormInputs>({
        resolver: zodResolver(workoutPreMadeFormSchema),
        defaultValues: {
            collection: DEFAULT_COLLECTION
        }
    });

    const { data, isFetching, isLoading } = preMadeWorkouts.getAllWorkouts(collection);

    function onSubmit(data: WorkoutPreMadeFormInputs) {
        setCollection(data.collection);
    }

    if (isLoading || isFetching) {
        return <PageSpinner />
    }

    if (!isLoading && !isFetching && data && data.data.workouts.length > 0) {
        return (
            <div>
                <Heading className="mb-10">{data.data.workouts.length}</Heading>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                        <div>
                            <FormField
                                control={form.control}
                                name="collection"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel>Collection</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={collection}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a collection" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2001">Crossfit daily WODs 2001</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2002">Crossfit daily WODs 2002</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2003">Crossfit daily WODs 2003</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2004">Crossfit daily WODs 2004</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2005">Crossfit daily WODs 2005</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2006">Crossfit daily WODs 2006</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2007">Crossfit daily WODs 2007</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2008">Crossfit daily WODs 2008</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2009">Crossfit daily WODs 2009</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2010">Crossfit daily WODs 2010</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2011">Crossfit daily WODs 2011</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2012">Crossfit daily WODs 2012</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2013">Crossfit daily WODs 2013</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2014">Crossfit daily WODs 2014</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2015">Crossfit daily WODs 2015</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2016">Crossfit daily WODs 2016</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2017">Crossfit daily WODs 2017</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2018">Crossfit daily WODs 2018</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2019">Crossfit daily WODs 2019</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2020">Crossfit daily WODs 2020</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2021">Crossfit daily WODs 2021</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2022">Crossfit daily WODs 2022</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2023">Crossfit daily WODs 2023</SelectItem>
                                                    <SelectItem value="crossfit-main-daily-wods-archive-2024">Crossfit daily WODs 2024</SelectItem>
                                                    <SelectItem value="crossfit-main-hero-wods">Crossfit Hero WODs</SelectItem>
                                                    <SelectItem value="crossfit-linchpin-daily-wods">Crossfit Linchpin daily WODs</SelectItem>
                                                    <SelectItem value="crossfit-linchpin-monster-mash-wods">Crossfit Linchpin monster mash WODs</SelectItem>
                                                    <SelectItem value="crossfit-mayhem-daily-wods">Crossfit Mayhem daily WODs</SelectItem>
                                                    <SelectItem value="push-herk-wods">Push Jerk WODs</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

                        <Button type="submit">
                            Search
                        </Button>
                    </form>
                </Form>

                <ul>
                    {data.data.workouts.map((workout: Workout) => {
                        return (
                            <li key={workout.title} className="mb-10">
                                <Heading>{workout.title}</Heading>
                                <ParseContent content={workout.content}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return null;
}