import useAPI from '@/lib/hooks/api/useApi';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { SETTINGS_QUERY_KEY } from '@/lib/constants/query-key.constants';
import { TSettings } from '@/lib/types/table.types';

export default function useSettingsApi() {
    const { GET, PUT } = useAPI();
    const queryClient = useQueryClient();
    const URL = '/settings';

    function getSettings(): UseQueryResult<ApiResponse<TSettings>> {
        return useQuery({
            queryKey: [SETTINGS_QUERY_KEY],
            queryFn: async () => {
                const response = await GET<ApiResponse<TSettings>>(URL);
                return response.data;
            }
        });
    }

    function updateSettings() {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await PUT<ApiResponse<null>>(URL, formData);
                return response.data;
            },

            onSuccess: (data) => {
                queryClient.setQueryData([SETTINGS_QUERY_KEY], data);
            }
        });
    }

    return {
        getSettings,
        updateSettings,
    }
}