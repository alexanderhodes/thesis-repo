import {RoleDTO} from './roles.dto';

export interface CreateUserDTO {
    username: string;
    password: string;
    roles: RoleDTO[];
}

export interface CreatedUserDTO {
    id: string;
    username: string;
    privateKey: string;
    publicKey: string;
    roles: RoleDTO[];
}

export interface UserResponseDTO {
    id: string;
    username: string;
    publicKey: string;
    roles: RoleDTO[];
}
