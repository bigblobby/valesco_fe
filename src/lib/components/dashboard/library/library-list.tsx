import { ICrossfitMainDailyWorkout } from '@/lib/types/pre-made-workout.types';
import Heading from '@/lib/components/ui/heading';
import { ParseContent } from '@/app/dashboard/test/parse-content';
import PageSpinner from '@/lib/components/ui/page-spinner';
import React, { useContext } from 'react';
import { usePreMadeWorkoutsAPI } from '@/lib/hooks/api/usePreMadeWorkoutsApi';
import { LibraryContext } from '@/lib/providers/library-provider';

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
                <Heading className="mb-10">{data.data.workouts.length}</Heading>
                <ul>
                    {data.data.workouts.map((workout: ICrossfitMainDailyWorkout) => {
                        return (
                            <li key={workout.title} className="mb-10">
                                <Heading>{workout.title}</Heading>
                                <ParseContent content={workout.content}/>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

    return null;
}