import {PermissionDTO} from './permission.dto';

export interface RoleDTO {
    name: string;
    permissions: PermissionDTO[];
}
