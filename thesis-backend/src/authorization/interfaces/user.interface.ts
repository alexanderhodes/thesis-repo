import {Role} from './role.interface';

export interface User {
    id: string;
    username: string;
    password?: string;
    roles: Role[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}

export interface UserWithPermissions {
    id: string;
    username: string;
    password?: string;
    roles: Role[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}
