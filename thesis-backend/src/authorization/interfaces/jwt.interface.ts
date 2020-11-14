
export interface Payload {
    sub: string;
    username: string;
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    permissions: string[];
    username: string;
}
