'use client';

import useSWR from 'swr';
import Card from '@/app/components/ui/card';
import Link from '@/app/components/ui/link';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Workouts() {
    const {data, error, isLoading, mutate} = useSWR('/api/workouts', fetcher);

    return (
        <div>
            {isLoading && (
                <span>Loading...</span>
            )}
            {data?.length > 0 ? (
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((workout: any, i: number) => (
                        <li key={i}>
                            <Link href={`/dashboard/workout/${workout.id}`} asWrapper>
                                <Card>
                                    {workout.name}
                                </Card>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}