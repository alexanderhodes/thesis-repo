import {PermissionDto} from './permission.dto';

export interface RoleDto {
    name: string;
    permissions: PermissionDto[];
}
