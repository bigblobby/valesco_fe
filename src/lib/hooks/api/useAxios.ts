import axios from 'axios';
import { DEFAULT_ROUTE_ENDPOINT } from '@/lib/constants/app.constants';

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL ?? DEFAULT_ROUTE_ENDPOINT}`,
});

export default function useAxios() {
    return {
        axiosInstance,
    };
}