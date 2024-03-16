import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { DEFAULT_ROUTE_ENDPOINT } from '@/lib/constants/app.constants';
import { useSession } from '@/lib/hooks/useSession';

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_ROUTE_ENDPOINT}`,
});

export default function useAxios() {
    const { session } = useSession();

    axiosInstance.interceptors.request.clear();
    axiosInstance.interceptors.request.use(
        async (value: InternalAxiosRequestConfig) => {
            // Check if the session is valid
            value.headers["Authorization"] = `Bearer ${session?.access_token ?? ""}`;
            value.headers["Refreshtoken"] = `${session?.refresh_token ?? ""}`;

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