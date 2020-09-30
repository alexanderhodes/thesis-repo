import {Permission} from '../../database/entities';

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
