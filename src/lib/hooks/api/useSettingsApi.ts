import useAPI from '@/lib/hooks/api/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { SETTINGS_QUERY_KEY } from '@/lib/constants/query-key.constants';
import { TSettings } from '@/lib/types/table.types';

export default function useSettingsApi() {
    const { GET, PUT } = useAPI();
    const queryClient = useQueryClient();

    function getSettings() {
        return useQuery({
            queryKey: [SETTINGS_QUERY_KEY],
            queryFn: async () => {
                const response = await GET<ApiResponse<TSettings>>(`/settings`);
                return response.data;
            }
        });
    }

    function updateSettings() {
        return useMutation({
            mutationFn: async (formData: any) => {
                const response = await PUT<ApiResponse<null>>('/settings', formData);
                return response.data;
            },

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [SETTINGS_QUERY_KEY] });
            }
        });
    }

    return {
        getSettings,
        updateSettings,
    }
}