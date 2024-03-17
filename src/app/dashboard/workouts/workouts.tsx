'use client';

import Card from '@/lib/components/ui/card';
import Link from '@/lib/components/ui/link';
import Text from '@/lib/components/ui/text';
import { useWorkoutAPI } from '@/lib/hooks/api/useWorkoutApi';
import Timestamp from '@/lib/components/ui/timestamp';

export default function Workouts() {
    const { getAllWorkouts } = useWorkoutAPI();
    const { data, isLoading, isFetching } = getAllWorkouts();

    return (
        <div>
            {(isLoading || isFetching) && (
                <span>Loading...</span>
            )}

            {!isLoading && !isFetching && data && data.data.length > 0 ? (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.data.map((workout: any, i: number) => (
                        <li key={i}>
                            <Link asWrapper href={`/dashboard/workout/${workout.id}`}>
                                <Card>
                                    <Text>{workout.name}</Text>
                                    <Text className="text-sm">
                                        <Timestamp date={workout.created_at}/>
                                    </Text>
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}