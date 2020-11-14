import {Injectable} from '@nestjs/common';
import {LoginResponse, Payload, User} from '../interfaces';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../../database/services';
import {PermissionsEnum} from '../constants';

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
            permissions: user.permissions
        } : null;
    }

    async login(user: User): Promise<LoginResponse> {
        const payload: Payload = {
            sub: `${user.id}`,
            username: user.username,
            permissions: user.permissions
        };
        return {
            accessToken: this.jwtService.sign(payload),
            permissions: user.permissions,
            username: user.username
        };
    }

    async loginSilent(): Promise<LoginResponse> {
        const permissions = [PermissionsEnum.ASSETS_READ];
        const payload: Payload = {
            sub: null,
            username: null,
            permissions: permissions
        };
        return {
            accessToken: this.jwtService.sign(payload),
            permissions: permissions,
            username: null
        };
    }

}
