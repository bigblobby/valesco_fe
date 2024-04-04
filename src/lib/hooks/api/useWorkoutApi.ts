import useAPI from '@/lib/hooks/api/useApi';
import { UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { TWorkout } from '@/lib/types/table.types';
import { WORKOUT_QUERY_KEY } from '@/lib/constants/query-key.constants';

export function useWorkoutAPI() {
    const { GET, POST, DELETE } = useAPI();
    const queryClient = useQueryClient();
    const URL = '/workouts';

    function createWorkout(): UseMutationResult<ApiResponse<TWorkout>> {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await POST<ApiResponse<TWorkout>>(URL, formData);
                return response.data;
            },

            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, 'page'] });
                void queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, 'count'] });
            }
        });
    }

    function getAllWorkouts(page: number): UseQueryResult<ApiResponse<{ workouts: TWorkout[], count: number }>> {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY, 'page', page],
            queryFn: async () => {
                const response = await GET<ApiResponse<{ workouts: TWorkout[], count: number }>>(URL, {
                    params: { page: page }
                });
                return response.data;
            }
        });
    }

    function getWorkoutById(id: string): UseQueryResult<ApiResponse<TWorkout>> {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY, id],
            queryFn: async () => {
                const response = await GET<ApiResponse<TWorkout>>(`${URL}/${id}`);
                return response.data;
            }
        });
    }

    function getWorkoutCount(): UseQueryResult<ApiResponse<number>> {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY, 'count'],
            queryFn: async () => {
                const response = await GET<ApiResponse<number>>(`${URL}/count`);
                return response.data;
            }
        });
    }

    function deleteWorkoutById(id: string) {
        return useMutation({
            mutationFn: async (workoutId?: string) => {
                const response = await DELETE(`${URL}/${workoutId ?? id}`);
                return response.data;
            },

            onSuccess: () => {
                void queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, 'page'] });
                void queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, 'count'] });
            }
        });
    }

    return {
        createWorkout,
        getAllWorkouts,
        getWorkoutById,
        getWorkoutCount,
        deleteWorkoutById,
    };
}