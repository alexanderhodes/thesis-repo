import {Permission} from '../../database/entities';

export interface User {
    id: string;
    username: string;
    password?: string;
    permissions: string[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}

export interface UserWithPermissions {
    id: string;
    username: string;
    password?: string;
    permissions: Permission[];
    keyPair?: {
        privateKey: string;
        publicKey: string;
    }
}
