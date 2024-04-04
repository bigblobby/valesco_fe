import useAPI from '@/lib/hooks/api/useApi';
import { useMutation, useQueryClient, useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { PROFILE_QUERY_KEY } from '@/lib/constants/query-key.constants';
import { TProfile } from '@/lib/types/table.types';

export default function useProfileApi() {
    const { GET, PUT } = useAPI();
    const queryClient = useQueryClient();
    const URL = '/profiles';

    function getProfile(): UseQueryResult<ApiResponse<TProfile>> {
        return useQuery({
            queryKey: [PROFILE_QUERY_KEY],
            queryFn: async () => {
                const response = await GET<ApiResponse<TProfile>>(URL);
                return response.data;
            }
        });
    }

    function updateProfile() {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await PUT<ApiResponse<null>>(URL, formData);
                return response.data;
            },

            onSuccess: (data) => {
                queryClient.setQueryData([PROFILE_QUERY_KEY], data)
            }
        });
    }

    return {
        getProfile,
        updateProfile,
    }
}