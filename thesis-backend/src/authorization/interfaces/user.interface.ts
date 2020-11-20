import {Role} from './role.interface';
import {IKeyPair} from '../../shared/interfaces';

export interface UserWithPermissions {
    id: string;
    username: string;
    password?: string;
    roles: Role[];
    keyPair?: IKeyPair
}

export interface UserWithPassword {
    user: string;
    password: string;
}
