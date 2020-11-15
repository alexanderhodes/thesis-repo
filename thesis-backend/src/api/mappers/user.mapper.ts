import {User} from '../../database/entities';
import {RoleDto} from '../dtos';

export function toUserEntity(username: string,
                             password: string,
                             roles: RoleDto[],
                             publicKey: string,
                             id: string = undefined): User {
    return {
        id: id,
        username: username,
        password: password,
        roles: roles,
        publicKey: publicKey
    };
}
