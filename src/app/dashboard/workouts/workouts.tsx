'use client';

import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function Workouts() {
    const {data, error, isLoading, mutate} = useSWR('/api/workouts', fetcher);

    return (
        <div className="p-4">
            {isLoading && (
                <span>Loading...</span>
            )}
            {data?.length > 0 ? (
                <ul>
                    {data.map((workout: any, i: number) => (
                        <li key={i}>{workout.name}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    )
}