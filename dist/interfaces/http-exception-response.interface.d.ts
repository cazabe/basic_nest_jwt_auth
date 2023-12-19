export interface HttpExceptionResponse {
    statusCode: number;
    error: string;
}
export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    message: string;
    path: string;
    method: string;
    timeStamp: Date;
}
