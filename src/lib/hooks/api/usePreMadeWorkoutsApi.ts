import useAPI from '@/lib/hooks/api/useApi';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { WORKOUT_PRE_MADE_QUERY_KEY } from '@/lib/constants/query-key.constants';
import { ICrossfitMainDailyWorkout } from '@/lib/types/pre-made-workout.types';

export function usePreMadeWorkoutsAPI() {
    const { GET } = useAPI();

    function getAllWorkouts(collection: string): UseQueryResult<ApiResponse<{ workouts: any[], count: number }>> {
        return useQuery({
            queryKey: [WORKOUT_PRE_MADE_QUERY_KEY, 'collection', collection],
            queryFn: async () => {
                const res = await GET<ApiResponse<{ workouts: any[], count: number }>>('/workouts-pre-made', {
                    params: {
                        collection: collection,
                    }
                });

                res.data.data.workouts = res.data.data.workouts
                    .filter((workout: ICrossfitMainDailyWorkout) => {
                        return !workout.content.includes('Rest Day');
                    })
                    .map((workout: ICrossfitMainDailyWorkout) => {
                        const segments = workout.content.split('\n');
                        const resSegments = segments.filter(seg => {
                            const postPattern = /Post (?:time|load|total|reps|number|rounds|score|your|round|Tabata|best|them).*?/g;
                            const comparePattern = /Compare to/g;
                            const postMatches = seg.match(postPattern);
                            const compareMatches = seg.match(comparePattern);
                            return !((postMatches?.length ?? 0) + (compareMatches?.length ?? 0));
                        });

                        return {
                            ...workout,
                            content: resSegments.join('\n'),
                        };
                    });

                return res.data;
            }
        });
    }

    return {
        getAllWorkouts,
    };
}