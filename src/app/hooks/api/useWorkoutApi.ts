import useAPI from '@/app/hooks/api/useApi';
import { UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Tables } from '../../../../types/supabase';
import { ApiResponse } from '@/app/api/api.interfaces';

export const WORKOUT_QUERY_KEY = 'workouts';
export type TWorkout = Tables<'workouts'>;

export function useWorkoutAPI() {
    const { GET, POST, PUT, DELETE } = useAPI();
    const queryClient = useQueryClient();

    function createWorkout(): UseMutationResult<ApiResponse<TWorkout>> {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await POST<ApiResponse<TWorkout>>('/workouts', formData);
                response.data
                return response.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY] });
            }
        });
    }

    function getAllWorkouts(): UseQueryResult<ApiResponse<TWorkout[]>> {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY],
            queryFn: async () => {
                const res = await GET<ApiResponse<TWorkout[]>>('/workouts');
                return res.data;
            }
        });
    }

    function getWorkoutById(id: string): UseQueryResult<ApiResponse<TWorkout>> {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY, id],
            queryFn: async () => {
                const response = await GET<ApiResponse<TWorkout>>(`/workouts/${id}`);
                return response.data;
            }
        })
    }

    function deleteWorkoutById(id: string) {
        return useMutation({
            mutationFn: async (workoutId?: string) => {
                const response = await DELETE(`/workouts/${workoutId ?? id}`);
                return response.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY] });
                queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY, id] });
            }
        })
    }


    return {
        createWorkout,
        getAllWorkouts,
        getWorkoutById,
        deleteWorkoutById,
    }
}