import useAPI from '@/app/hooks/api/useApi';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const WORKOUT_QUERY_KEY = 'workouts';

export function useWorkoutAPI() {
    const { GET, POST, PUT, DELETE } = useAPI();
    const queryClient = useQueryClient();

    function createWorkout() {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await POST('/workouts', formData);
                return response.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [WORKOUT_QUERY_KEY] });
            }
        });
    }

    function getAllWorkouts() {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY],
            queryFn: async () => {
                const res = await GET('/workouts');
                return res.data;
            }
        });
    }

    function getWorkoutById(id: string) {
        return useQuery({
            queryKey: [WORKOUT_QUERY_KEY, id],
            queryFn: async () => {
                const response = await GET('/workouts/' + id);
                return response.data;
            }
        })
    }

    function deleteWorkoutById(id: string) {
        return useMutation({
            mutationFn: async (workoutId?: string) => {
                const response = await DELETE('/workouts/' + workoutId ?? id);
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