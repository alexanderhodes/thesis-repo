import {Injectable} from '@nestjs/common';
import {LoginResponse, Payload, User} from '../interfaces';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../../database/services';
import {PermissionsEnum} from '../constants';
import {Permission} from '../../database/entities';

@Injectable()
export class AuthenticationService {

    constructor(private usersService: UsersService,
                private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByUsername(username);
        return (user && user.password === password) ? {
            id: user.id,
            username: user.username,
            publicKey: user.publicKey,
            roles: user.roles
        } : null;
    }

    async login(user: User): Promise<LoginResponse> {
        const permissions: Permission[] = [];
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
            username: user.username,
            roles: user.roles
        };
    }

    async loginSilent(): Promise<LoginResponse> {
        const permissions: Permission[] = [{name: PermissionsEnum.ASSETS_READ}];
        const permissionNames = permissions.map(permission => permission.name);

        const payload: Payload = {
            sub: null,
            username: null,
            permissions: permissionNames
        };
        return {
            accessToken: this.jwtService.sign(payload),
            permissions: permissions,
            username: null,
            roles: []
        };
    }

}
