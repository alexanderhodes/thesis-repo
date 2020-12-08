export interface IRemoteResponse<T> {
    host: string;
    name: string;
    data: T[];
    error: boolean;
}
