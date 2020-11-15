import {RoleDto} from './roles.dto';

export interface CreateUserDto {
    username: string;
    password: string;
    roles: RoleDto[];
}

export interface CreatedUserDto {
    id: string;
    username: string;
    privateKey: string;
    publicKey: string;
    roles: RoleDto[];
}

export interface UserResponseDto {
    id: string;
    username: string;
    publicKey: string;
    roles: RoleDto[];
}
