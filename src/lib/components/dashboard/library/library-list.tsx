import { ICrossfitMainDailyWorkout } from '@/lib/types/pre-made-workout.types';
import Heading from '@/lib/components/ui/heading';
import { ParseContent } from '@/app/dashboard/test/parse-content';
import PageSpinner from '@/lib/components/ui/page-spinner';
import React, { useContext } from 'react';
import { usePreMadeWorkoutsAPI } from '@/lib/hooks/api/usePreMadeWorkoutsApi';
import { LibraryContext } from '@/lib/providers/library-provider';
import Card from '@/lib/components/ui/card';
import Text from '@/lib/components/ui/text';

export default function LibraryList() {
    const { collection } = useContext(LibraryContext);
    const preMadeWorkouts = usePreMadeWorkoutsAPI();
    const { data, isFetching, isLoading } = preMadeWorkouts.getAllWorkouts(collection);

    if (isLoading || isFetching) {
        return <PageSpinner/>;
    }

    if (!isLoading && !isFetching && data && data.data.workouts.length > 0) {
        return (
            <>
                <Text as="span" className="block mb-4 text-sm text-normal">{data.data.workouts.length} workouts found</Text>
                <ul className="grid gap-5 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:h-full">
                    {data.data.workouts.map((workout: ICrossfitMainDailyWorkout) => {
                        return (
                            <Card key={workout.title}>
                                <Heading>{workout.title}</Heading>
                                <ParseContent content={workout.content}/>
                            </Card>
                        );
                    })}
                </ul>
            </>
        );
    }

    return null;
}