import {Permission} from '../../database/entities';
import {PermissionDto} from './permission.dto';

export interface CreateUserDto {
    username: string;
    password: string;
    permissions: Permission[];
}

export interface CreatedUserDto {
    id: string;
    username: string;
    privateKey: string;
}

export interface UserResponseDto {
    id: string;
    username: string;
    publicKey: string;
    permissions: PermissionDto[];
}
