import useAPI from '@/lib/hooks/api/useApi';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { PROFILE_QUERY_KEY } from '@/lib/constants/query-key.constants';
import { TProfile } from '@/lib/types/table.types';

export default function useProfileApi() {
    const { GET, PUT } = useAPI();
    const queryClient = useQueryClient();

    function getProfile() {
        return useQuery({
            queryKey: [PROFILE_QUERY_KEY],
            queryFn: async () => {
                const response = await GET<ApiResponse<TProfile>>(`/profiles`);
                return response.data;
            }
        });
    }

    function updateProfile() {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await PUT<ApiResponse<null>>('/profiles', formData);
                return response.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
            }
        });
    }

    return {
        getProfile,
        updateProfile,
    }
}