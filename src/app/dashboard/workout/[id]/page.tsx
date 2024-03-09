'use client';

import Text from '@/app/components/ui/text';
import TimeAgo from 'react-timeago';
import { useQuery } from '@tanstack/react-query';

interface WorkoutPageProps {
    params: {
        id: string;
    }
}

export default function WorkoutPage({
    params
}: WorkoutPageProps){
    const { data, isLoading, isFetching } = useQuery({ queryKey: ['workout', params.id], queryFn: async () => {
        const response = await fetch('/api/workouts/' + params.id);
        return await response.json();
    }})

    console.log('isFetching', isFetching);
    console.log('isLoading', isLoading);

    return (
        <div>
            {(isLoading || isFetching) && (
                <span>Loading...</span>
            )}

            {data?.data ? (
                <>
                    <Text component="h1" variant="h4">{data.data.name}</Text>
                    <Text className="text-sm">
                        <TimeAgo date={data.data.created_at} title={(new Date(data.data.created_at)).toUTCString()}/>
                    </Text>
                    <Text>{data.data.content}</Text>
                </>
            ) : null}
        </div>
    )
}