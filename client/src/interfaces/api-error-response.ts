export interface ApiErrorResponse {
    success: boolean,
    statusCode: number;
    message: string;
    errors?: Record<string, any>;
}