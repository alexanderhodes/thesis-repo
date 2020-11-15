import {Permission, Role} from '../../database/entities';

export interface Payload {
    sub: string;
    username: string;
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    permissions: Permission[];
    username: string;
    roles: Role[];
}
