
export interface Payload {
    sub: string;
    username: string;
    permissions: string[];
}

export interface JwtToken {
    access_token: string;
}
