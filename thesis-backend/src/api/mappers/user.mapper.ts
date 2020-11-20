import {UserEntity} from '../../database/entities';
import {RoleDTO} from '../dtos';

export function toUserEntity(username: string,
                             password: string,
                             roles: RoleDTO[],
                             publicKey: string,
                             id: string = undefined): UserEntity {
    return {
        id: id,
        username: username,
        password: password,
        roles: roles,
        publicKey: publicKey
    };
}
