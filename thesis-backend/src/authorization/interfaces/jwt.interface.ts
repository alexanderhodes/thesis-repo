import {PermissionEntity, RoleEntity} from '../../database/entities';

export interface Payload {
    sub: string;
    username: string;
    permissions: string[];
}

export interface LoginResponse {
    accessToken: string;
    permissions: PermissionEntity[];
    username: string;
    roles: RoleEntity[];
}
