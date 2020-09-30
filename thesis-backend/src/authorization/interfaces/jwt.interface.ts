
export interface Payload {
    sub: string;
    username: string;
    groups: string[]
}

export interface JwtToken {
    access_token: string;
}
