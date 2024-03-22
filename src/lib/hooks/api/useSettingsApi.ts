import useAPI from '@/lib/hooks/api/useApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/types/api.types';
import { SETTINGS_QUERY_KEY } from '@/lib/constants/query-key.constants';

export default function useSettingsApi() {
    const { PUT } = useAPI();
    const queryClient = useQueryClient();

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
        updateSettings,
    }
}