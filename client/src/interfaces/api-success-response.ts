export interface ApiSuccessResponse {
    statusCode: number;
    data: Record<string, any>;
    message: string;
    success: boolean;
}