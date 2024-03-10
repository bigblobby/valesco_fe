export interface ApiResponse<TData> {
    message: string;
    error: string;
    data: TData;
}