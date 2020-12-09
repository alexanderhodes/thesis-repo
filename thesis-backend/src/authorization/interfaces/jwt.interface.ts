import {PermissionEntity, RoleEntity} from '../../database';

export interface Payload {
    sub: string;
    username: string;
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    permissions: PermissionEntity[];
    privateKey: string;
    publicKey: string;
    roles: RoleEntity[];
    username: string;
}
