'use client';

import Card from '@/app/components/ui/card';
import Link from '@/app/components/ui/link';
import TimeAgo from 'react-timeago';
import Text from '@/app/components/ui/text';
import { useQuery } from '@tanstack/react-query';

export default function Workouts() {
    const { data, isLoading, isFetching } = useQuery({ queryKey: ['workouts'], queryFn: async () => {
        const response = await fetch('/api/workouts');
        return await response.json();
    }})

    return (
        <div>
            {(isLoading || isFetching) && (
                <span>Loading...</span>
            )}
            {!isLoading && !isFetching && data?.length > 0 ? (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((workout: any, i: number) => (
                        <li key={i}>
                            <Link href={`/dashboard/workout/${workout.id}`} asWrapper>
                                <Card>
                                    <Text>{workout.name}</Text>
                                    <Text className="text-sm">
                                        <TimeAgo date={workout.created_at} title={(new Date(workout.created_at)).toUTCString()}/>
                                    </Text>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}