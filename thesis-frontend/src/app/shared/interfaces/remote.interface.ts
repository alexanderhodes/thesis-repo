
export interface RemoteResponse<T> {
  host: string;
  name: string;
  data: T[];
  error: boolean;
}
