import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { DEFAULT_ROUTE_ENDPOINT } from '@/lib/constants/app.constants';
import { useSession } from '@/lib/hooks/useSession';
import AppConfig from '@/lib/config/app';

const axiosInstance = axios.create({
    baseURL: `${AppConfig.BACKEND_URL ?? DEFAULT_ROUTE_ENDPOINT}`,
});

export default function useAxios() {
    let { session, } = useSession();
    const { supabase } = useSession();

    axiosInstance.interceptors.request.clear();
    axiosInstance.interceptors.request.use(
        async (value: InternalAxiosRequestConfig) => {
            // console.log(session);
            if (session?.expires_at && session.expires_at * 1000 < Date.now()) {
                // If the session is not valid, refresh it
                if (supabase) {
                    const { data, error } = await supabase.auth.refreshSession();
                    if (error) {
                        throw error;
                    }
                    // console.log('axios refresh token: ', data.session);

                    if (data.session) {
                        session = data.session;
                    }
                }
            }

            // Check if the session is valid
            value.headers["Authorization"] = `Bearer ${session?.access_token ?? ""}`;

            return value;
        },
        (error: AxiosError) => {
            console.error({ error });

            return Promise.reject(error);
        }
    );

    return {
        axiosInstance,
    };
}