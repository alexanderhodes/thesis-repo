import {Permission, User} from '../../database/entities';

export function toUserEntity(username: string,
                             password: string,
                             permissions: Permission[],
                             publicKey: string,
                             id: string = undefined): User {
    return {
        id: id,
        username: username,
        password: password,
        permissions: permissions,
        publicKey: publicKey
    };
}
