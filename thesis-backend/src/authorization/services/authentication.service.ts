import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {LoginResponse, Payload, UserWithKeyPair, UserWithPassword, UserWithPermissions} from '../interfaces';
import {PermissionEntity, UserEntity, UsersService} from '../../database';
import {PermissionsEnum} from '../constants';
import {KeypairService, HashingService} from '../../shared';

@Injectable()
export class AuthenticationService {

    constructor(private usersService: UsersService,
                private hashingService: HashingService,
                private keypairService: KeypairService,
                private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
//        return (user && user.password === password) ? {
        return (user && await this.hashingService.compare(password, user.password)) ? {
            id: user.id,
            username: user.username,
            publicKey: user.publicKey,
            roles: user.roles
        } : null;
    }

    async login(user: UserWithPermissions): Promise<LoginResponse> {
        const permissions: PermissionEntity[] = [];
        user.roles.forEach((role) => {
            role.permissions.forEach((permission) => {
                // filter doubled permissions because of roles
                if (permissions.findIndex(p => p.name === permission.name) === -1) {
                    permissions.push(permission);
                }
            });
        });
        const permissionNames = permissions.map(permission => permission.name);

        const payload: Payload = {
            sub: `${user.id}`,
            username: user.username,
            permissions: permissionNames
        };
        return {
            accessToken: this.jwtService.sign(payload),
            permissions: permissions,
            privateKey: null,
            publicKey: user.publicKey,
            username: user.username,
            roles: user.roles
        };
    }

    async loginSilent(): Promise<LoginResponse> {
        const permissions: PermissionEntity[] = [{name: PermissionsEnum.ASSETS_READ}];
        const permissionNames = permissions.map(permission => permission.name);

        const payload: Payload = {
            sub: null,
            username: null,
            permissions: permissionNames
        };
        return {
            accessToken: this.jwtService.sign(payload),
            permissions: permissions,
            privateKey: '',
            publicKey: null,
            username: null,
            roles: []
        };
    }

    async updatePassword(user: UserEntity, userWithPassword: UserWithPassword): Promise<UserEntity> {
        user.password = await this.hashingService.createHash(userWithPassword.password);
        return await this.usersService.update(user.id, user);
    }

    async generateKeypairAndUpdate(user: UserEntity): Promise<UserWithKeyPair> {
        // create key pair
        const keypair = this.keypairService.createKeyPair();
        const hashedPrivateKey = await this.hashingService.createHash(keypair.privateKey);
        user.publicKey = keypair.publicKey;
        user.privateKey = hashedPrivateKey;
        // save user in database
        const updatedUser = await this.usersService.update(user.id, user);

        return {
            id: updatedUser.id,
            roles: updatedUser.roles,
            username: updatedUser.username,
            keyPair: keypair
        };
    }

}
