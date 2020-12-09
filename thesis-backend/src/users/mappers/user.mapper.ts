import {UserEntity} from '../../database';
import {RoleDto} from '../dtos';

export function toUserEntity(username: string,
                             password: string,
                             roles: RoleDto[],
                             publicKey: string,
                             privateKey: string,
                             id: string = undefined): UserEntity {
    return {
        id: id,
        username: username,
        password: password,
        roles: roles,
        publicKey: publicKey,
        privateKey: privateKey
    };
}
