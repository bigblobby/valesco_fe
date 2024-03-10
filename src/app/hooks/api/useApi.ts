import { AxiosInstance, AxiosRequestConfig } from 'axios';
import useAxios from '@/app/hooks/api/useAxios';

export default function useAPI(passedInstance?: AxiosInstance) {
    const { axiosInstance } = useAxios();
    const instance = passedInstance ?? axiosInstance;

    function GET(url: string, config?: AxiosRequestConfig) {
        return instance.get(url, config);
    }

    function POST(url: string, data?: any, config?: AxiosRequestConfig) {
        return instance.post(url, data, config);
    }

    function PUT(url: string, data?: any, config?: AxiosRequestConfig) {
        return instance.put(url, data, config);
    }

    function DELETE(url: string, config?: AxiosRequestConfig) {
        return instance.delete(url, config);
    }

    return {
        GET,
        POST,
        PUT,
        DELETE,
    }

}